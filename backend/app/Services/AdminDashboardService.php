<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\User;
use App\Models\Vehicle;
use Carbon\Carbon;
use Carbon\CarbonInterface;
use Carbon\CarbonPeriod;

class AdminDashboardService
{
    public function getDashboard(User $admin): array
    {
        $today = now()->startOfDay();
        $monthStart = now()->startOfMonth();

        $bookingCounts = Booking::query()
            ->selectRaw('booking_status, COUNT(*) as total')
            ->groupBy('booking_status')
            ->pluck('total', 'booking_status');

        $vehicleCounts = Vehicle::query()
            ->selectRaw('vehicle_availability, COUNT(*) as total')
            ->groupBy('vehicle_availability')
            ->pluck('total', 'vehicle_availability');

        $revenue = Booking::query()
            ->where('payment_status', Booking::PAYMENT_PAID)
            ->selectRaw('COALESCE(SUM(total_amount), 0) as total')
            ->selectRaw('COALESCE(SUM(CASE WHEN created_at >= ? THEN total_amount ELSE 0 END), 0) as month', [$monthStart])
            ->selectRaw('COALESCE(SUM(CASE WHEN created_at >= ? THEN total_amount ELSE 0 END), 0) as today', [$today])
            ->first();

        return [
            'metrics' => [
                'total_vehicles' => (int) $vehicleCounts->sum(),
                'available_vehicles' => (int) ($vehicleCounts[Vehicle::STATUS_AVAILABLE] ?? 0),
                'rented_vehicles' => (int) ($vehicleCounts[Vehicle::STATUS_RENTED] ?? 0),
                'total_bookings' => (int) $bookingCounts->sum(),
                'pending_bookings' => (int) ($bookingCounts[Booking::STATUS_PENDING] ?? 0),
                'confirmed_bookings' => (int) ($bookingCounts[Booking::STATUS_CONFIRMED] ?? 0),
                'completed_bookings' => (int) ($bookingCounts[Booking::STATUS_COMPLETED] ?? 0),
                'cancelled_bookings' => (int) ($bookingCounts[Booking::STATUS_CANCELLED] ?? 0),
                'total_customers' => User::query()->where('role', User::ROLE_CUSTOMER)->count(),
                'total_revenue' => (float) $revenue->total,
                'monthly_revenue' => (float) $revenue->month,
                'today_revenue' => (float) $revenue->today,
            ],
            'vehicle_summaries' => $this->vehicleSummaries(),
            'charts' => [
                'monthly_revenue' => $this->monthlyRevenue(),
                'weekly_rentals' => $this->weeklyRentals(),
                'category_revenue' => $this->categoryRevenue(),
                'booking_statuses' => $this->bookingStatuses($bookingCounts),
            ],
            'recent_bookings' => Booking::query()
                ->with([
                    'vehicle:id,make,model,vehicle_type',
                    'user:id,first_name,last_name',
                ])
                ->latest()
                ->limit(5)
                ->get([
                    'id', 'user_id', 'vehicle_id', 'first_name', 'last_name', 'pickup_datetime',
                    'dropoff_datetime', 'payment_status', 'booking_status', 'created_at',
                ]),
            'recent_customers' => User::query()
                ->where('role', User::ROLE_CUSTOMER)
                ->latest()
                ->limit(5)
                ->get(['id', 'first_name', 'last_name', 'email', 'phone_number', 'is_active', 'created_at']),
            'recent_notifications' => $admin->notifications()
                ->latest()
                ->limit(5)
                ->get(['id', 'type', 'data', 'read_at', 'created_at']),
        ];
    }

    private function vehicleSummaries(): array
    {
        return Vehicle::query()
            ->select('vehicle_type')
            ->selectRaw('COUNT(DISTINCT vehicles.id) as total')
            ->selectRaw('COUNT(DISTINCT CASE WHEN vehicle_availability = ? THEN vehicles.id END) as available', [Vehicle::STATUS_AVAILABLE])
            ->selectRaw('COUNT(DISTINCT CASE WHEN vehicle_availability = ? THEN vehicles.id END) as active', [Vehicle::STATUS_RENTED])
            ->selectRaw('COUNT(bookings.id) as rentals')
            ->selectRaw('COALESCE(SUM(CASE WHEN bookings.payment_status = ? THEN bookings.total_amount ELSE 0 END), 0) as income', [Booking::PAYMENT_PAID])
            ->leftJoin('bookings', 'bookings.vehicle_id', '=', 'vehicles.id')
            ->groupBy('vehicle_type')
            ->get()
            ->map(fn ($summary) => [
                'type' => $summary->vehicle_type,
                'rentals' => (int) $summary->rentals,
                'income' => (float) $summary->income,
                'available' => (int) $summary->available,
                'active' => (int) $summary->active,
            ])
            ->values()
            ->all();
    }

    private function monthlyRevenue(): array
    {
        $start = now()->subMonths(5)->startOfMonth();
        $dailyTotals = Booking::query()
            ->where('payment_status', Booking::PAYMENT_PAID)
            ->where('created_at', '>=', $start)
            ->selectRaw('DATE(created_at) as date, SUM(total_amount) as total')
            ->groupBy('date')
            ->pluck('total', 'date');

        return collect(CarbonPeriod::create($start, '1 month', now()->startOfMonth()))
            ->map(function (CarbonInterface $month) use ($dailyTotals) {
                $total = $dailyTotals
                    ->filter(fn ($amount, $date) => Carbon::parse($date)->isSameMonth($month))
                    ->sum();

                return ['label' => $month->format('M'), 'value' => (float) $total];
            })
            ->values()
            ->all();
    }

    private function weeklyRentals(): array
    {
        $start = now()->subDays(6)->startOfDay();
        $counts = Booking::query()
            ->where('created_at', '>=', $start)
            ->selectRaw('DATE(created_at) as date, COUNT(*) as total')
            ->groupBy('date')
            ->pluck('total', 'date');

        return collect(CarbonPeriod::create($start, '1 day', now()->startOfDay()))
            ->map(fn (CarbonInterface $day) => [
                'label' => $day->format('D'),
                'value' => (int) ($counts[$day->toDateString()] ?? 0),
            ])
            ->values()
            ->all();
    }

    private function categoryRevenue(): array
    {
        return Booking::query()
            ->join('vehicles', 'vehicles.id', '=', 'bookings.vehicle_id')
            ->where('bookings.payment_status', Booking::PAYMENT_PAID)
            ->select('vehicles.vehicle_type as label')
            ->selectRaw('SUM(bookings.total_amount) as value')
            ->groupBy('vehicles.vehicle_type')
            ->get()
            ->map(fn ($item) => ['label' => $item->label, 'value' => (float) $item->value])
            ->all();
    }

    private function bookingStatuses($counts): array
    {
        return collect([
            Booking::STATUS_PENDING,
            Booking::STATUS_CONFIRMED,
            Booking::STATUS_ACTIVE,
            Booking::STATUS_COMPLETED,
            Booking::STATUS_CANCELLED,
        ])->map(fn ($status) => [
            'label' => ucfirst($status),
            'value' => (int) ($counts[$status] ?? 0),
        ])->all();
    }
}

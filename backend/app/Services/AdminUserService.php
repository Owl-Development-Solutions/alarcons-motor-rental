<?php

namespace App\Services;

use App\Models\User;
use Illuminate\Contracts\Pagination\LengthAwarePaginator;
use Illuminate\Support\Arr;

class AdminUserService
{
    public function list(array $filters): LengthAwarePaginator
    {
        return User::query()
            ->withCount('bookings')
            ->when($filters['search'] ?? null, function ($query, string $search) {
                $query->where(function ($query) use ($search) {
                    $query->where('first_name', 'like', "%{$search}%")
                        ->orWhere('last_name', 'like', "%{$search}%")
                        ->orWhere('email', 'like', "%{$search}%")
                        ->orWhere('username', 'like', "%{$search}%");
                });
            })
            ->when(array_key_exists('is_active', $filters), fn ($query) => $query->where('is_active', $filters['is_active']))
            ->when($filters['role'] ?? null, fn ($query, string $role) => $query->where('role', $role))
            ->latest()
            ->paginate(min((int) ($filters['per_page'] ?? 15), 50));
    }

    public function create(array $data): User { return User::create($data); }

    public function update(User $user, array $data): User
    {
        $user->update(Arr::except($data, ['password_confirmation']));
        return $user->fresh();
    }

    public function delete(User $user, User $actor): void
    {
        abort_if($user->is($actor), 422, 'You cannot delete your own account.');
        $user->delete();
    }
}

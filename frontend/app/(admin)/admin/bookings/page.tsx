import BookingSearchInput from "@/components/admin/admin-search-booking";
import AdminTableBooking from "@/components/admin/admin-table-booking";
import BookingTable from "@/components/booking/booking-table";
import DataPagination from "@/components/shared/data-pagination";
import { getAllUsersBooking } from "@/data/actions/booking";
import { BookingFilters, ParamsSearchProps } from "@/data/models/filter.model";
import { Filter, Plus } from "lucide-react";

export default async function BookingRecordsPage({
  searchParams,
}: ParamsSearchProps) {
  const params = await searchParams;

  const filters: BookingFilters = {
    name: typeof params.search === "string" ? params.search : undefined,
    booking_status:
      typeof params.booking_status === "string"
        ? params.booking_status
        : undefined,
    payment_status:
      typeof params.payment_status === "string"
        ? params.payment_status
        : undefined,
  };

  const res = await getAllUsersBooking(filters);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Booking Records
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage all rental bookings
          </p>
        </div>
        {/* <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button>
          <button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
            <Plus className="w-4 h-4" />
            Create Booking
          </button>
        </div> */}
      </div>

      {/* Table */}
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Bookings
            </h3>
            <BookingSearchInput />
          </div>
        </div>
        <div className="overflow-x-auto">
          <AdminTableBooking bookings={res.bookings.data} />
        </div>
        {res.bookings.data.length > 1 && (
          <div className="border-t border-gray-100 p-4 dark:border-slate-700">
            <DataPagination
              currentPage={res.bookings.current_page}
              lastPage={res.bookings.last_page}
            />
          </div>
        )}
      </div>
    </div>
  );
}

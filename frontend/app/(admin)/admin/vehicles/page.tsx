import AdminTableVehicle from "@/components/admin/admin-table-vehicle";
import DataPagination from "@/components/shared/data-pagination";
import { Button } from "@/components/ui/button";
import VehicleFilter from "@/components/vehicles/vehicle-filter";
import { getVehicles } from "@/data/actions/vehicle";
import { VehicleFilters } from "@/data/models/vehicle.filter";
import { Edit, Eye, Filter, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";

interface VehiclePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const AdminVehiclePage = async ({ searchParams }: VehiclePageProps) => {
  const params = await searchParams;

  const filters: VehicleFilters = {
    search: typeof params.search === "string" ? params.search : undefined,
    vehicle_type:
      typeof params.vehicle_type === "string" ? params.vehicle_type : undefined,
    page: typeof params.page === "string" ? Number(params.page) : undefined,
  };

  const res = await getVehicles(filters);

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Vehicle Records
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Manage your vehicle fleet
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/vehicles/add">
            <Button className="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-orange-500 to-orange-600 text-white rounded-lg text-sm font-medium hover:from-orange-600 hover:to-orange-700 transition-all shadow-lg shadow-orange-500/30">
              <Plus className="w-4 h-4" />
              Add Vehicle
            </Button>
          </Link>
        </div>
      </div>
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              All Vehicles
            </h3>
            <div className="relative">
              <VehicleFilter />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <AdminTableVehicle vehicles={res.vehicles.data} />
        </div>
        {res.vehicles.data.length > 1 && (
          <div className="border-t border-gray-100 p-4 dark:border-slate-700">
            <DataPagination
              currentPage={res.vehicles.current_page}
              lastPage={res.vehicles.last_page}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminVehiclePage;

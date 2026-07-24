import AdminTableVehicle from "@/components/admin/admin-table-vehicle";
import { Button } from "@/components/ui/button";
import { getVehicles } from "@/data/actions/vehicle";
import { Edit, Eye, Plus, Search, Trash2 } from "lucide-react";
import Link from "next/link";

const AdminVehiclePage = async () => {
  const { data } = await getVehicles();

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
          {/* <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
            <Filter className="w-4 h-4" />
            Filter
          </button> */}
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
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search vehicles..."
                className="pl-10 pr-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg text-sm bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <AdminTableVehicle vehicles={data} />
        </div>
      </div>
    </div>
  );
};

export default AdminVehiclePage;

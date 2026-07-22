import AdminTableVehicle from "@/components/admin/admin-table-vehicle";
import { getVehicles } from "@/data/actions/vehicle";
import { Edit, Eye, Search, Trash2 } from "lucide-react";

const AdminVehiclePage = async () => {
  const { data } = await getVehicles();

  return (
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
  );
};

export default AdminVehiclePage;

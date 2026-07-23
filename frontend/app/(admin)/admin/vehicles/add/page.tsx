import AdminAddVehicleForm from "@/components/admin/admin-vehicle-form";
import { Button } from "@/components/ui/button";
import { ArrowLeftFromLine, X } from "lucide-react";
import Link from "next/link";

export default function AddVehiclePage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Add Vehicle
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Add a new vehicle to your rental fleet
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/admin/vehicles">
            <Button variant="outline" size="sm" className="cursor-pointer">
              <ArrowLeftFromLine className="mr-2 h-4 w-4" />
              Back to Vehicles
            </Button>
          </Link>
        </div>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm border border-gray-100 dark:border-slate-700">
        <div className="p-6 border-b border-gray-100 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Vehicle Information
          </h3>
        </div>

        <AdminAddVehicleForm type="Create" />
      </div>
    </div>
  );
}

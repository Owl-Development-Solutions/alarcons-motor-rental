"use client";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Vehicle } from "@/data/models";
import { formatCurrency } from "@/lib/utils";
import { Edit, Eye, Trash2 } from "lucide-react";
import Image from "next/image";
import { Badge } from "../ui/badge";
import VehicleAvailabilityBadge from "../vehicle-availability-badge";
import VehicleStatusBadge from "../vehicle-status-badge";
import AdminAddVehicleForm from "./admin-vehicle-form";
import { useRouter } from "next/navigation";

const AdminTableVehicle = ({ vehicles }: { vehicles: Vehicle[] }) => {
  const router = useRouter();

  const handleEditVehicle = (vehicle: Vehicle) => {
    router.push(`/admin/vehicles/${vehicle.id}/edit`);
  };

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow className="bg-gray-50 dark:bg-slate-700 hover:bg-gray-50 dark:hover:bg-slate-700">
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Vehicle Image
            </TableHead>

            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Brand
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Model
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Year
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Type
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Plate Number
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Price/Day
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Availability
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Status
            </TableHead>
            <TableHead className="text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider">
              Actions
            </TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {vehicles.map((vehicle, index) => (
            <TableRow
              key={vehicle.id}
              className={`transition-colors ${
                index % 2 === 0
                  ? "bg-white dark:bg-slate-800"
                  : "bg-gray-50/60 dark:bg-slate-700/40"
              } hover:bg-orange-50 dark:hover:bg-slate-700`}
            >
              <TableCell>
                <Image
                  src={vehicle.images?.[0] ?? "/images/placeholder-vehicle.jpg"}
                  alt={`${vehicle.make} ${vehicle.model}`}
                  width={100}
                  height={64}
                  className="h-[64] rounded-lg object-cover"
                />
              </TableCell>

              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {vehicle.make}
              </TableCell>
              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {vehicle.model}
              </TableCell>
              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {vehicle.year}
              </TableCell>
              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {vehicle.category}
              </TableCell>
              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {vehicle.plate_number}
              </TableCell>
              <TableCell className="text-sm text-gray-700 dark:text-gray-300">
                {formatCurrency(vehicle.daily_rate)}
              </TableCell>
              <TableCell>
                <VehicleAvailabilityBadge
                  status={vehicle.vehicle_availability}
                />
              </TableCell>
              <TableCell>
                <VehicleStatusBadge status={vehicle.vehicle_status} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <button className="p-1 text-gray-500 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                    <Eye className="w-4 h-4" />
                  </button>
                  <button
                    className="p-1 text-gray-500 hover:text-green-600 dark:text-gray-400 dark:hover:text-green-400"
                    onClick={() => handleEditVehicle(vehicle)}
                  >
                    <Edit className="w-4 h-4" />
                  </button>
                  <button className="p-1 text-gray-500 hover:text-red-600 dark:text-gray-400 dark:hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
};

export default AdminTableVehicle;

import VehicleList from "@/components/vehicles/vehicle-card-list";
import VehicleCarousel from "@/components/vehicles/vehicle-carousel";
import VehicleFilter from "@/components/vehicles/vehicle-filter";

import { getVehicles } from "@/data/actions/vehicle";
import { VehicleFilters } from "@/data/models/vehicle.filter";
import { Car } from "lucide-react";

interface VehiclePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

const VehiclePage = async ({ searchParams }: VehiclePageProps) => {
  const params = await searchParams;

  const filters: VehicleFilters = {
    search: typeof params.search === "string" ? params.search : undefined,
    vehicle_type:
      typeof params.vehicle_type === "string" ? params.vehicle_type : undefined,
  };

  const vehicles = await getVehicles(filters);

  return (
    <>
      <VehicleCarousel />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
          <VehicleFilter />
        </div>
      </div>

      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-[#e68823]">
            Available vehicles
          </h1>
          <p className="text-sm text-neutral-500">
            {vehicles.counts.all} vehicles in the fleet
          </p>
        </div>

        {vehicles.vehicles.data.length > 0 ? (
          <VehicleList
            key={JSON.stringify(filters)}
            initialVehicles={vehicles.vehicles}
          />
        ) : (
          <div className="flex flex-col items-center justify-center py-20 text-center">
            <Car className="h-20 w-20 text-orange-400" />

            <h2 className="mt-4 text-xl font-semibold">
              No vehicles available
            </h2>

            <p className="mt-2 max-w-md text-sm text-muted-foreground ">
              We couldn't find any vehicles that match your current filters. Try
              changing your search criteria, selecting different dates, or
              removing some filters to see more results.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default VehiclePage;

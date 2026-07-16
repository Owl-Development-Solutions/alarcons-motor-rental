import VehicleCard from "@/components/vehicles/vehicle-card";
import VehicleCarousel from "@/components/vehicles/vehicle-carousel";
import VehicleFilter from "@/components/vehicles/vehicle-filter";
import { getVehicles } from "@/data/actions/vehicle";
import { Vehicle } from "@/data/models";

const VehiclePage = async () => {
  const vehicles = await getVehicles();

  return (
    <>
      <VehicleCarousel />
      <VehicleFilter />

      {/* List of Vehicles */}
      <div className="mx-auto max-w-6xl p-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-neutral-900">
            Available vehicles
          </h1>
          <p className="text-sm text-neutral-500">
            {vehicles.data.length} vehicles in the fleet
          </p>
        </div>
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {vehicles.data.map((v) => (
            <VehicleCard key={v.id} vehicle={v} />
          ))}
        </div>

        {/* @TODO PAGINATION HERE */}
      </div>
    </>
  );
};

export default VehiclePage;

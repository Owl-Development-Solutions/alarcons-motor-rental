import { Car, Filter, Motorbike, Search } from "lucide-react";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

const VehicleFilter = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
        <div className="flex gap-2 md:gap-4 items-center">
          {/* Search */}
          <div className="relative flex-1 min-w-35">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
            <Input
              type="text"
              placeholder="Search..."
              className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 text-sm md:text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex gap-1 md:gap-2 shrink-0">
            <Button variant="outline">
              <Filter className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">All</span>
            </Button>
            <Button variant="outline">
              <Car className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Cars</span>
            </Button>
            <Button variant="outline">
              <Motorbike className="w-3 h-3 md:w-4 md:h-4" />
              <span className="hidden sm:inline">Motorcycles</span>
            </Button>
          </div>
        </div>
      </div>

      {/* Vehicle Grid */}
      {/* {filteredVehicles.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-gray-500 dark:text-gray-400 text-lg">
            No vehicles found
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredVehicles.map((vehicle) => (
            <div
              key={vehicle.id}
              className="bg-white dark:bg-slate-800 rounded-xl shadow-sm hover:shadow-lg transition-shadow overflow-hidden"
            >
              <div className="relative h-48 bg-gray-100 dark:bg-slate-700">
                <Image
                  src="/car1.jpg"
                  alt={vehicle.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-3 right-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                      vehicle.availability === "available"
                        ? "bg-green-500 text-white"
                        : "bg-red-500 text-white"
                    }`}
                  >
                    {vehicle.availability.charAt(0).toUpperCase() +
                      vehicle.availability.slice(1)}
                  </span>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                  {vehicle.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-4">
                  {vehicle.brand} {vehicle.model} • {vehicle.year}
                </p>
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <Car className="w-4 h-4" />
                    <span className="capitalize">{vehicle.type}</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <span>₱{vehicle.price_per_day}/day</span>
                  </div>
                </div>
                <div className="space-y-2 text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <div className="flex justify-between">
                    <span>Transmission:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {vehicle.transmission}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Fuel Type:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {vehicle.fuel_type}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span>Plate Number:</span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {vehicle.plate_number}
                    </span>
                  </div>
                </div>
                <Button
                  disabled={vehicle.availability !== "available"}
                  onClick={() => handleOpenBookingModal(vehicle)}
                  className={`w-full py-3 rounded-lg font-semibold transition-colors ${
                    vehicle.availability === "available"
                      ? "bg-orange-600 hover:bg-orange-700 text-white"
                      : "bg-gray-300 dark:bg-slate-600 text-gray-500 dark:text-gray-400 cursor-not-allowed"
                  }`}
                >
                  {vehicle.availability === "available"
                    ? "Book Now"
                    : "Not Available"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )} */}
    </div>
  );
};

export default VehicleFilter;

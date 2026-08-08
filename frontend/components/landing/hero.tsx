"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Button } from "../ui/button";
import FeaturedVehicleCarousel from "../featured-vehicle-carousel";

const Hero = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <section className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              JE CEBU TOURS  Car Rental
              <span className="block text-white">
                Services
              </span>
            </h1>
            <p className="text-lg font-semibold text-white leading-relaxed">
              JE Cebu Tour offers affordable and reliable car rental in Cebu, 
              with well-maintained motorbikes, cars, SUVs, and vans available for daily, 
              weekly, and monthly rentals.
            </p>
            <p className="text-lg font-semibold text-white leading-relaxed">
              Whether you’re traveling around Cebu City, Mactan, Lapu-Lapu, or other 
              destinations in Cebu, we have a vehicle to fit your trip. Choose from our 
              selection of automatic cars and spacious vehicles for families, groups, 
              business trips, and vacations.
            </p>
              <p className="text-lg font-semibold text-white leading-relaxed">
                Book your Cebu car rental today and enjoy a comfortable and hassle-free journey.
            </p>
            <p className="text-lg font-semibold text-white leading-relaxed">
              Cebu • Mactan • Lapu-Lapu • Cebu City • Mandaue • Airport
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                onClick={() =>
                  startTransition(() => {
                    router.push("/vehicles");
                  })
                }
                disabled={isPending}
                className="h-12 px-8 py-3 bg-linear-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl"
              >
                {isPending ? "Loading..." : "Book Now"}
              </Button>
            </div>
          </div>
          <FeaturedVehicleCarousel />
        </div>
      </div>
    </section>
  );
};

export default Hero;

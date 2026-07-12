import Image from "next/image";
import { Button } from "../ui/button";
import FeaturedVehicleCarousel from "../featured-vehicle-carousel";

const Hero = () => {
  return (
    <section className="relative py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 dark:text-white leading-tight">
              Premium Motor Rental and Car
              <span className="block text-orange-600 dark:text-orange-400">
                Services
              </span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              Your Trusted Partner on Every Journey.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              From daily commutes to weekend adventures, our premium rental
              services offer dependable motorcycles and cars tailored to your
              needs. Enjoy flexible rental options, affordable pricing, and
              outstanding customer service every step of the way.
            </p>
            <p className="text-lg font-semibold text-orange-600 dark:text-orange-400 leading-relaxed">
              Reliable. Affordable. Always Ready.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="h-12 px-8 py-3 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl">
                Book Now
              </Button>

              <Button className="h-12 px-8 py-3 bg-transparent border-2 border-orange-600 text-orange-600 dark:text-orange-400 hover:bg-orange-50 dark:hover:bg-slate-800 font-semibold rounded-lg transition-colors">
                Learn More
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

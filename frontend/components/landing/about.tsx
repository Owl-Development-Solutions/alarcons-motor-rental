"use client";

const About = () => {
  return (
    <section
      id="about"
      className="py-20 bg-gradient-to-br from-orange-50 to-white dark:from-slate-800 dark:to-slate-900"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              About Alarcons Motor Rental and JE Cebu Tours
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Explore Cebu with JE Cebu Tour, your convenient choice for cheapest & affordable 
              car and motorcycle rental in Cebu. Choose from well-maintained automatic 
              cars, SUVs, vans, and motorcycles for vacations, family trips, 
              business travel, and everyday transportation.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              From Cebu City and Mandaue to Mactan and Lapu-Lapu City, enjoy the freedom
              to travel comfortably at your own pace. We offer flexible daily, weekly,
              and monthly rentals to fit your plans and budget.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              Choose your ride. Book with ease. Explore Cebu your way.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
              JE Cebu Tour — Your Trusted Car and Motorcycle Rental in Cebu.
            </p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                18+
              </div>
              <div className="text-gray-600 dark:text-gray-300">Vehicles</div>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                1K+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Happy Customers
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                1+
              </div>
              <div className="text-gray-600 dark:text-gray-300">
                Years Experience
              </div>
            </div>
            <div className="bg-white dark:bg-slate-700 p-6 rounded-xl shadow-lg">
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">
                24/7
              </div>
              <div className="text-gray-600 dark:text-gray-300">Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;

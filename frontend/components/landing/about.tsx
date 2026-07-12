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
              With years of experience in the motor rental industry, Alarcons
              Motor Rental and JE Cebu Tours has been providing exceptional
              service to customers. Our commitment to quality, safety, and
              customer satisfaction sets us apart from the competition.
            </p>
            <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
              We offer a wide range of vehicles to suit every need and budget,
              from economy cars to luxury vehicles. Our team is dedicated to
              making your rental experience smooth and hassle-free.
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
                10K+
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

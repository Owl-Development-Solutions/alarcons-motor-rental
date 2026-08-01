"use client";
import { useState } from "react";
import TermsModal from "./terms-modal";

const About = () => {
  const [open, setOpen] = useState(false);
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
        <div className="mt-12">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-inner flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <h3 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
                Terms & Conditions
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300 max-w-2xl">
                The renter agrees to pay rental fees, taxes, and any additional
                charges. A security deposit may be required. Unlimited mileage
                within parts of Cebu; restrictions and penalties may apply.
              </p>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setOpen(true)}
                className="px-4 py-2 rounded-md bg-orange-600 text-white hover:bg-orange-700"
              >
                Read Full Terms
              </button>
              <a
                href="#contact"
                className="px-4 py-2 rounded-md border border-gray-200 dark:border-slate-700 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-slate-700"
              >
                Contact Us
              </a>
            </div>
          </div>
          <TermsModal open={open} onClose={() => setOpen(false)} />
        </div>
      </div>
    </section>
  );
};

export default About;

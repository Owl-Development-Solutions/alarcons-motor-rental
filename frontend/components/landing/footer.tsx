import Link from "next/link";

const Footer = () => {
  return (
    <footer className="bg-gray-900 dark:bg-slate-900 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4">Alarcons Motor Rental</h3>
            <p className="text-gray-400">
              Your trusted partner for quality motor rentals
            </p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link
                  href="#about"
                  className="hover:text-white transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="#contact"
                  className="hover:text-white transition-colors"
                >
                  Contact Us
                </Link>
              </li>
              <li>
                <Link
                  href="#concern"
                  className="hover:text-white transition-colors"
                >
                  Concern
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Daily Rentals</li>
              <li>Weekly Rentals</li>
              <li>Monthly Rentals</li>
              <li>Long-term Leases</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">Business Hours</h4>
            <ul className="space-y-2 text-gray-400">
              <li>Mon - Fri: 8AM - 8PM</li>
              <li>Saturday: 9AM - 6PM</li>
              <li>Sunday: 10AM - 4PM</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
          <p>
            &copy; 2025 Alarcons Motor Rental and JE Cebu Tours. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

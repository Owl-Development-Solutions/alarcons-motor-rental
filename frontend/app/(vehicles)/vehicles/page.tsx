"use client";

import { useState, useEffect } from "react";
import {
  Car,
  Motorbike,
  Search,
  Filter,
  ChevronLeft,
  ChevronRight,
  LogOut,
  User,
  MessageSquare,
  Settings,
  Menu,
  X,
} from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function VehiclesPage() {
  const [vehicles, setVehicles] = useState<any[]>([]);
  const [filter, setFilter] = useState<"all" | "car" | "motorcycle">("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const heroImages = ["/pic11.jpg", "/pic12.jpg"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };

  const filteredVehicles = Array.isArray(vehicles)
    ? vehicles.filter((vehicle) => {
        const matchesFilter = filter === "all" || vehicle.type === filter;
        const matchesSearch =
          vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
          vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesFilter && matchesSearch;
      })
    : [];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-slate-900">
      {/* Header */}
      <header className="bg-white dark:bg-slate-900/95 shadow-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <Image
                src="/car1.jpg"
                alt="JE Cebu Tours Logo"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
              <span className="text-xl font-bold text-orange-600 dark:text-orange-400">
                JE Cebu Tours
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-6">
              <Link
                href="/"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
              >
                Home
              </Link>
              <Link
                href="/vehicles"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium flex items-center gap-2"
              >
                <Car className="w-4 h-4" />
                Booking
              </Link>
              <Link
                href="/feedback"
                className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium flex items-center gap-2"
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Link>
              <div className="relative">
                <button
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className="text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium flex items-center gap-2"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                {showSettingsMenu && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-800 rounded-lg shadow-lg border border-gray-200 dark:border-slate-700 py-2 z-50">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      onClick={() => setShowSettingsMenu(false)}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-400 transition-colors text-left">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <nav className="md:hidden mt-4 pb-4 space-y-2">
              <Link
                href="/"
                className="px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/vehicles"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Car className="w-4 h-4" />
                Booking
              </Link>
              <Link
                href="/feedback"
                className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <MessageSquare className="w-4 h-4" />
                Feedback
              </Link>
              <div className="px-4 py-2">
                <button
                  onClick={() => setShowSettingsMenu(!showSettingsMenu)}
                  className="flex items-center gap-2 text-gray-700 dark:text-gray-300 hover:text-orange-600 dark:hover:text-orange-400 transition-colors font-medium"
                >
                  <Settings className="w-4 h-4" />
                  Settings
                </button>
                {showSettingsMenu && (
                  <div className="mt-2 space-y-1 pl-6">
                    <Link
                      href="/profile"
                      className="flex items-center gap-2 px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg transition-colors"
                      onClick={() => {
                        setShowSettingsMenu(false);
                        setMobileMenuOpen(false);
                      }}
                    >
                      <User className="w-4 h-4" />
                      Profile
                    </Link>
                    <button className="flex items-center gap-2 w-full px-4 py-2 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-700 hover:text-red-600 dark:hover:text-red-400 rounded-lg transition-colors text-left">
                      <LogOut className="w-4 h-4" />
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </nav>
          )}
        </div>
      </header>

      {/* Hero Section */}
      <div
        className="relative h-64 md:h-96 bg-cover bg-no-repeat transition-all duration-500"
        style={{
          backgroundImage: `url('${heroImages[currentImageIndex]}')`,
          backgroundPosition: "center -20px",
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>

        {/* Navigation Buttons */}
        <button
          onClick={prevImage}
          className="absolute left-2 md:left-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all"
        >
          <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        <button
          onClick={nextImage}
          className="absolute right-2 md:right-4 top-1/2 transform -translate-y-1/2 z-10 bg-white/20 hover:bg-white/40 backdrop-blur-sm text-white p-2 md:p-3 rounded-full transition-all"
        >
          <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 z-10 flex gap-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentImageIndex ? "bg-white" : "bg-white/50"
              }`}
            />
          ))}
        </div>

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex items-center">
          <div>
            <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold text-white mb-2 md:mb-4 drop-shadow-lg">
              Our Vehicle Fleet
            </h1>
            <p className="text-sm md:text-xl text-white/95 drop-shadow-md">
              Quality vehicles, affordable prices, and dependable service for
              every journey.
            </p>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 md:py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-sm p-4 md:p-6 mb-6 md:mb-8">
          <div className="flex gap-2 md:gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 min-w-[140px]">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4 md:w-5 md:h-5" />
              <input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 md:pl-10 pr-3 md:pr-4 py-2 text-sm md:text-base border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-700 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
            </div>

            {/* Filter Buttons */}
            <div className="flex gap-1 md:gap-2 flex-shrink-0">
              <button
                onClick={() => setFilter("all")}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-xs md:text-sm ${
                  filter === "all"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                <Filter className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">All</span>
              </button>
              <button
                onClick={() => setFilter("car")}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-xs md:text-sm ${
                  filter === "car"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                <Car className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Cars</span>
              </button>
              <button
                onClick={() => setFilter("motorcycle")}
                className={`flex items-center gap-1 md:gap-2 px-2 md:px-4 py-2 rounded-lg font-medium transition-colors whitespace-nowrap text-xs md:text-sm ${
                  filter === "motorcycle"
                    ? "bg-orange-600 text-white"
                    : "bg-gray-100 dark:bg-slate-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-slate-600"
                }`}
              >
                <Motorbike className="w-3 h-3 md:w-4 md:h-4" />
                <span className="hidden sm:inline">Motorcycles</span>
              </button>
            </div>
          </div>
        </div>

        {/* Vehicle Grid */}
        {filteredVehicles.length === 0 ? (
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
                  <button
                    disabled={vehicle.availability !== "available"}
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
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 dark:bg-slate-900 text-white py-8 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-gray-400">
            © 2025 Alarcons Motor Rental and JE Cebu Tours. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}

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
import { getVehicles } from "@/data/actions/vehicle";

export default async function VehiclesPage() {
// const [vehicles, setVehicles] = useState<any[]>([]);
// const [filter, setFilter] = useState<"all" | "car" | "motorcycle">("all");
// const [searchQuery, setSearchQuery] = useState("");
// const [currentImageIndex, setCurrentImageIndex] = useState(0);
// const [showSettingsMenu, setShowSettingsMenu] = useState(false);
// const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
// const [showBookingModal, setShowBookingModal] = useState(false);
// const [selectedVehicle, setSelectedVehicle] = useState<any | null>(null);
// const [bookingForm, setBookingForm] = useState({
// fullName: "",
// phoneNumber: "",
// email: "",
// pickupDate: "",
// pickupTime: "",
// returnDate: "",
// returnTime: "",
// idNumber: "",
// idPhoto: null as File | null,
// profilePhoto: null as File | null,
// });
// const [bookingError, setBookingError] = useState("");
// const [bookingSuccess, setBookingSuccess] = useState("");

// const heroImages = ["/pic11.jpg", "/pic12.jpg", "/pic13.png", "/pic15.jpg"];

// useEffect(() => {
// const interval = setInterval(() => {
// setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
// }, 5000);

// return () => clearInterval(interval);
// }, []);

// const nextImage = () => {
// setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
// };

// const prevImage = () => {
// setCurrentImageIndex(
// (prev) => (prev - 1 + heroImages.length) % heroImages.length,
// );
// };

// useEffect(() => {
// const loadVehicles = async () => {
// try {
// const response = await fetch("http://127.0.0.1:8000/api/v1/vehicles");
// if (!response.ok) throw new Error(`HTTP ${response.status}`);

// const data = await response.json();
// const vehicleList = Array.isArray(data?.data) ? data.data : [];
// setVehicles(vehicleList);
// } catch (error) {
// console.error("Error fetching vehicles:", error);
// setVehicles([]);
// }
// };

// loadVehicles();
// }, []);

// const filteredVehicles = Array.isArray(vehicles)
// ? vehicles.filter((vehicle) => {
// const matchesFilter = filter === "all" || vehicle.type === filter;
// const matchesSearch =
// vehicle.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
// vehicle.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
// vehicle.model.toLowerCase().includes(searchQuery.toLowerCase());
// return matchesFilter && matchesSearch;
// })
// : [];

// const resetBookingForm = () => {
// setBookingForm({
// fullName: "",
// phoneNumber: "",
// email: "",
// pickupDate: "",
// pickupTime: "",
// returnDate: "",
// returnTime: "",
// idNumber: "",
// idPhoto: null,
// profilePhoto: null,
// });
// setBookingError("");
// setBookingSuccess("");
// };

// const handleOpenBookingModal = (vehicle: any) => {
// setSelectedVehicle(vehicle);
// setShowBookingModal(true);
// resetBookingForm();
// };

// const handleBookingInputChange = (event: any) => {
// const { name, value } = event.target;
// setBookingForm((prev) => ({ ...prev, [name]: value }));
// };

// const handleBookingFileChange = (
// event: any,
// field: "idPhoto" | "profilePhoto",
// ) => {
// const file = event.target.files?.[0] ?? null;
// setBookingForm((prev) => ({ ...prev, [field]: file }));
// };

// const handleBookingSubmit = (event: any) => {
// event.preventDefault();
// setBookingError("");

// if (
// !bookingForm.fullName.trim() ||
// !bookingForm.phoneNumber.trim() ||
// !bookingForm.email.trim() ||
// !bookingForm.pickupDate ||
// !bookingForm.pickupTime ||
// !bookingForm.returnDate ||
// !bookingForm.returnTime ||
// !bookingForm.idNumber.trim()
// ) {
// setBookingError(
// "Please fill in all required information before submitting.",
// );
// return;
// }

// if (!/^\S+@\S+\.\S+$/.test(bookingForm.email)) {
// setBookingError("Please enter a valid email address.");
// return;
// }

// if (!/^\d{7,15}$/.test(bookingForm.phoneNumber.replace(/\D/g, ""))) {
// setBookingError("Please enter a valid phone number.");
// return;
// }

// if (!bookingForm.idPhoto || !bookingForm.profilePhoto) {
// setBookingError(
// "Please upload your valid ID and a profile photo before submitting.",
// );
// return;
// }

// if (new Date(bookingForm.returnDate) <= new Date(bookingForm.pickupDate)) {
// setBookingError("Return date must be after pickup date.");
// return;
// }

// setBookingSuccess(
// `Booking request submitted for ${selectedVehicle?.name || "your selected vehicle"}. We will contact you shortly.`,
// );
// setShowBookingModal(false);
// setSelectedVehicle(null);
// resetBookingForm();
// };

// const closeBookingModal = () => {
// setShowBookingModal(false);
// setSelectedVehicle(null);
// resetBookingForm();
// };

return (
<div className="min-h-screen bg-gray-50 dark:bg-slate-900">
{/_ Header _/}
<header className="bg-white dark:bg-slate-800 shadow-sm sticky top-0 z-50">
<div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
<div className="flex items-center justify-between">
<Link href="/" className="flex items-center gap-3">
<Image
                src="/car1.jpg"
                alt="JE Cebu Tours Logo"
                width={40}
                height={40}
                className="rounded-lg object-cover"
              />
<span className="text-lg font-bold text-orange-600 dark:text-orange-400">
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
              {/* <div className="relative">
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
              </div> */}
            </nav>

            {/* Mobile Menu Button */}
            {/* <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-slate-800"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button> */}
          </div>

          {/* Mobile Navigation */}
          {/* {mobileMenuOpen && (
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
          )} */}
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

        {bookingSuccess && (
          <div className="mb-6 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700 dark:border-green-800 dark:bg-green-900/20 dark:text-green-300">
            {bookingSuccess}
          </div>
        )}

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
        )}
      </div>

      {showBookingModal && selectedVehicle && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black/70 px-4 py-6">
          <div className="w-full max-w-2xl rounded-2xl bg-white p-6 shadow-2xl dark:bg-slate-800 max-h-[90vh] overflow-y-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <div className="mb-6 flex items-start justify-between gap-4">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.2em] text-orange-600">
                  Booking Request
                </p>
                <h2 className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                  Reserve {selectedVehicle.name}
                </h2>
                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                  Please provide your basic details and upload a valid ID photo
                  before we confirm your booking.
                </p>
              </div>
              <button
                onClick={closeBookingModal}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:hover:bg-slate-700 dark:hover:text-white"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={bookingForm.fullName}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Juan Dela Cruz"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={bookingForm.phoneNumber}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="0917 123 4567"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={bookingForm.email}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="you@example.com"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Valid ID Number
                  </label>
                  <input
                    type="text"
                    name="idNumber"
                    value={bookingForm.idNumber}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="123456789"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Pickup Date
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={bookingForm.pickupDate}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Pickup Time
                  </label>
                  <input
                    type="time"
                    name="pickupTime"
                    value={bookingForm.pickupTime}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Return Date
                  </label>
                  <input
                    type="date"
                    name="returnDate"
                    value={bookingForm.returnDate}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
                <div>
                  <label className="mb-1 block text-sm font-medium text-gray-700 dark:text-gray-200">
                    Return Time
                  </label>
                  <input
                    type="time"
                    name="returnTime"
                    value={bookingForm.returnTime}
                    onChange={handleBookingInputChange}
                    className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-orange-500"
                    required
                  />
                </div>
              </div>

              <div className="rounded-xl border border-dashed border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-900/10">
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Upload Valid ID Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleBookingFileChange(event, "idPhoto")
                  }
                  className="w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-orange-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-700"
                  required
                />
                {bookingForm.idPhoto && (
                  <div className="mt-3 rounded-lg border border-orange-200 bg-white p-3 dark:border-orange-800 dark:bg-slate-800">
                    <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                      Selected file: {bookingForm.idPhoto.name}
                    </p>
                    <img
                      src={URL.createObjectURL(bookingForm.idPhoto)}
                      alt="Selected ID preview"
                      className="h-40 w-full rounded-lg object-cover"
                    />
                  </div>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  Please upload a clear image of your valid ID.
                </p>
              </div>

              <div className="rounded-xl border border-dashed border-orange-300 bg-orange-50 p-4 dark:border-orange-700 dark:bg-orange-900/10">
                <label className="mb-2 block text-sm font-semibold text-gray-800 dark:text-gray-100">
                  Upload Profile Photo
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(event) =>
                    handleBookingFileChange(event, "profilePhoto")
                  }
                  className="w-full text-sm text-gray-600 file:mr-4 file:rounded-full file:border-0 file:bg-orange-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-orange-700"
                  required
                />
                {bookingForm.profilePhoto && (
                  <div className="mt-3 rounded-lg border border-orange-200 bg-white p-3 dark:border-orange-800 dark:bg-slate-800">
                    <p className="mb-2 text-xs font-medium text-gray-600 dark:text-gray-300">
                      Selected file: {bookingForm.profilePhoto.name}
                    </p>
                    <img
                      src={URL.createObjectURL(bookingForm.profilePhoto)}
                      alt="Selected profile preview"
                      className="h-40 w-full rounded-lg object-cover"
                    />
                  </div>
                )}
                <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                  A clear profile photo helps us verify your booking request.
                </p>
              </div>

              {bookingError && (
                <div className="rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-700 dark:border-red-800 dark:bg-red-900/20 dark:text-red-300">
                  {bookingError}
                </div>
              )}

              <div className="flex flex-col-reverse gap-3 pt-2 sm:flex-row sm:justify-end">
                <button
                  type="button"
                  onClick={closeBookingModal}
                  className="rounded-lg border border-gray-300 px-4 py-2 text-sm font-semibold text-gray-700 hover:bg-gray-100 dark:border-slate-600 dark:text-gray-200 dark:hover:bg-slate-700"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-orange-600 px-4 py-2 text-sm font-semibold text-white hover:bg-orange-700"
                >
                  Submit Booking
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

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

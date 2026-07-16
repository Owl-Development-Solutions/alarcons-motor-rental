"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { useState } from "react";

const VehicleCarousel = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const heroImages = ["/pic11.jpg", "/pic12.jpg", "/pic13.jpg", "/pic15.jpg"];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
  };

  const prevImage = () => {
    setCurrentImageIndex(
      (prev) => (prev - 1 + heroImages.length) % heroImages.length,
    );
  };
  return (
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
  );
};

export default VehicleCarousel;

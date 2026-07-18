"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  type CarouselApi,
} from "@/components/ui/carousel";
import { useEffect, useState } from "react";

const VehicleImageGallery = ({
  images,
  alt,
}: {
  images: string[];
  alt: string;
}) => {
  const hasImages = images && images.length > 0;

  const [api, setApi] = useState<CarouselApi>();
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (!api) return;

    setActive(api.selectedScrollSnap());

    const onSelect = () => setActive(api.selectedScrollSnap());
    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  if (!hasImages) {
    return (
      <div className="space-y-3">
        <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800 flex items-center justify-center text-gray-400 dark:text-slate-500 text-sm">
          No image available
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <Carousel setApi={setApi} className="w-full">
        <CarouselContent>
          {images.map((src, i) => (
            <CarouselItem key={src + i}>
              <div className="relative aspect-16/10 w-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-slate-800">
                <Image
                  src={src}
                  alt={alt}
                  fill
                  sizes="(max-width: 768px) 100vw, 700px"
                  className="object-cover"
                  priority={i === 0}
                />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        {images.length > 1 && (
          <>
            <CarouselPrevious
              className="left-3 bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border-none shadow focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="Previous image"
            />
            <CarouselNext
              className="right-3 bg-white/90 dark:bg-slate-900/80 hover:bg-white dark:hover:bg-slate-900 border-none shadow focus-visible:ring-2 focus-visible:ring-orange-500"
              aria-label="Next image"
            />
          </>
        )}
      </Carousel>

      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {images.map((src, i) => (
            <button
              key={src + i}
              type="button"
              onClick={() => api?.scrollTo(i)}
              className={`relative h-16 w-24 shrink-0 overflow-hidden rounded-lg border-2 transition-colors focus:outline-none ${
                i === active
                  ? "border-orange-500"
                  : "border-transparent hover:border-gray-300 dark:hover:border-slate-600"
              }`}
            >
              <Image
                src={src}
                alt={`${alt} thumbnail ${i + 1}`}
                fill
                sizes="96px"
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default VehicleImageGallery;

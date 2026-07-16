"use client";

import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "./ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { data } from "@/data/models/image.model";

const FeaturedVehicleCarousel = () => {
  //hardcoded for now
  const data = [
    {
      id: 1,
      path: "/pic1.2.jpg",
      name: "motor",
    },
    {
      id: 2,
      path: "/car1.jpg",
      name: "car",
    },
  ];

  return (
    <div className="relative w-full max-w-125 aspect-square  ">
      <Carousel
        opts={{
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 2000,
            stopOnInteraction: true,
            stopOnMouseEnter: true,
          }),
        ]}
      >
        <CarouselContent>
          {data.map((v: data) => (
            <CarouselItem key={v.id}>
              <div className="relative mx-auto">
                <Image
                  src={v.path}
                  alt={v.name}
                  height="0"
                  width="0"
                  sizes="100vh"
                  className="w-full auto rounded-md"
                ></Image>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

export default FeaturedVehicleCarousel;

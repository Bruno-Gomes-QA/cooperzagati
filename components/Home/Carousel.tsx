"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

export function Carousel() {
  const [sliderRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    renderMode: "performance",
    created(slider) {
      setInterval(() => slider.next(), 3500);
    },
  });

  const images = [
    "/home/banner1.jpg",
    "/home/banner2.jpg",
    "/home/banner3.jpg",
  ];

  return (
    <div ref={sliderRef} className="keen-slider max-w-2xl mx-auto p-4">
      {images.map((src, i) => (
        <div
          key={i}
          className="keen-slider__slide flex justify-center items-center"
        >
          <div className="overflow-hidden rounded-xl shadow-lg w-full">
            <Image
              src={src}
              alt={`Slide ${i + 1}`}
              width={800}
              height={450}
              className="object-cover w-full h-[350px]"
            />
          </div>
        </div>
      ))}
    </div>
  );
}

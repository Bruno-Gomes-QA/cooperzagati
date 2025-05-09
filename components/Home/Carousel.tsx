"use client";

import { useKeenSlider } from "keen-slider/react";
import "keen-slider/keen-slider.min.css";
import Image from "next/image";

export function Carousel() {
  const [sliderRef, slider] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slides: { perView: 1 },
    created() {
      setInterval(() => slider.current?.next(), 10000);
    },
  });

  const banners = [
    {
      src: "/home/banner1.jpg",
      title: "Origem",
      description:
        "Cooperativa fundada em 2009 por José Luiz Zagati, agente ambiental de Taboão da Serra.",
    },
    {
      src: "/home/banner2.jpg",
      title: "Coleta Seletiva",
      description:
        "Atuando em 24 bairros com mais de 35 toneladas/mês e 24 mil pessoas atendidas.",
    },
    {
      src: "/home/banner3.jpg",
      title: "Educação e Impacto",
      description:
        "Transformando reciclagem em conscientização com projetos que geram impacto.",
    },
  ];

  return (
    <div className="w-full flex justify-center pt-12 relative px-4">
      <div
        ref={sliderRef}
        className="keen-slider w-full max-w-[1024px] h-[576px] rounded-2xl overflow-hidden relative z-10"
      >
        {banners.map((banner, i) => (
          <div
            key={i}
            className="keen-slider__slide relative flex items-center justify-center"
          >
            <Image
              src={banner.src}
              alt={banner.title}
              width={1024}
              height={576}
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-black/40" />
            <div className="absolute inset-0 flex flex-col justify-end p-8 sm:p-10 text-white z-10">
              <h2 className="text-2xl sm:text-3xl font-bold mb-2">{banner.title}</h2>
              <p className="text-sm sm:text-base leading-relaxed max-w-[80%]">
                {banner.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import React, { useRef } from "react";

import "./styles.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";
import Image from "next/image";

export default function Banner() {
  const progressCircle = useRef<SVGSVGElement | null>(null);
  const progressContent = useRef<HTMLSpanElement | null>(null);

  const onAutoplayTimeLeft = (
    swiper: any,
    time: number,
    progress: number
  ): void => {
    if (progressCircle.current && progressContent.current) {
      progressCircle.current.style.setProperty("--progress", `${1 - progress}`);
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <>
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-[70vh]">
            <Image
              alt="banner"
              src="https://i.ibb.co/tBFv1dN/design-and-develop-landing-page-to-generate-leads-and-calls-using-react-js-next-js-with-tailwind-css.jpg"
              fill
              className="object-contain"
            />
          </div>
        </SwiperSlide>

        <div className="autoplay-progress" slot="container-end">
          <svg viewBox="0 0 48 48" ref={progressCircle}>
            <circle cx="24" cy="24" r="20"></circle>
          </svg>
          <span ref={progressContent}></span>
        </div>
      </Swiper>
    </>
  );
}

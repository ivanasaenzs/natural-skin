import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/css";

import slide1 from "../assets/carousel-1.avif";
import slide2 from "../assets/carousel-2.avif";
import slide3 from "../assets/carousel-3.webp";
import slide4 from "../assets/carousel-4.webp";
import slide5 from "../assets/carousel-5.jpeg";

const Carousel = () => {
  return (
    <Splide
      options={{
        type: "loop",
        autoplay: true,
        interval: 2000,
        speed: 2000,
        pauseOnHover: false,
        perPage: 1,
        arrows: true,
        pagination: true,
        drag: true,
      }}
    >
      <SplideSlide>
        <img
          src={slide1}
          alt="Slide 1"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={slide2}
          alt="Slide 2"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={slide3}
          alt="Slide 3"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={slide4}
          alt="Slide 4"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />
      </SplideSlide>
      <SplideSlide>
        <img
          src={slide5}
          alt="Slide 5"
          style={{
            width: "100%",
            height: "500px",
            objectFit: "cover",
            margin: "0 auto",
          }}
        />
      </SplideSlide>
    </Splide>
  );
};

export default Carousel;

import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectCube, Virtual } from "swiper/modules";
import ProjectView from "./ProjectView";
import { useRouter } from "next/router";
import "@/styles/CubeCarousel.css";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const CubeCarousel = ({ projects }) => {
  const swiperRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  let enabled = true;

  const router = useRouter();

  const [isLandscape, setIsLandscape] = useState(false);

  const toggleSwiper = () => {
    if (swiperRef.current && swiperRef.current.swiper) {
      console.log("swiper is currently enabled: ", isEnabled);
      if (enabled) {
        swiperRef.current.swiper.disable();
      } else {
        swiperRef.current.swiper.enable();
      }
      enabled = !enabled;
      setIsEnabled(!isEnabled);
    }
  };

  useEffect(() => {
    const initialProjectIndex = router.query.projectId
      ? parseInt(router.query.projectId) - 1
      : 0;

    console.log("we start at: ", initialProjectIndex);

    setTimeout(
      () =>
        swiperRef.current &&
        swiperRef.current.swiper.slideTo(initialProjectIndex),
      10
    );
  }, [swiperRef.current]);

  useEffect(() => {
    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandscape(true);
    }

    screen.orientation.addEventListener("change", (e) => {
      setIsLandscape((prev) => {
        const isLandscapeNew =
          (e.target.type === "landscape-primary" ||
            e.target.type === "landscape-secondary") &&
          window.innerHeight < 500;
        if (prev !== isLandscapeNew) {
          console.log("lanscape is : ", isLandscapeNew);
          return isLandscapeNew;
        }
        return prev;
      });
    });
  }, []);

  return (
    <div className="relative h-full c-carousel">
      <div className="page-background h-full w-full absolute overflow-hidden -z-30 ">
        <div className="bg-slice1"></div>
        <div className="bg-slice2"></div>
      </div>

      <Swiper
        ref={swiperRef}
        effect={"cube"}
        grabCursor={true}
        cubeEffect={{
          shadow: true,
          slideShadows: true,
          shadowOffset: 20,
          shadowScale: 0.94,
        }}
        pagination={true}
        modules={[EffectCube, Virtual]}
        style={{
          width: isLandscape ? "calc(100% - 100px)" : "100%",
          marginLeft: isLandscape ? "auto" : "0",
        }}
        className={`projectSwiper z-50 ${isLandscape ? "landscape" : ""}`}
      >
        {projects.map((project, index) => (
          <SwiperSlide key={project.id} virtualIndex={index}>
            <ProjectView
              key={project.id}
              project={project}
              onCollectStart={toggleSwiper}
              onCollectEnd={toggleSwiper}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default CubeCarousel;

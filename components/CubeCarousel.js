import React, { useEffect, useState, useRef } from "react";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import { EffectCube, Virtual } from "swiper/modules";
import ProjectView from "./ProjectView";
import { useRouter } from "next/router";

import "swiper/css";
import "swiper/css/effect-cube";
import "swiper/css/pagination";

const CubeCarousel = ({ projects }) => {
  const swiperRef = useRef(null);
  const [isEnabled, setIsEnabled] = useState(true);
  let enabled = true;
  // const [intialSlide, setInitialSlide] = useState(0);

  const router = useRouter();

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

  return (
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
      className="projectSwiper"
    >
      {projects.map((project, index) => (
        <SwiperSlide key={index} virtualIndex={index}>
          <ProjectView
            key={project.id}
            project={project}
            onCollectStart={toggleSwiper}
            onCollectEnd={toggleSwiper}
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default CubeCarousel;

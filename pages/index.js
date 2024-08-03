import "@/styles/Home.css";

import { useSelector, useDispatch } from "react-redux";
import Slider from "react-slick";
import ProjectView from "@/components/ProjectView";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import {
  incrementClicks,
  updateBalance,
  updateProject,
} from "../store/mineSlice";

function Home() {
  const { projects } = useSelector((state) => state.mine);
  const dispatch = useDispatch();

  var settings = {
    dots: false,
    infinite: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };
  return (
    <div className="overflow-hidden">
      <Slider {...settings}>
        {projects.map((project) => (
          <ProjectView key={project.id} project={project} />
        ))}
      </Slider>
    </div>
  );
}

export default Home;

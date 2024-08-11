import "@/styles/ProjectItem.css";
import Image from "next/image";
import SimpleProgressBar from "./SimpleProgressBar";
import Link from "next/link";

const ProjectItem = ({ project }) => {
  const calculateDateProgress = (minDate, maxDate) => {
    const today = new Date();
    const min = new Date(minDate);
    const max = new Date(maxDate);
    const total = max - min;
    const current = today - min;
    return (current / total) * 100;
  };

  return (
    <Link
      href={{ pathname: "/", query: { projectId: project.id } }}
      className="p-item flex w-full text-white"
    >
      <div className="project-shape shape-l mr-24 p-2 flex items-center">
        <img
          className="rounded-full"
          src={project.image}
          alt={project.name}
          width={40}
          height={40}
        />

        <div className="absolute left-12 z-10 ml-4 w-4/6">
          <div className="text-lg font-semibold">{project.name}</div>
          <div className="text-sm">Earn {project.maxVal || 1000}</div>

          <SimpleProgressBar
            progress={
              project.mode === "range"
                ? (project.currentVal / project.maxVal) * 100
                : calculateDateProgress(project.startDate, project.endDate)
            }
          />
        </div>
      </div>
      <div className="project-shape shape-r">
        <div className="absolute right-2 z-10 flex items-center justify-center h-full">
          <span className="mr-2">{project.currentVal ?? 0}</span>
          <Image
            src="/images/coin.png"
            alt="Arrow Right"
            width={24}
            height={24}
          />
        </div>
      </div>
    </Link>
  );
};

export default ProjectItem;

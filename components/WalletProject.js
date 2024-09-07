import "@/styles/ProjectItem.css";

import Link from "next/link";

const WalletProjectItem = ({ project }) => {
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
          <div className="text-sm"> {project.maxVal || 1000}</div>
        </div>
      </div>
      <div className="project-shape shape-r">
        <div className="absolute right-4 z-10  h-full w-full pt-2 flex flex-col items-end"></div>
      </div>
    </Link>
  );
};

export default WalletProjectItem;

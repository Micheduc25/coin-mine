import ProjectItem from "@/components/ProjectItem";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const Projet = () => {
  const { projects } = useSelector((state) => state.mine);

  const [filteredProjects, setFilteredProjects] = useState([]);

  const handleSearch = (searchTerm) => {
    const result = projects.filter((p) =>
      p.name.toLowerCase().match(searchTerm.toLowerCase())
    );

    setFilteredProjects(result);
  };

  const clearSearch = () => {
    setFilteredProjects(projects);
  };

  useEffect(() => {
    setFilteredProjects(projects);
  }, []);

  return (
    <div className="p-2">
      <SearchBar
        onSearch={handleSearch}
        onClear={() => setFilteredProjects(projects)}
      />

      {!filteredProjects.length ? (
        <div className="font-bold text-white font-bergen text-xl text-center mt-10">
          No Results Found
        </div>
      ) : (
        filteredProjects.map((project, index) => (
          <ProjectItem key={project.id} project={project} />
        ))
      )}
    </div>
  );
};

export default Projet;

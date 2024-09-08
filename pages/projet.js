import Pagination from "@/components/Pagination";
import ProjectItem from "@/components/ProjectItem";
import SearchBar from "@/components/SearchBar";
import { useEffect, useState } from "react";

import { useSelector } from "react-redux";

const Projet = () => {
  const { projects } = useSelector((state) => state.mine);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const [filteredProjects, setFilteredProjects] = useState([]);

  const [currentItems, setCurrentItems] = useState([]);

  const [isLandscape, setIsLandscape] = useState(false);

  const handleSearch = (searchTerm) => {
    const result = projects.filter((p) =>
      p.name.toLowerCase().match(searchTerm.toLowerCase())
    );

    setFilteredProjects(result);
  };

  const onPageChange = (page, projectsList) => {
    const indexOfLastItem = page * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    setCurrentItems(
      projectsList
        ? projectsList.slice(indexOfFirstItem, indexOfLastItem)
        : filteredProjects.slice(indexOfFirstItem, indexOfLastItem)
    );
  };

  useEffect(() => {
    onPageChange(1);
  }, [filteredProjects]);

  useEffect(() => {
    setItemsPerPage(Math.floor(window.innerHeight / 120));
    setFilteredProjects(() => {
      return projects;
    });

    if (window.innerWidth > window.innerHeight && window.innerHeight < 500) {
      setIsLandscape(true);
    }
  }, []);

  return (
    <div
      className="p-2 overflow-auto max-h-screen mb-24"
      style={{
        width: isLandscape ? "calc(100% - 100px)" : "100%",
        marginLeft: isLandscape ? "auto" : "0",
      }}
    >
      <SearchBar
        onSearch={handleSearch}
        onClear={() => setFilteredProjects(projects)}
      />

      {!filteredProjects.length ? (
        <div className="font-bold text-white font-bergen text-xl text-center mt-10">
          No Results Found
        </div>
      ) : (
        currentItems.map((project, index) => (
          <ProjectItem key={project.id} project={project} />
        ))
      )}

      <Pagination
        totalItems={filteredProjects.length}
        itemsPerPage={itemsPerPage}
        onPageChange={onPageChange}
      />
    </div>
  );
};

export default Projet;

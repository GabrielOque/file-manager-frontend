import FacultiesCard from "../components/FacultiesCard";
import { useEffect, useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
import CreateFacultyModal from "../components/CreateFacultyModal";

const HomeSuperAdmin = () => {
  const { faculties, getFaculties } = useContextProvider();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [search, setSearch] = useState("");
  const handdleSearch = (e) => {
    setSearch(e.target.value);
  };

  const handdleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  useEffect(() => {
    (async () => {
      await getFaculties();
    })();
  }, []);
  if (!Array.isArray(faculties) || faculties.length === 0)
    return (
      <div className="home relative">
        <div className="top-info-home">
          <div className="tittle-with-icon">
            <i className="fa-solid fa-layer-group" />
            <h1 className="tittle-home">FACULTADES</h1>
          </div>
        </div>
        <div className="line-home"></div>
        <div className="create-and-search">
          <button className="btn-create" onClick={handdleModal}>
            <i className="fa-solid fa-user-plus" />
            Nueva facultad
          </button>
        </div>
        <div className="nothing">
          <img
            src="/src/assets/trabajador.png"
            alt="not-files"
            draggable="false"
          />
          <h2>No hay facultades</h2>
        </div>
        {isModalOpen && <CreateFacultyModal setIsModalOpen={setIsModalOpen} />}
      </div>
    );

  return (
    <div className="home">
      <div className="top-info-home">
        <div className="tittle-with-icon">
          <i className="fa-solid fa-layer-group" />
          <h1 className="tittle-home">FACULTADES</h1>
        </div>
      </div>
      <div className="line-home"></div>
      <div className="create-and-search">
        <button className="btn-create" onClick={handdleModal}>
          <i className="fa-regular fa-square-plus" />
          Nueva facultad
        </button>
        <div className="search-home">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            onChange={handdleSearch}
            placeholder="Buscar facultad"
            className="search-input"
          />
        </div>
      </div>
      <div className="container-cards">
        {faculties
          .filter((item) =>
            item?.name.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map((item) => (
            <FacultiesCard key={item._id} item={item} />
          ))}
      </div>
      {isModalOpen && <CreateFacultyModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default HomeSuperAdmin;

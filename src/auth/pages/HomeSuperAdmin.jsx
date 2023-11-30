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
            <h1 className="tittle-home">PROFESORES</h1>
          </div>
          <button
            className="px-7 py-3 bg-red-600 rounded-lg text-white hover:bg-slate-400"
            onClick={handdleModal}
          >
            Crear facultad
          </button>
        </div>
        <div className="line-home"></div>
        <div className="h-full w-full flex justify-center items-center">
          No hay usuarios para esta facultad
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
        <button
          className="px-7 py-3 bg-red-600 rounded-lg text-white hover:bg-slate-400"
          onClick={handdleModal}
        >
          Crear facultad
        </button>
        <div className="search-home">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            onChange={handdleSearch}
            placeholder="Buscar Facultad"
            className="search-input"
          />
        </div>
      </div>
      <div className="line-home"></div>
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

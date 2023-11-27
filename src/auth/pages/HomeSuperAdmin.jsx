import FacultiesCard from "../components/FacultiesCard";
import { useEffect, useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";

const HomeSuperAdmin = () => {
  const { faculties, getFaculties } = useContextProvider();
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => {
      await getFaculties();
    })();
  }, []);
  if (!Array.isArray(faculties) || faculties.length === 0)
    return <h1>Cargando</h1>;
  const handdleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="home">
      <div className="top-info-home">
        <div className="tittle-with-icon">
          <i className="fa-solid fa-layer-group" />
          <h1 className="tittle-home">FACULTADES</h1>
        </div>
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
          .map((item) => (
            <FacultiesCard key={item._id} item={item} />
          ))}
      </div>
    </div>
  );
};

export default HomeSuperAdmin;

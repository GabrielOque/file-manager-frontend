import { useEffect, useState } from "react";
import UserCard from "../components/UserCard";
import { useContextProvider } from "../../context/ContextProvider";
const HomeAdmin = () => {
  const { authenticated, getUsersFaculties, userFaculties } =
    useContextProvider();
  const [search, setSearch] = useState("");

  useEffect(() => {
    (async () => {
      await getUsersFaculties(authenticated.faculty);
    })();
  }, []);

  if (!Array.isArray(userFaculties) || userFaculties.length === 0)
    return <h1>Cargando</h1>;
  const handdleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="home">
      <div className="top-info-home">
        <div className="tittle-with-icon">
          <i className="fa-solid fa-layer-group" />
          <h1 className="tittle-home">PROFESORES</h1>
        </div>
        <div className="search-home">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            onChange={handdleSearch}
            placeholder="Buscar por correo"
            className="search-input"
          />
        </div>
      </div>
      <div className="line-home"></div>
      <div className="container-users">
        {userFaculties
          .filter((item) =>
            item?.email.toLowerCase().includes(search.toLowerCase())
          )
          .map(
            (user, index) =>
              user._id !== authenticated._id && (
                <UserCard key={user._id} user={user} index={index} />
              )
          )}
      </div>
    </div>
  );
};

export default HomeAdmin;

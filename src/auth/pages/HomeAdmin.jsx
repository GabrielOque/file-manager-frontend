import { useEffect, useState } from "react";
import defaultImage from "../../assets/default.png";
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

  const getFullName = (user) => {
    return `${user.name} ${user.lastName}`;
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
      <div className="table">
        <section className="table-body">
          <table>
            <thead>
              <tr>
                <th>Imagen</th>
                <th>Nombre y Apellido</th>
                <th>Correo</th>
                <th>Rol</th>
              </tr>
            </thead>

            {userFaculties
              .filter((item) =>
                item?.email.toLowerCase().includes(search.toLowerCase())
              )
              .map(
                (user) =>
                  user._id !== authenticated._id && (
                    <tbody>
                      <td className="row-list">
                        {user.avatar.public_id ? (
                          <img src={user.avatar.url} />
                        ) : (
                          <img src={defaultImage} />
                        )}
                      </td>
                      <td className="row-list">
                        {user.name ? (
                          <p>{getFullName(user)}</p>
                        ) : (
                          <p>Sin verificar</p>
                        )}
                      </td>
                      <td className="row-list">
                        {" "}
                        <p>{user.email}</p>
                      </td>
                      <td className="row-list">
                        <p>{user.rol}</p>
                      </td>
                    </tbody>
                  )
              )}
          </table>
        </section>
      </div>
    </div>
  );
};

export default HomeAdmin;

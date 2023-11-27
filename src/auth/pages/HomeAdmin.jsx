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
    <div className="overflow-y-auto h-screen">
      <p className="text-center font-bold">
        LISTA DE USUARIOS PARA ADMINISTRADOR
      </p>
      <div className="text-center ">
        <input
          onChange={handdleSearch}
          placeholder="Buscar Usuario por correo"
          className="p-3 bg-blue-300 w-72"
        />
      </div>
      <div className="w-full flex flex-wrap justify-between">
        {userFaculties
          .filter((item) =>
            item?.email.toLowerCase().includes(search.toLowerCase())
          )
          .map(
            (user) =>
              user._id !== authenticated._id && (
                <div key={user._id} className="bg-red-500 w-1/4 p-3 m-3">
                  {user.name ? (
                    <h1 className="text-xl font-bold">{getFullName(user)}</h1>
                  ) : (
                    <h1 className="text-xl font-bold">Sin verificar</h1>
                  )}
                  <h1 className="text-xl font-bold">{user.email}</h1>
                  {user.avatar.public_id ? (
                    <img src={user.avatar.url} />
                  ) : (
                    <img src={defaultImage} />
                  )}
                </div>
              )
          )}
      </div>
    </div>
  );
};

export default HomeAdmin;

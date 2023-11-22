import React from "react";
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
    <div className="overflow-y-auto h-screen">
      <p className="text-center font-bold">
        LISTA DE FACULTADES PARA SUPER ADMINISTRADORES
      </p>
      <div className="text-center ">
        <input
          onChange={handdleSearch}
          placeholder="Buscar Usuario por correo"
          className="p-3 bg-blue-300 w-72"
        />
      </div>
      <div className="w-full flex flex-wrap justify-between">
        {faculties
          .filter((item) =>
            item?.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((item) => (
            <div key={item._id} className="bg-red-500 w-1/4 p-3 m-3">
              <h1 className="text-xl font-bold">{item._id}</h1>
              <h1 className="text-xl font-bold">{item.name}</h1>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeSuperAdmin;

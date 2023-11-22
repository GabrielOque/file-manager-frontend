import { useEffect, useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
const HomeUser = () => {
  const { getFiles, authenticated, files } = useContextProvider();
  const [search, setSearch] = useState("");
  useEffect(() => {
    (async () => {
      await getFiles(authenticated._id);
    })();
  }, []);
  if (!Array.isArray(files) || files.length === 0) return <h1>Cargando</h1>;
  const handdleSearch = (e) => {
    setSearch(e.target.value);
  };
  return (
    <div className="overflow-y-auto h-screen">
      <p className="text-center font-bold">LISTA DE ARCHIVOS</p>
      <div className="text-center ">
        <input
          onChange={handdleSearch}
          placeholder="Buscar Usuario por correo"
          className="p-3 bg-blue-300 w-72"
        />
      </div>
      <div className="w-full flex flex-wrap justify-between">
        {files
          .filter((file) =>
            file?.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((file) => (
            <div key={file._id} className="bg-red-500 w-1/4 p-3 m-3">
              <h1 className="text-xl font-bold">{file.name}</h1>
              <h1 className="text-xl font-bold">{file.description}</h1>
              <a
                href={file.file.url}
                className="text-xl font-bold truncate "
                target="_black"
              >
                Abrir archivo
              </a>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeUser;

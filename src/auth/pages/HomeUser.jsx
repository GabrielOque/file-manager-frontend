import { useEffect, useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
import FileCard from "../components/FileCard";
import Profile from "../components/Profile";

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
    <div className="home">
      <Profile />
      <div className="search-home-profile">
        <i className="fa-solid fa-magnifying-glass" />
        <input
          onChange={handdleSearch}
          placeholder="Buscar archivo por nombre"
          className="search-input"
        />
      </div>
      <div className="container-files">
        {files
          .filter((file) =>
            file?.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((file) => (
            <FileCard key={file._id} file={file} />
          ))}
      </div>
    </div>
  );
};

export default HomeUser;

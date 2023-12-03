import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";
import FileCard from "../components/FileCard";
import Profile from "../components/Profile";

const FilesPage = () => {
  const params = useParams();
  const { getFiles, files, user } = useContextProvider();
  const [search, setSearch] = useState("");
  const handdleSearch = (e) => {
    setSearch(e.target.value);
  };
  useEffect(() => {
    (async () => {
      await getFiles(params.id);
    })();
  }, []);
  return (
    <div className="home">
      <Profile user={user} />
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
          .reverse()
          .map((file) => (
            <FileCard key={file._id} file={file} />
          ))}
      </div>
    </div>
  );
};

export default FilesPage;

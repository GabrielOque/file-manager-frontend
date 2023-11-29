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
    <div className="home">
      <div className="top-info-home">
        <div className="tittle-with-icon">
          <i className="fa-solid fa-user" />
          <h1 className="tittle-home">{authenticated.name}</h1>
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
      <div className="container-files">
        {files
          .filter((file) =>
            file?.name.toLowerCase().includes(search.toLowerCase())
          )
          .map((file) => (
            <a
              key={file._id}
              className="card-files"
              href={file.file.url}
              target="blank"
            >
              <h1 className="card-files-tittle">{file.name}</h1>
              <h1 className="card-files-desc">{file.description}</h1>
              {file.isApproved ? (
                <div className="files-approver">
                  <i id="icon-approver" className="fa-solid fa-circle-check" />
                  <p>{file.approver}Aprobado</p>
                  <i id="comments" className="fa-regular fa-comments" />
                </div>
              ) : (
                <div className="files-approver">
                  <i id="icon-approver" className="fa-regular fa-clock" />
                  <p>{file.approver}Pendiente</p>
                  <i id="comments" className="fa-regular fa-comments" />
                </div>
              )}
            </a>
          ))}
      </div>
    </div>
  );
};

export default HomeUser;

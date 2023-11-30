import { useEffect, useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
import { getFullName } from "../../helpers/helpers";
import defaultImage from "../../assets/default.png";

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
      <div className="top-info-home-profile">
        <div className="tittle-with-icon-profile">
          {authenticated.avatar.public_id ? (
            <img src={authenticated.avata.url} draggable="false" alt="avatar" />
          ) : (
            <img src={defaultImage} draggable="false" alt="avatar" />
          )}
          <div className="info-profile">
            <h1 className="tittle-home-profile">
              {getFullName(authenticated)}
            </h1>
            <p className="email-home-profile">
              <i className="fa-solid fa-envelope" /> {authenticated.email}
            </p>
            <p className="rol-home-profile">
              <i className="fa-solid fa-user" /> {authenticated.rol}
            </p>
          </div>
        </div>
      </div>
      <div className="line-home"></div>
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
            <div className="files-back" key={file._id}>
              <a className="card-files" href={file.file.url} target="blank">
                <div className="file-icon">
                  <i className="fa-solid fa-file-lines" />
                </div>
                <div className="file-tittle">
                  <h1>{file.name}</h1>
                </div>
                <div className="file-desc">
                  <h1>{file.description}</h1>
                </div>
                {file.isApproved ? (
                  <div className="file-approver">
                    <i className="fa-solid fa-circle-check" />
                    <p>{file.approver}Aprobado</p>
                  </div>
                ) : (
                  <div className="file-approver">
                    <i className="fa-regular fa-clock" />
                    <p>{file.approver}Pendiente</p>
                  </div>
                )}
                <div className="file-comments">
                  <i className="fa-solid fa-comments" />
                </div>
              </a>
              <div className="menu">
                {/* <i className="fa-solid fa-ellipsis-vertical" /> */}
                <i className="fa-regular fa-trash-can" />
              </div>
            </div>
          ))}
      </div>
    </div>
  );
};

export default HomeUser;

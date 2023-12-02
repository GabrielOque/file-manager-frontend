import { useContextProvider } from "../../context/ContextProvider";
import { useState } from "react";
import UserCard from "../components/UserCard";
import CreateUserModal from "../components/CreateUserModal";
import { useParams } from "react-router-dom";

const UsersPage = () => {
  const params = useParams();
  const { userFaculties, authenticated } = useContextProvider();
  const [search, setSearch] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handdleSearch = (e) => {
    setSearch(e.target.value);
  };
  const handdleModal = () => {
    setIsModalOpen(!isModalOpen);
  };
  if (!Array.isArray(userFaculties) || userFaculties.length === 0) {
    return (
      <div className="home relative">
        <div className="top-info-home">
          <div className="tittle-with-icon">
            <i className="fa-solid fa-layer-group" />
            <h1 className="tittle-home">{params.name}</h1>
          </div>
        </div>
        <div className="line-home"></div>
        <div className="create-and-search">
          <button className="btn-create" onClick={handdleModal}>
            <i className="fa-solid fa-user-plus" />
            Nuevo usuario
          </button>
        </div>
        <div className="nothing">
          <img
            src="/src/assets/trabajador.png"
            alt="not-files"
            draggable="false"
          />
          <h2>No hay usuarios para esta facultad</h2>
        </div>
        {isModalOpen && <CreateUserModal setIsModalOpen={setIsModalOpen} />}
      </div>
    );
  }
  return (
    <div className="home relative">
      <div className="top-info-home">
        <div className="tittle-with-icon">
          <i className="fa-solid fa-layer-group" />
          <h1 className="tittle-home">{params.name}</h1>
        </div>
      </div>
      <div className="line-home"></div>
      <div className="create-and-search">
        <button className="btn-create" onClick={handdleModal}>
          <i className="fa-solid fa-user-plus" />
          Nuevo usuario
        </button>
        <div className="search-home">
          <i className="fa-solid fa-magnifying-glass" />
          <input
            onChange={handdleSearch}
            placeholder="Buscar por correo"
            className="search-input"
          />
        </div>
      </div>
      <div className="container-users">
        {userFaculties
          .filter((item) =>
            item?.email.toLowerCase().includes(search.toLowerCase())
          )
          .reverse()
          .map(
            (user, index) =>
              user._id !== authenticated._id && (
                <UserCard key={user._id} user={user} index={index} />
              )
          )}
      </div>
      {isModalOpen && <CreateUserModal setIsModalOpen={setIsModalOpen} />}
    </div>
  );
};

export default UsersPage;

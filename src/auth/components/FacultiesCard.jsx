import { useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
import UpdateFacultyModal from "./UpdateFacultyModal";
import DeleteFacultyModal from "./DeleteFacultyModal";
const FacultiesCard = ({ item }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
  const navigate = useNavigate();
  const { getUsersFaculties } = useContextProvider();

  const handdleVisit = async (id) => {
    await getUsersFaculties(id);
    navigate(`/users-page/${item.name}/${id}`);
  };
  return (
    <div className="facult-cards">
      <div className="box" onClick={() => handdleVisit(item._id)}>
        <div className="content">
          <h2>IUE</h2>
          <h3 className="text-name-facult-cards">{item.name}</h3>
          <p className="text-id-facult-cards">{item._id}</p>
        </div>
      </div>
      <h2 className="interact">Visitar</h2>
      <div className="facult-icon">
        <i
          className="fa-solid fa-trash"
          onClick={() => setIsModalDeleteOpen(!isModalDeleteOpen)}
        />
        <i
          className="fa-solid fa-pen-to-square"
          onClick={() => setIsModalOpen(!isModalOpen)}
        />
      </div>
      {isModalOpen && (
        <UpdateFacultyModal
          setIsModalOpen={setIsModalOpen}
          id={item._id}
          name={item.name}
        />
      )}
      {isModalDeleteOpen && (
        <DeleteFacultyModal
          setIsModalDeleteOpen={setIsModalDeleteOpen}
          id={item._id}
          name={item.name}
        />
      )}
    </div>
  );
};

export default FacultiesCard;

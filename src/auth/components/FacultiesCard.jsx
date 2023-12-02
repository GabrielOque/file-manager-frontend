import React from "react";
import { useContextProvider } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";
const FacultiesCard = ({ item }) => {
  const navigate = useNavigate();
  const { getUsersFaculties } = useContextProvider();

  const handdleVisit = async (id) => {
    await getUsersFaculties(id);
    navigate(`/users-page/${id}`);
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
      <div className="facult-icon">
        <i className="fa-solid fa-ellipsis-vertical" />
      </div>
      <h2 className="interact">Visitar</h2>
    </div>
  );
};

export default FacultiesCard;

import { useContextProvider } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const CardFacultySideBar = ({ item }) => {
  const navigate = useNavigate();
  const { getUsersFaculties } = useContextProvider();
  return (
    <div
      className="facult-list-one"
      onClick={async () => {
        await getUsersFaculties(item._id);
        navigate(`/users-page/${item.name}/${item._id}`);
      }}
    >
      <i className="fa-solid fa-caret-right" />
      <h2>{item.name}</h2>
    </div>
  );
};

export default CardFacultySideBar;

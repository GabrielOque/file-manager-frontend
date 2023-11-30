import { useContextProvider } from "../../context/ContextProvider";
import { useNavigate } from "react-router-dom";

const CardFacultySideBar = ({ item }) => {
  const navigate = useNavigate();
  const { getUsersFaculties } = useContextProvider();
  return (
    <div
      className="mx-5 py-1 bg-slate-400 mb-3 rounded-lg px-5 font-bold hover:bg-slate-500 cursor-pointer"
      onClick={async () => {
        await getUsersFaculties(item._id);
        navigate(`/users-page/${item._id}`);
      }}
    >
      <div>{item.name}</div>
    </div>
  );
};

export default CardFacultySideBar;

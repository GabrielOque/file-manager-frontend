import defaultImage from "../../assets/default.png";
import { getFullName } from "../../helpers/helpers";
import { useNavigate } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";

const UserCard = ({ user }) => {
  const { getUser } = useContextProvider();
  const navigate = useNavigate();
  const handleUser = async () => {
    await getUser(user._id);
    navigate(`/files-page/${user._id}`);
  };
  return (
    <div className="card-back">
      <div className="card-user" onClick={() => handleUser()}>
        {user.avatar.public_id ? (
          <img src={user.avatar.url} draggable="false" />
        ) : (
          <img src={defaultImage} draggable="false" />
        )}
        {user.name ? <p>{getFullName(user)}</p> : <p>Sin verificar</p>}
        <p>{user.email}</p>
        <p>{user.rol}</p>
      </div>
      <div className="menu-user">
        <i className="fa-solid fa-square-up-right" />
      </div>
    </div>
  );
};

export default UserCard;

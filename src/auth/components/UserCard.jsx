import defaultImage from "../../assets/default.png";
import { getFullName } from "../../helpers/helpers";

const UserCard = ({ user, index }) => {
  return (
    <div className="card-back">
      <div
        className="card-user"
        // className={index % 2 === 0 ? " card-user even-row" : "card-user odd-row"}
      >
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

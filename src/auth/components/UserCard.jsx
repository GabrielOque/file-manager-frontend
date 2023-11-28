import defaultImage from "../../assets/default.png";

const UserCard = ({ user, index }) => {
  const getFullName = (user) => {
    return `${user.name} ${user.lastName}`;
  };
  return (
    <div
      className="card-user"
      // className={index % 2 === 0 ? " card-user even-row" : "card-user odd-row"}
    >
      {user.avatar.public_id ? (
        <img src={user.avatar.url} draggable="false" />
      ) : (
        <img src={defaultImage} />
      )}
      {user.name ? <p>{getFullName(user)}</p> : <p>Sin verificar</p>}
      <p>{user.email}</p>
      <p>{user.rol}</p>
    </div>
  );
};

export default UserCard;

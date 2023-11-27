import defaultImage from "../../assets/default.png";

const UserCard = ({ user }) => {
  const getFullName = (user) => {
    return `${user.name} ${user.lastName}`;
  };
  return (
    <tbody>
      <tr>
        <td className="row-list">
          {user.avatar.public_id ? (
            <img src={user.avatar.url} />
          ) : (
            <img src={defaultImage} />
          )}
        </td>
        <td className="row-list">
          {user.name ? <p>{getFullName(user)}</p> : <p>Sin verificar</p>}
        </td>
        <td className="row-list">{user.email}</td>
        <td className="row-list">{user.rol}</td>
      </tr>
    </tbody>
  );
};

export default UserCard;

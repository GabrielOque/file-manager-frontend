import { useContextProvider } from "../../context/ContextProvider";
import { getFullName } from "../../helpers/helpers";
import defaultImage from "../../assets/default.png";

const Profile = () => {
  const { authenticated } = useContextProvider();
  return (
    <>
      <div className="top-info-home-profile">
        <div className="tittle-with-icon-profile">
          {authenticated.avatar.public_id ? (
            <img
              src={authenticated.avatar.url}
              draggable="false"
              alt="avatar"
            />
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
    </>
  );
};

export default Profile;

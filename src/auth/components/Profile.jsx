import { getFullName } from "../../helpers/helpers";
import defaultImage from "../../assets/default.png";
import { useState } from "react";
import UploadFile from "./UploadFile";

const Profile = ({ user }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <>
      <div className="top-info-home-profile">
        <div className="tittle-with-icon-profile">
          {user.avatar.public_id ? (
            <img src={user.avatar.url} draggable="false" alt="avatar" />
          ) : (
            <img src={defaultImage} draggable="false" alt="avatar" />
          )}
          <div className="info-profile">
            <h1 className="tittle-home-profile">{getFullName(user)}</h1>
            <p className="email-home-profile">
              <i className="fa-solid fa-envelope" /> {user.email}
            </p>
            <p className="rol-home-profile">
              <i className="fa-solid fa-user" /> {user.rol}
            </p>
          </div>
        </div>
        <button onClick={() => setShowModal(!showModal)}>Subir archivo</button>
      </div>
      <div className="line-home"></div>
      {showModal && <UploadFile setShowModal={setShowModal} user={user} />}
    </>
  );
};

export default Profile;

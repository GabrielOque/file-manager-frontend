import { useState } from "react";
import { useContextProvider } from "../../context/ContextProvider";
import { ROLES } from "../../config/config";
import CommentModal from "./CommentModal";

const FileCard = ({ file }) => {
  const { authenticated, updateStatus, deleteFile } = useContextProvider();
  const [showModal, setShowModal] = useState(false);

  const approveFile = async (id, data) => {
    await updateStatus(id, data);
  };
  const handleHheck = (e) => {
    const data = {
      isApproved: e.target.checked,
      approver: authenticated.name,
    };

    approveFile(file._id, data);
  };

  const handleDelete = async () => {
    await deleteFile(file._id);
  };
  return (
    <div className="files-back">
      {showModal && <CommentModal setShowModal={setShowModal} file={file} />}

      <div className="card-files">
        <a className="file-link" href={file.file.url} target="blank">
          <div className="file-icon">
            <i className="fa-solid fa-file-lines" />
          </div>
          <div className="file-tittle">
            <h1>{file.name}</h1>
          </div>
          <div className="file-desc">
            <h1>{file.description}</h1>
          </div>
        </a>
        {file.status.isApproved ? (
          <div className="file-approver">
            <div className="approver-name">
              <i className="fa-solid fa-circle-check" />
              <span>{file.approver}Aprobado</span>
            </div>
            <p>{file.status.approver}</p>
          </div>
        ) : (
          <div className="file-approver">
            <div className="approver-name">
              <i className="fa-regular fa-clock" />
              <span>{file.approver}Pendiente</span>
            </div>
          </div>
        )}
        <div className="file-comments" onClick={() => setShowModal(!showModal)}>
          <i className="fa-solid fa-comments" />
        </div>
      </div>
      {file.author !== authenticated._id &&
      (authenticated.rol === ROLES.SUPER_ADMIN ||
        authenticated.rol === ROLES.ADMIN) ? (
        <div className="menu">
          <input
            checked={file.status.isApproved}
            type="checkbox"
            className="bg-slate-50 "
            onChange={handleHheck}
          />
        </div>
      ) : (
        <div className="menu" onClick={() => handleDelete()}>
          {/* <i className="fa-solid fa-ellipsis-vertical" /> */}
          <i className="fa-regular fa-trash-can" />
        </div>
      )}
    </div>
  );
};

export default FileCard;

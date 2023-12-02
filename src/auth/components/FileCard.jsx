import React from "react";

const FileCard = ({ file }) => {
  return (
    <div className="files-back">
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
        {file.isApproved ? (
          <div className="file-approver">
            <i className="fa-solid fa-circle-check" />
            <p>{file.approver}Aprobado</p>
          </div>
        ) : (
          <div className="file-approver">
            <i className="fa-regular fa-clock" />
            <p>{file.approver}Pendiente</p>
          </div>
        )}
        <div className="file-comments" onClick={() => console.log("Comment")}>
          <i className="fa-solid fa-comments" />
        </div>
      </div>
      <div className="menu" onClick={() => console.log("Delete")}>
        {/* <i className="fa-solid fa-ellipsis-vertical" /> */}
        <i className="fa-regular fa-trash-can" />
      </div>
    </div>
  );
};

export default FileCard;

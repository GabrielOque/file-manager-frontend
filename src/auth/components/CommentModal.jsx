import { useForm } from "react-hook-form";
import { useEffect } from "react";
import CommentCard from "./CommentCard";
import { useContextProvider } from "../../context/ContextProvider";
const CommentModal = ({ setShowModal, file }) => {
  const { getComments, authenticated, comments, createComment } =
    useContextProvider();
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    (async () => {
      await getComments(file._id);
    })();
  }, []);
  const onSubmit = async (data) => {
    const comment = {
      ...data,
      author: {
        idAthor: authenticated._id,
        nameAuthor: authenticated.name,
      },
      file: file._id,
    };
    await createComment(comment);
    reset();
  };
  return (
    <div className="back-modal-comment">
      <div className="modal-comment">
        <button
          className="btn-close-modal"
          onClick={() => setShowModal((prevState) => !prevState)}
        >
          <i className="fa-solid fa-xmark" />
        </button>

        <div className="tittle-modal">
          <h2>Comentarios</h2>
        </div>
        <div className="modal-line"></div>
        <div className="what-comment">
          <div className="name-file-comment">
            <i className="fa-solid fa-file-lines" />
            <p>{file.name}</p>
          </div>
          <p className="desc-comment">{file.description}</p>
        </div>

        <div className="space-comment">
          {comments.map((comment) => (
            <CommentCard comment={comment} key={comment._id} />
          ))}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="form-comment">
          <input
            {...register("description", { required: true })}
            className="input-comment"
            placeholder="Agrega un mensaje"
          />
          <button type="onsubmit" className="btn-comment">
            <i className="fa-solid fa-paper-plane" />
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;

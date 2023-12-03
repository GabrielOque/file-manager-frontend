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
    <div className="absolute top-0 left-[20%] h-[700px] w-[600px] bg-slate-600 flex flex-col justify-between items- z-[2147483647]">
      <button
        onClick={() => setShowModal((prevState) => !prevState)}
        className=" absolute right-0 text-white mr-2 mt-2"
      >
        X
      </button>

      <div className="p-5">
        <h1 className="text-white font-bold text-xl">Comentarios</h1>
        <div className="flex text-white truncate pl-5 pt-2">
          <i className="fa-solid fa-file pr-2 text-xl" />
          <p className=" font-bold">{file.name}</p>
        </div>
        <p className="text-white truncate pl-5 pt-2">{file.description}</p>
      </div>
      <div className="h-[500px] w-full bg-red-500 overflow-y-auto">
        {comments.map((comment) => (
          <CommentCard comment={comment} key={comment._id} />
        ))}
      </div>
      <div className="w-full">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex justify-evenly w-full mb-4"
        >
          <input
            {...register("description", { required: true })}
            className="py-4 w-[80%] px-5"
            placeholder="Agrega un mensaje"
          />
          <button type="onsubmit" className="text-white">
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CommentModal;

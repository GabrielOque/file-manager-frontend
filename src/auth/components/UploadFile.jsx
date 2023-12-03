import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
const UploadFile = ({ setShowModal, user }) => {
  const { uploadFile } = useContextProvider();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const newFile = {
      file: data.file[0],
      name: data.name,
      description: data.description,
      author: user._id,
    };
    await uploadFile(newFile);
    setShowModal((prevState) => !prevState);
  };
  return (
    <div className="absolute top-40 left-[35%] h-[700px] w-[600px] bg-slate-600 z-[2147483647]">
      <button
        onClick={() => setShowModal((prevState) => !prevState)}
        className=" absolute right-0 text-white mr-2 mt-2"
      >
        X
      </button>

      <div className="flex items-center justify-center h-full w-full">
        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
          <input
            {...register("name", { required: true })}
            className="mb-2 py-2 px-2"
            placeholder="Nombre del archivo"
          />
          {errors.name && (
            <p className="pl-3 text-red-200">Se requiere un nombre</p>
          )}
          <input
            {...register("description", { required: true })}
            className="mb-2 py-2 px-2"
            placeholder="Descripcion del archivo"
          />
          {errors.description && (
            <p className="pl-3 text-red-200">Se requiere una descripcion</p>
          )}
          <input
            type="file"
            {...register("file", { required: true })}
            className="mb-2 py-2 px-2"
            placeholder="Descripcion del archivo"
          />
          {errors.file && (
            <p className="pl-3 text-red-200">Se requiere un archivo</p>
          )}
          <button
            type="onsubmit"
            className="mt-7 py-3 px-5 bg-red-700 rounded-lg text-white text-font hover:bg-blue-500 font-bold"
          >
            Enviar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UploadFile;

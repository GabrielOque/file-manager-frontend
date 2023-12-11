import { useState } from "react";
import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
import Loading from "../../public/components/Loading";
const UploadFile = ({ setShowModal, user }) => {
  const [isLoading, setIsLoading] = useState(false);
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
    setIsLoading(!isLoading);
    await uploadFile(newFile);
    setIsLoading((prevState) => !prevState);
    setShowModal((prevState) => !prevState);
  };
  return (
    <div className="back-modal">
      <div className="modal-config-profile">
        <button
          className="btn-close-modal"
          onClick={() => setShowModal((prevState) => !prevState)}
        >
          <i className="fa-solid fa-xmark" />
        </button>
        <div className="tittle-modal">
          <h2> Subir un archivo</h2>
        </div>
        <div className="modal-line"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="content-modal">
          <input
            {...register("name", { required: true })}
            className="input-modal"
            placeholder="Nombre del archivo"
          />
          <input
            {...register("description", { required: true })}
            className="input-modal"
            placeholder="Descripción del archivo"
          />
          <input
            type="file"
            {...register("file", { required: true })}
            className="input-modal"
            placeholder="Descripcion del archivo"
          />
          {errors.name && <p className="alert-modal1">Se requiere un nombre</p>}
          {errors.description && (
            <p className="alert-modal2">Se requiere una descripcion</p>
          )}
          {errors.file && (
            <p className="alert-modal3">Se requiere un archivo</p>
          )}
          <button type="onsubmit" className="btn-modal">
            Enviar
          </button>
          {isLoading && (
            <div className="w-full flex justify-center bottom-16 z-10 absolute">
              <Loading />
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default UploadFile;

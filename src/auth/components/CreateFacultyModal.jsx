import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";

const CreateFacultyModal = ({ setIsModalOpen }) => {
  const { createFaculty } = useContextProvider();
  const handleStateModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await createFaculty(data);
    handleStateModal();
  };
  return (
    <div className="back-modal">
      <div className="modal">
        <button className="btn-close-modal" onClick={handleStateModal}>
          <i className="fa-solid fa-xmark" />
        </button>
        <div className="tittle-modal">
          <h2> Crear nueva facultad</h2>
        </div>
        <div className="modal-line"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="content-modal">
          <input
            type="text"
            className="input-modal"
            placeholder="Nombre para la facultad"
            {...register("name", { required: true })}
          />
          {errors.email && (
            <p className="text-red-500">Este campo es requerido</p>
          )}
          <button className="btn-modal" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateFacultyModal;

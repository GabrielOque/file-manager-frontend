import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useContextProvider } from "../../context/ContextProvider";

const UpdateFacultyModal = ({ id, name, setIsModalOpen }) => {
  const { updateFaculty } = useContextProvider();
  const handleStateModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  const {
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    await updateFaculty(id, data);
    handleStateModal();
  };
  useEffect(() => {
    setValue("name", name);
  }, [name, setValue]);
  return (
    <div className="back-modal-facult">
      <div className="modal-facult">
        <button className="btn-close-modal" onClick={handleStateModal}>
          <i className="fa-solid fa-xmark" />
        </button>
        <div className="tittle-modal">
          <h2>Editar nombre</h2>
        </div>
        <div className="modal-line"></div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="content-modal-facult"
        >
          <input
            type="text"
            className="input-modal"
            placeholder="Nombre de la facultad"
            {...register("name", { required: true })}
          />
          {errors.email && (
            <p className="alert-modal-facult">El nombre es requerido</p>
          )}
          <button className=" btn-modal-facult" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateFacultyModal;

import { useForm } from "react-hook-form";
import { useParams } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";

const CreateUserModal = ({ setIsModalOpen }) => {
  const { userRegister } = useContextProvider();
  const params = useParams();
  const handleStateModal = () => {
    setIsModalOpen((prevState) => !prevState);
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    const newUser = {
      ...data,
      faculty: params.id,
    };
    await userRegister(newUser);
    handleStateModal();
  };

  return (
    <div className="back-modal">
      <div className="modal">
        <button className="btn-close-modal" onClick={handleStateModal}>
          <i className="fa-solid fa-xmark" />
        </button>
        <div className="tittle-modal">
          <h2> Crear nuevo usuario</h2>
        </div>
        <div className="modal-line"></div>
        <form onSubmit={handleSubmit(onSubmit)} className="content-modal">
          <input
            type="email"
            className="input-modal"
            placeholder="Correo electronico"
            {...register("email", { required: true })}
          />
          <select
            className=" input-modal"
            placeholder="Seleccione el rol"
            {...register("rol", { required: true })}
          >
            <option value="">Seleccione el rol</option>
            <option value="User">User</option>
            <option value="Admin">Admin</option>
          </select>
          {errors.email && (
            <p className="alert-modal1">El correo es requerido</p>
          )}
          {errors.rol && <p className="alert-modal2">El rol es requerido</p>}
          <button className="btn-modal" type="submit">
            Guardar
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateUserModal;

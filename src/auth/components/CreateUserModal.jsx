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
    <div className="w-[500px] h-[600px]  bg-emerald-900 absolute top-[30%] left-[35%] rounded-lg flex justify-center items-center">
      <div className="w-full relative">
        <button
          className="absolute -top-[200px] right-0 text-white font-bold text-2xl p-3"
          onClick={handleStateModal}
        >
          x
        </button>
        <div className="text-center py-5 font-bold text-white text-3xl">
          Modal crear usuario
        </div>
        <div className="px-7">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              type="email"
              className="mb-3 p-3 rounded-lg"
              placeholder="Correo electronico"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">Este campo es requerido</p>
            )}
            <div className="flex mb-7">
              <div className="w-1/2">
                <select
                  className=" p-2 rounded-lg"
                  placeholder="Seleccione el rol"
                  {...register("rol", { required: true })}
                >
                  <option value="">Seleccione el rol</option>
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
                {errors.rol && (
                  <p className="text-red-500">Este campo es requerido</p>
                )}
              </div>
              <div className="w-1/2 flex justify-end">
                <button
                  className="p-2 pl-4 bg-blue-500 rounded-lg hover:bg-slate-600"
                  type="submit"
                >
                  Guardar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateUserModal;

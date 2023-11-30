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
    <div className="w-[500px] h-[600px]  bg-emerald-900 absolute top-[30%] left-[35%] rounded-lg flex justify-center items-center z-50">
      <div className="w-full relative">
        <button
          className="absolute -top-[200px] right-0 text-white font-bold text-2xl p-3"
          onClick={handleStateModal}
        >
          x
        </button>
        <div className="text-center py-5 font-bold text-white text-3xl">
          Modal crear Facultad
        </div>
        <div className="px-7">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              type="text"
              className="mb-3 p-3 rounded-lg"
              placeholder="Nombre para la facultad"
              {...register("name", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">Este campo es requerido</p>
            )}

            <button
              className="p-2 pl-4 bg-blue-500 rounded-lg hover:bg-slate-600 w-1/2"
              type="submit"
            >
              Guardar
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateFacultyModal;

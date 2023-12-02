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
    <div className="w-[250px] h-[100px]  bg-emerald-900 absolute bottom-0  rounded-lg flex justify-center items-center z-50">
      <div className="w-full relative">
        <button
          className="absolute -top-[3px] right-0 text-white font-bold text-xl p-3"
          onClick={handleStateModal}
        >
          x
        </button>
        <div className="text-center font-bold text-white text-xs mt-5 mb-2">
          Editar nombre de la facultad
        </div>
        <div className="px-2">
          <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col">
            <input
              type="text"
              className="mb-2 p-1 rounded-lg"
              placeholder="Nombre para la facultad"
              {...register("name", { required: true })}
            />
            {errors.email && (
              <p className="text-red-500">Este campo es requerido</p>
            )}

            <button
              className=" bg-blue-500 rounded-lg hover:bg-slate-600 w-1/2 mb-5"
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

export default UpdateFacultyModal;

import { useContextProvider } from "../../context/ContextProvider";

const DeleteFacultyModal = ({ id, name, setIsModalDeleteOpen }) => {
  const { deleteFaculty } = useContextProvider();
  const handleStateModal = () => {
    setIsModalDeleteOpen((prevState) => !prevState);
  };

  const onsubmit = async () => {
    await deleteFaculty(id);
    handleStateModal();
  };

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
          Deseas eliminar {name}?
        </div>
        <div className="px-6 flex justify-between">
          <button
            className="px-2 py-1 rounded-lg bg-slate-500"
            onClick={() => handleStateModal()}
          >
            Cancelar
          </button>
          <button
            className="px-2 py-1 rounded-lg bg-slate-500"
            onClick={() => onsubmit()}
          >
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFacultyModal;

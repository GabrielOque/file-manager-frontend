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
    <div className="back-modal-facult">
      <div className="modal-facult">
        <button className="btn-close-modal" onClick={handleStateModal}>
          <i className="fa-solid fa-xmark" />
        </button>
        <div className="tittle-modal">
          <h2>Eliminar</h2>
        </div>
        <div className="modal-line"></div>
        <p className="alert-facult">
          ¿Estás seguro de que deseas eliminar esta facultad y todo lo vinculado
          a ella?
        </p>
        <div className="btns-facult">
          <button
            className="btn-modal-facult"
            onClick={() => handleStateModal()}
          >
            Cancelar
          </button>
          <button className="btn-modal-facult" onClick={() => onsubmit()}>
            Aceptar
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteFacultyModal;

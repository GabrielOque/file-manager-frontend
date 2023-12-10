import { useContextProvider } from "../../context/ContextProvider";
import { useState } from "react";
import Loading from "../../public/components/Loading";

const DeleteFacultyModal = ({ id, name, setIsModalDeleteOpen }) => {
  const [isLoading, setIsLoading] = useState(false);
  const { deleteFaculty } = useContextProvider();
  const handleStateModal = () => {
    setIsModalDeleteOpen((prevState) => !prevState);
  };

  const onsubmit = async () => {
    setIsLoading(!isLoading);
    await deleteFaculty(id);
    setIsLoading((prevState) => !prevState);
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
      {isLoading && (
        <div className="w-full flex justify-center absolute bottom-[25px]  z-50">
          <Loading />
        </div>
      )}
    </div>
  );
};

export default DeleteFacultyModal;

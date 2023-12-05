import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
import defaultimage from "../../assets/default.png";

const ModalUpdate = () => {
  const [imageSelected, setImageSelected] = useState(null);
  const { authenticated, updateUser } = useContextProvider();

  const update = async (data) => {
    const newData = {
      _id: authenticated._id,
      name: data.name,
      lastName: data.lastName,
      password: data.password,
      avatar: data.image[0],
    };
    await updateUser(newData);
    // console.log(newData);
  };
  const {
    control,
    watch,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  useEffect(() => {
    setImageSelected(watch("image", "")[0]);
  }, [watch("image", "")]);
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-[700px] h-[800px] bg-red-500 rounded-lg shadow-lg flex flex-col justify-center items-center">
        {imageSelected ? (
          <img
            className="h-40 w-40"
            src={URL.createObjectURL(imageSelected)}
            alt="default image"
          />
        ) : (
          <img className="h-40 w-40" src={defaultimage} alt="default image" />
        )}
        <h1 className="text-xl font-bold pb-3">
          Es necesario agregar los datos antes de que inicies
        </h1>
        <form onSubmit={handleSubmit(update)}>
          <div className="flex flex-col">
            <input
              className="bg-blue-100 h-10 p-3 m-3 rounded-lg text-xl"
              type="text"
              placeholder="Ingresa tu nombre"
              {...register("name", { required: true })}
            />
            {errors.name && <p className="pl-3">sE requiere un nombre</p>}
            <input
              className="bg-blue-100 h-10 p-3 m-3 rounded-lg text-xl"
              type="text"
              placeholder="Ingresa tu apellido"
              {...register("lastName", { required: true })}
            />
            {errors.lastName && (
              <p className="pl-3">SE requiere un aepellido</p>
            )}
            <input
              className="bg-blue-100 h-10 p-3 m-3 rounded-lg text-xl"
              type="password"
              placeholder="Establece una contrasena"
              {...register("password", { required: true })}
            />
            {errors.password && <p className="pl-3">Se requiere contrasena</p>}
            <label className="text-sm">Selecciona una imagen(Opcional)</label>
            <input
              ref={control.register}
              type="file"
              className="File-form"
              {...register("image")}
            />
          </div>
          <div className="w-full  flex justify-center mt-7">
            <button className="py-4 bg-green-700 px-7 rounded-lg hover:bg-blue-500 font-bold">
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
import defaultimage from "../../assets/default.png";

const ModalUpdate = () => {
  const { authenticated, updateUser } = useContextProvider();
  const [imageSelected, setImageSelected] = useState(null);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);

  const update = async (data) => {
    const newData = {
      _id: authenticated._id,
      name: data.name,
      lastName: data.lastName,
      password: data.password,
      avatar: data.image[0],
    };
    await updateUser(newData);
    console.log(newData);
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
    <div className="login-background">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="update-primary">
        <h1 className="tittle">Bienvenido a SwiftAdmin!</h1>
        <div className="line"></div>
        <p>Como es tu primera vez, debes agregar estos datos para continuar.</p>
        <label className="label-update">Selecciona una imagen(Opcional)</label>

        {imageSelected ? (
          <div className="image-user">
            <img
              src={URL.createObjectURL(imageSelected)}
              alt="default image"
              draggable="false"
            />
            <input
              ref={control.register}
              type="file"
              className="image-update-input"
              {...register("image")}
            />
          </div>
        ) : (
          <div className="image-user">
            <i className="fa-solid fa-circle-plus" />
            <img src={defaultimage} alt="default image" draggable="false" />
            <input
              ref={control.register}
              type="file"
              className="image-update-input"
              {...register("image")}
            />
          </div>
        )}

        <form onSubmit={handleSubmit(update)}>
          <div className="login-inputs">
            <div className="input-card">
              <i id="icon-input" className="fa-solid fa-user" />
              <input
                className="input"
                type="text"
                placeholder="Nombre"
                {...register("name", { required: true })}
              />
            </div>
            <div className="input-card">
              <i id="icon-input" className="fa-solid fa-user" />
              <input
                className="input"
                type="text"
                placeholder="Apellido"
                {...register("lastName", { required: true })}
              />
            </div>
            <div className="input-card">
              <i id="icon-input" className="fa-solid fa-lock" />
              <input
                className="input"
                type={isVisiblePassword ? "text" : "password"}
                placeholder="Contraseña"
                {...register("password", { required: true })}
              />
              {isVisiblePassword ? (
                <i
                  onClick={() => {
                    setIsVisiblePassword(!isVisiblePassword);
                  }}
                  className="fa-regular fa-eye-slash"
                  id="password-toggle"
                />
              ) : (
                <i
                  onClick={() => {
                    setIsVisiblePassword(!isVisiblePassword);
                  }}
                  className="fa-regular fa-eye"
                  id="password-toggle"
                />
              )}
            </div>
            {errors.name && <p className="alert1">El nombre es requerido</p>}
            {errors.lastName && (
              <p className="alert2">El apellido es requerido</p>
            )}
            {errors.password && (
              <p className="alert3">La contraseña es requerida</p>
            )}
          </div>
          <div className="button-div">
            <button className="btn">Guardar</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ModalUpdate;

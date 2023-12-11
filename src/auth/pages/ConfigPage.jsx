import { useState, useEffect } from "react";
import { set, useForm } from "react-hook-form";
import defaultimage from "../../assets/default.png";
import { useParams } from "react-router-dom";
import { useContextProvider } from "../../context/ContextProvider";
import Loading from "../../public/components/Loading";

const ConfigPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { updateUser, authenticated } = useContextProvider();
  const { id } = useParams();
  const [imageSelected, setImageSelected] = useState(null);
  const { setValue, control, watch, register, handleSubmit, errors } =
    useForm();

  const onSubmit = async (data) => {
    if (data.avatar.length > 0) {
      const userUpdated = {
        _id: id,
        name: data.name,
        lastName: data.lastName,
        password: data.password,
        avatar: data.avatar[0],
      };
      setIsLoading(!isLoading);
      await updateUser(userUpdated);
      setIsLoading((prevState) => !prevState);
    } else {
      const userUpdated = {
        _id: id,
        name: data.name,
        lastName: data.lastName,
        password: data.password,
      };
      setIsLoading(!isLoading);
      await updateUser(userUpdated);
      setIsLoading((prevState) => !prevState);
    }
  };
  useEffect(() => {
    setImageSelected(watch("avatar", "")[0]);
  }, [watch("avatar", "")]);

  useEffect(() => {
    if (authenticated) {
      setValue("name", authenticated.name);
      setValue("lastName", authenticated.lastName);
    }
  }, [authenticated, setValue]);
  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="w-full flex justify-center">
          {imageSelected ? (
            <div className="image-user">
              <img
                src={URL.createObjectURL(imageSelected)}
                alt="Selected image"
                draggable="false"
              />
              <input
                ref={control.register}
                type="file"
                className="image-update-input"
                {...register("avatar")}
              />
            </div>
          ) : authenticated.avatar && authenticated.avatar.url ? (
            <div className="image-user-config-profile">
              <img
                src={authenticated.avatar.url}
                alt="User avatar"
                draggable="false"
              />
              <input
                ref={control.register}
                type="file"
                className="image-update-input-config-profile"
                {...register("avatar")}
              />
            </div>
          ) : (
            <div className="image-user-config-profile">
              <i className="fa-solid fa-circle-plus" />
              <img src={defaultimage} alt="default image" draggable="false" />
              <input
                ref={control.register}
                type="file"
                className="image-update-input"
                {...register("avatar")}
              />
            </div>
          )}
        </div>
        <input
          className="input"
          type="text"
          placeholder="Nombre"
          {...register("name", { required: true })}
        />
        <input
          className="input"
          type="text"
          placeholder="Apellido"
          {...register("lastName", { required: true })}
        />

        <input
          className="input mb-4"
          type="password"
          placeholder="Contraseña"
          {...register("password")}
        />

        <button className="btn" type="submit">
          Guardar
        </button>
        {isLoading && (
          <div className="absolute right-[800px] bottom-[200px]">
            <Loading />
          </div>
        )}
      </form>
    </div>
  );
};

export default ConfigPage;

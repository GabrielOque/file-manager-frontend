import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
const Login = () => {
  const navigate = useNavigate();
  const { userLogin, authenticated } = useContextProvider();
  const login = async (data) => {
    await userLogin(data);
    navigate("/home");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  return (
    <div className="w-full h-screen flex justify-center items-center">
      <div className="w-96 h-96 bg-red-500 rounded-lg shadow-lg flex flex-col justify-center items-center">
        <h1 className="text-3xl font-bold pb-3">Inicia sesion</h1>
        <form onSubmit={handleSubmit(login)}>
          <div className="flex flex-col">
            <input
              className="bg-blue-100 h-10 p-3 m-3 rounded-lg text-xl"
              type="email"
              placeholder="Ingresa eol correo"
              {...register("email", { required: true })}
            />
            {errors.email && <p className="pl-3">el correo es requerido.</p>}
            <input
              className="bg-blue-100 h-10 p-3 m-3 rounded-lg text-xl"
              type="password"
              placeholder="Ingresa tru contrasena"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <p className="pl-3">La contrasena es requerida.</p>
            )}
          </div>
          <div className="w-full  flex justify-center mt-7">
            <button className="py-4 bg-green-700 px-7 rounded-lg hover:bg-blue-500 font-bold">
              Iniciar sesion
            </button>
          </div>
        </form>
        {authenticated?.message && (
          <p className="text-3xl font-bold pt-3">{authenticated.message}</p>
        )}
      </div>
    </div>
  );
};

export default Login;

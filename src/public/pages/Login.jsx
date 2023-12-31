import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
import loginImage from "../../assets/login-image.jpg";
import Loading from "../components/Loading";
const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const navigate = useNavigate();
  const { userLogin, authenticated, verifyToken, setAuthenticated } =
    useContextProvider();
  const login = async (data) => {
    setIsLoading(!isLoading);
    await userLogin(data);
    setIsLoading((prevState) => !prevState);
    navigate("/home");
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  useEffect(() => {
    (async () => {
      try {
        const token = await verifyToken();
        if (token._id) {
          setAuthenticated(token);
          navigate("/home", { replace: true });
        }
      } catch (error) {
        navigate("/login", { replace: true });
      }
    })();
  }, []);

  return (
    <div className="login-background">
      <div className="rect1"></div>
      <div className="rect2"></div>
      <div className="login-primary">
        <div className="login-image">
          <img src={loginImage} alt="" draggable="false" />
        </div>
        <div className="login-container">
          <div className="login-content">
            <h1 className="tittle">Inicia Sesión</h1>
            <div className="line"></div>
            <p>Bienvenido a SwiftAdmin!</p>
            <form onSubmit={handleSubmit(login)}>
              <div className="login-inputs">
                <div className="input-card">
                  <i id="icon-input" className="fa-solid fa-envelope" />
                  <input
                    className="input"
                    type="email"
                    placeholder="Correo electronico"
                    {...register("email", { required: true })}
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

                {errors.email && (
                  <p className="alert1">El correo es requerido.</p>
                )}
                {errors.password && (
                  <p className="alert2">La contraseña es requerida.</p>
                )}
                {authenticated?.message && (
                  <p className="alert3">{authenticated.message}</p>
                )}
              </div>
              <div className="button-div">
                <button className="btn">Ingresar</button>
              </div>
              {isLoading && (
                <div className="w-full flex justify-center pt-8">
                  <Loading />
                </div>
              )}
            </form>
            <p className="about">
              &copy; 2023 Todos los derechos reservados. Todas las imágenes y
              contenidos utilizados en este sitio son propiedad de sus
              respectivos dueños. <br />
              Desarrollada con pasión y dedicación por Gabriel Oquendo. <br />
              Política de Privacidad. Términos y Condiciones.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

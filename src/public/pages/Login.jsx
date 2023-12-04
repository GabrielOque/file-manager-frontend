import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { useContextProvider } from "../../context/ContextProvider";
import loginImage from "../../assets/login-image.jpg";
const Login = () => {
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const navigate = useNavigate();
  const { userLogin, authenticated, verifyToken, setAuthenticated } =
    useContextProvider();
  const login = async (data) => {
    await userLogin(data);
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
        console.log("Token verificado:", token);

        if (token._id) {
          setAuthenticated(token);
          console.log("Antes de la navegación a /home");
          navigate("/home");
          console.log("Después de la navegación a /home");
        } else {
          console.log("Antes de la navegación a /login");
          navigate("/", { replace: true });
          console.log("Después de la navegación a /login");
        }
      } catch (error) {
        console.error("Error al verificar el token:", error);
        // Manejar el error y redirigir al usuario al login
        console.log("Antes de la navegación a /login (error)");
        navigate("/login", { replace: true });
        console.log("Después de la navegación a /login (error)");
      }
      // Agrega el evento beforeunload al cargar el componente
      window.addEventListener("beforeunload", handleBeforeUnload);

      // Limpia el evento antes de que el componente se desmonte
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    })();
  }, [navigate]);

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
              </div>
              <div className="button-div">
                <button className="btn">Ingresar</button>
              </div>
            </form>
            {authenticated?.message && (
              <p className="alert3">{authenticated.message}</p>
            )}
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

import { ROLES } from "../../config/config";
import { useContextProvider } from "../../context/ContextProvider";
import ModalUpdate from "../components/ModalUpdate";
import HomeAdmin from "./HomeAdmin";
import HomeUser from "./HomeUser";
import HomeSuperAdmin from "./HomeSuperAdmin";

const Home = () => {
  const { authenticated } = useContextProvider();
  return (
    <div className="w-full">
      {!authenticated?.name && <ModalUpdate />}
      {authenticated?.name && authenticated?.rol === ROLES.ADMIN && (
        <HomeAdmin />
      )}
      {authenticated?.name && authenticated?.rol === ROLES.SUPER_ADMIN && (
        <HomeSuperAdmin />
      )}
      {authenticated?.name && authenticated?.rol === ROLES.USER && <HomeUser />}
    </div>
  );
};

export default Home;

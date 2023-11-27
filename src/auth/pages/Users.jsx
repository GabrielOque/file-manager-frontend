import { useContextProvider } from "../../context/ContextProvider";

const Users = () => {
  const { userFaculties } = useContextProvider();
  return (
    <div>
      <pre>{JSON.stringify(userFaculties, null, 2)}</pre>
    </div>
  );
};

export default Users;

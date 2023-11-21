import { useEffect, useState } from "react";
import axios from "axios";
import { VITE_API_URL } from "./config/config";
const App = () => {
  const [users, setUsers] = useState([]);
  const requesUsers = async () => await axios.get(`${VITE_API_URL}/api/users`);

  useEffect(() => {
    (async () => {
      const { data } = await requesUsers();
      setUsers(data);
    })();
  }, []);
  return (
    <div className="font-bold text-2xl flex w-full justify-center h-screen items-center flex-col">
      {users.map((user) => (
        <div key={user._id} className="flex flex-col">
          <p>{user.name}</p>
        </div>
      ))}
    </div>
  );
};

export default App;

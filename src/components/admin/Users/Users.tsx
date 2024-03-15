import { useEffect, useState } from "react";
import axios from "../../../AxiosInterceptors";
import CreateUserForm from "./CreateUserForm";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
}

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    reloadUsers();
  }, []);

  const deleteUser = (id: number) => {
    axios.delete(`/auth/users/${id}/`).then((response) => {
      console.log(response);

      setUsers(users.filter((user: User) => user.id !== id));
    });
  };
  const reloadUsers = () => {
    axios.get("/auth/users/").then((response) => {
      setUsers(response.data);
    });
  };
  return (
    <div className="p-16 bg-slate-800 w-full text-brandtext">
      <h1 className="text-left">Users</h1>
      <CreateUserForm onUserCreated={reloadUsers} />
      <table>
        <thead>
          <tr>
            <th>Username</th>
            <th>Email</th>
            <th>Role</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user: User) => {
            return (
              <tr
                key={user.id}
                className="border-b-2 border-gray-600 transition-colors"
              >
                <td className="px-4 py-2">{user.username}</td>
                <td className="px-4 py-2">{user.email}</td>
                <td className="px-4 py-2 capitalize">{user.role}</td>
                <td className="px-4 py-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="flex items-center justify-center bg-red-400 hover:bg-red-600 active:bg-red-700 text-white font-bold py-1 px-4 rounded-md transition-colors"
                  >
                    <span>Delete</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Users;

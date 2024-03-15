import { useEffect, useState } from "react";
import axios from "../../../AxiosInterceptors";
import CreateUserForm from "./CreateUserForm";
import PopupDialog from "../../PopupDialog";
import UserForm from "./UserForm";

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  password: string;
}

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [templateUser, setTemplateUser] = useState<User>({
    id: 0,
    username: "",
    email: "",
    role: "",
    first_name: "",
    last_name: "",
    password: "",
  });

  const openEditDialog = (user: User) => {
    setEditDialogOpen(true);
    setTemplateUser(user);
  }
  const closeEditDialog = () => {
    setEditDialogOpen(false);
    reloadUsers();
  }


  const handleUserDialogSaved = () => {
    console.log(templateUser);
    // axios
    //   .put(`/auth/users/${updatedUser.id}/`, updatedUser)
    //   .then((response) => {
    //     closeEditDialog();
    //     reloadUsers();
    //   })
    //   .catch((error) => {
    //     console.error("Error updating user:", error);
    //   });
  };

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
                <td className="pl-4 px-2 py-2">
                  <button
                    onClick={() => deleteUser(user.id)}
                    className="flex items-center justify-center bg-red-400 hover:bg-red-600 active:bg-red-700 text-white font-bold py-1 px-4 rounded-md transition-colors"
                  >
                    <span>Delete</span>
                  </button>
                </td>
                <td className=" py-2">
                  <button
                  onClick={() => openEditDialog(user)}
                    className="flex items-center justify-center bg-blue-400 hover:bg-blue-600 active:bg-blue-700 text-white font-bold py-1 px-4 rounded-md transition-colors"
                  >
                    <span>Edit</span>
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <PopupDialog isOpen={editDialogOpen} onClose={closeEditDialog} onSave={handleUserDialogSaved}>
        <div><UserForm templateUser={templateUser} onClose={closeEditDialog}/></div>
      </PopupDialog>
    </div>
  );
};


export default Users;

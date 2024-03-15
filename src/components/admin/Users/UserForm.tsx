import React, { useState } from "react";
import axios from "../../../AxiosInterceptors";

interface CreateUserFormProps {
  templateUser: User;
  onClose: () => void;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ templateUser, onClose }) => {
  const [username, setUsername] = useState(templateUser.username);
  const [email, setEmail] = useState(templateUser.email);
  const [role, setRole] = useState(templateUser.role || "user");
  const [password, setPassword] = useState(templateUser.password);


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    axios
        .put(`/auth/users/${templateUser.id}/`, {
            username: username,
            email: email,
            role: role,
            password: password,
        })
        .then(() => {
            onClose();
        })
        .catch((error) => {
            console.error("Error updating user:", error);
        });
  };

  return (
    <div>
        <h1 className="m-4">Edit User</h1>
      <form onSubmit={handleSubmit}  className="w-full">
        <div  className="space-y-6 my-4 p-8">
            <div>
              <label htmlFor="username">Username:</label>
              <input
                className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="email">Email:</label>
              <input
                className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <div>
              <label htmlFor="role">Role:</label>
              <select
                className="mt-2 block w-full rounded-md border-0 bg-gray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="user">User</option>
                <option value="moderator">Moderator</option>
                <option value="admin">Admin</option>
              </select>
            </div>
        </div>
      </form>
      <div className="flex flex-row justify-end w-full bg-gray-700 px-8">
        <div className="py-3 w-28 sm:flex sm:flex-row-reverse">
          {" "}
          {/* Updated background color to gray-700 */}
          <button
            onClick={onClose}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-full sm:text-sm"
          >
            Cancel
          </button>
        </div>
        <div className=" py-3 w-28 sm:flex sm:flex-row-reverse">
          {" "}
          {/* Updated background color to gray-700 */}
          <button
            onClick={handleSubmit}
            type="button"
            className="inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-gray-600 text-base font-medium text-white hover:bg-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 sm:ml-3 sm:w-full sm:text-sm"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateUserForm;

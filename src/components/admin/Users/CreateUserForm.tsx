import React, { useState } from "react";
import axios from "../../../AxiosInterceptors";

interface CreateUserFormProps {
  onUserCreated: (newUser: User) => void;
}

interface User {
  id: number;
  username: string;
  email: string;
  role: string;
  password: string;
}

const CreateUserForm: React.FC<CreateUserFormProps> = ({ onUserCreated }) => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("user");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newUser: User = {
      id: 0, // Assigning a temporary id, you may need to handle it differently
      username: username,
      email: email,
      role: role,
      password: password,
    };
    axios
      .post<User>("/auth/users/", newUser)
      .then((response) => {
        onUserCreated(response.data);
        setUsername("");
        setEmail("");
        setRole("");
        setPassword("");
      })
      .catch((error) => {
        console.error("Error creating user:", error);
      });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 mb-16 w-[512px]">
      <div>
        <label htmlFor="username">Username:</label>
        <input
          className="mt-2 block w-full rounded-md border-0 bg-brandgray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
          className="mt-2 block w-full rounded-md border-0 bg-brandgray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
          className="mt-2 block w-full rounded-md border-0 bg-brandgray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
          className="mt-2 block w-full rounded-md border-0 bg-brandgray-700 py-1.5 text-brandtext shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
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
      <button
        type="submit"
        className="flex items-center justify-center bg-green-400 hover:bg-green-600 active:bg-green-700 text-white font-bold py-1 px-4 rounded-md transition-colors"
      >
        Create User
      </button>
    </form>
  );
};

export default CreateUserForm;

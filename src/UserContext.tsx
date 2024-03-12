// UserContext.tsx
import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "axios";

interface User {
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
}

interface UserContextProps {
  user: User | null;
  updateUser: (newUser: User | null) => void;
  logoutUser: () => void;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  const updateUser = (newUser: User | null) => {
    setUser(newUser);
  };

  const logoutUser = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    setUser(null);
  };

  useEffect(() => {
    const access_token = localStorage.getItem("access_token");
    console.log("access_token", access_token);
    if (access_token && user === null) {
      axios
        .get(`${import.meta.env.VITE_BACKEND_URL}/auth/get-current-user/`, {
          headers: {
            Authorization: `Bearer ${access_token}`,
          },
        })
        .then((response) => {
          updateUser(response.data);
        });
    }
  });

  return (
    <UserContext.Provider value={{ user, updateUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUser = (): UserContextProps => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};

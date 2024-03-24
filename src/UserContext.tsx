import {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";
import axios from "./AxiosInterceptors";

interface User {
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  gravatar: string;
  is_active: boolean;
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
    console.log("Updating user:", newUser);
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
        })
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            // Unauthorized (e.g., token expired)
            console.log("Token expired");
            logoutUser(); // Logout the user if token is expired
            // Redirect to login page
            window.location.href = "/login";
          }
        });
    }
  }, [user]); // Make sure to include user in the dependency array to prevent infinite loops

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

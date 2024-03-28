import { useEffect, useState } from "react";
import { useUser } from "../../UserContext";
import axios from "../../AxiosInterceptors";
import { object, string, ValidationError } from "yup";

interface User {
  username: string;
  email: string;
  role: string;
  first_name: string;
  last_name: string;
  gravatar: string;
  is_active: boolean;
  is_verified: boolean;
}

const userSchema = object().shape({
  username: string().required().min(3).max(20),
  email: string().email().required(),
});

const UserAccount = () => {
  const { user, updateUser } = useUser();
  const [formErrors, setFormErrors] = useState<string[]>([]);
  const [changedUser, setChangedUser] = useState<User>({
    username: "",
    email: "",
    role: "",
    first_name: "",
    last_name: "",
    gravatar: "",
    is_active: false,
    is_verified: false,
  });

  useEffect(() => {
    if (user) {
      setChangedUser(user);
    }
  }, [user]);

  const handleSave = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await userSchema.validate(changedUser, { abortEarly: false });
      const response = await axios.put("/auth/get-current-user/", changedUser);
      updateUser(response.data);
      setFormErrors([]);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.forEach((e) => {
          setFormErrors((prevErrors) => [...prevErrors, e.message]);
        });
      }
    }
  };

  const updateField = (e: React.ChangeEvent<HTMLInputElement>) => {
    setChangedUser({ ...changedUser, [e.target.name]: e.target.value });
  };

  return (
    <div className="p-16 bg-brandgray-700 w-full text-brandtext">
      <h1>Account Settings</h1>
      <h2 className="text-left">User Profile</h2>
      <form
        className="flex flex-col gap-4 max-w-md bg-brandgray-600 p-8 rounded"
        onSubmit={handleSave}
      >
        <label className="flex flex-col gap-2">
          <span>Username</span>
          <input
            name="username"
            type="text"
            onChange={(e) => updateField(e)}
            value={changedUser?.username}
            className={`rounded bg-brandgray-700 focus:ring-0 focus:ring-brandprimary focus:outline-none ${
              formErrors.find((error) => error.includes("username"))
                ? "border-red-500"
                : ""
            }`}
          />
          <p className="text-red-500 capitalize">
            {formErrors.find((error) => error.includes("username"))}
          </p>
        </label>
        <label className="flex flex-col gap-2">
          <span>Email</span>
          <input
            type="email"
            name="email"
            onChange={(e) => updateField(e)}
            value={changedUser?.email}
            className={`rounded bg-brandgray-700 focus:ring-0 focus:ring-brandprimary focus:outline-none ${
              formErrors.find((error) => error.includes("email"))
                ? "border-red-500"
                : ""
            }`}
          />
          <p className="text-red-500 capitalize">
            {formErrors.find((error) => error.includes("email"))}
          </p>
        </label>
        <div className="flex flex-row">
          <button
            type="submit"
            className="mr-4 bg-brandprimary rounded p-2 hover:bg-brandprimaryhover focus:ring-0 focus:ring-brandprimary focus:outline-none active:bg-brandprimaryactive"
          >
            Save
          </button>
          <button
            type="reset"
            className="bg-brandgray-800 rounded p-2 hover:bg-brandgray-700 focus:ring-0 focus:ring-brandprimary focus:outline-none active:bg-brandgray-900"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserAccount;

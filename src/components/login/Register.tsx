import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom"; // Use useNavigate instead of useHistory
import logo from "../../assets/logo.png";
import axios from "axios";
import { useUser } from "../../UserContext";

export default function Register() {
  // store username
  const [username, setUsername] = useState("");
  // store password
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const { updateUser } = useUser();
  // Get navigate function
  const navigate = useNavigate();

  useEffect(() => {
    // Check if the ref is not null before trying to access its current property
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, []);

  const handleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // focus first input field on page load

    e.preventDefault();
    setLoading(true);
    // verify user
    await axios
      .post(`${import.meta.env.VITE_BACKEND_URL}/auth/register/`, {
        username: username,
        email: email,
        password: password,
        role: "user",
      })
      .then(async () => {
        updateUser({
          username: username,
          email: email,
          role: "user",
          first_name: "",
          last_name: "",
          gravatar: "",
        });
        navigate("/verification_requested"); // Redirect to the home page
      })
      .catch(() => {
        setError(true);
        setLoading(false);
      });
  };
  // rest of your component code

  return (
    <div className="h-screen bg-slate-800 items-center flex">
      <div className="flex flex-1 flex-col text-brandtext lg:px-8  justify-center">
        <div className="items-center flex justify-center flex-col">
          <Link to="/" className="mb-6 flex flex-row items-center space-x-4">
            <img className=" h-10" src={logo} alt="Your Company" />
            <p className="text-2xl font-bold">GamingReference</p>
          </Link>
        </div>
        <div className="mt-10 sm:mx-auto p-8 bg-brandprimary/5 shadow-md rounded-lg sm:w-full sm:max-w-md">
          <h1 className="mb-10 text-center text-3xl font-bold leading-9 tracking-tight ">
            Sign up
          </h1>
          <form className="space-y-6" action="#" method="POST">
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6"
                >
                  Username
                </label>
              </div>
              <div className="mt-2">
                <input
                  ref={inputRef}
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  Password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 "
                >
                  E-mail address
                </label>
                {/* show only when error */}
                <div className="text-sm" hidden={!error}>
                  <p className="font-semibold text-red-500/80">
                    Username does not exist
                  </p>
                </div>
              </div>
              <div className="mt-2">
                <input
                  ref={inputRef}
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full rounded-md border-0 bg-white/5 py-1.5  shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                onClick={handleSignIn}
                className="flex w-full justify-center rounded-md bg-brandprimary px-3 py-1.5 text-sm font-semibold leading-6  shadow-sm hover:bg-brandprimaryhover focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
              >
                {loading ? "Loading..." : "Register"}
              </button>
            </div>
          </form>
          {/* register button */}
          <div className="mt-6">
            <p className="mt-2 text-center text-sm font-medium leading-6 ">
              <Link
                to="/login"
                className="font-semibold text-brandprimary hover:text-brandprimaryhover"
              >
                Already have an account? Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

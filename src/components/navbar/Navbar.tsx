import { Dialog } from "@headlessui/react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, useEffect } from "react";
import logo from "../../assets/logo.png";
import { Link } from "react-router-dom";
import { useUser } from "../../UserContext";
import { Profile } from "./Profile";
import axios from "axios";

const navigation = [
  { name: "Home", href: "/" },
  { name: "Library", href: "library" },
];

export const Navbar = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useUser();
  const [resendBlocked, setResendBlocked] = useState(false);
  // debug user when changed useeffect
  useEffect(() => {
    console.log("user effect", user);
  }, [user]);

  const handleResendEmail = () => {
    console.log(resendBlocked);
    if (!resendBlocked && user && user.email) {
      // Set resend block
      setResendBlocked(true);

      // Send request to resend email
      axios
        .post(`${import.meta.env.VITE_BACKEND_URL}/auth/resend-email/`, {
          email: user.email,
        })
        .then(() => {
          // Unblock resend after 60 seconds
          setTimeout(() => {
            setResendBlocked(false);
          }, 60000);
        });
    }
  };

  return (
    <header className="absolute inset-x-0 top-0 z-50 bg-brandgray-800/60 shadow shadow-brandgray-850/80">
      {user?.is_verified === false ? (
        <div className=" bg-brandprimary/60 text-gray-400 text-center p-2">
          Your account is not active. Please check your email for verification
          link. &nbsp;
          <button
            className={` text-brandtext hover:text-brandprimaryhover ${
              resendBlocked ? "pointer-events-none opacity-50" : ""
            }`}
            onClick={() => {
              handleResendEmail();
            }}
          >
            {resendBlocked ? (
              <>
                <div className="flex flex-row space-x-1 text-brandtext">
                  <span className="">Resending</span>
                  <svg
                    aria-hidden="true"
                    className="w-5 h-5 my-auto  animate-spin dark:text-gray-600 fill-blue-600"
                    viewBox="0 0 100 101"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                      fill="currentColor"
                    />
                    <path
                      d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                      fill="currentFill"
                    />
                  </svg>
                </div>
              </>
            ) : (
              <span>Or click here to resend verification email.</span>
            )}
          </button>
        </div>
      ) : null}
      <nav
        className="flex items-center justify-between p-2 lg:px-8 mx-12"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <Link to="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Company</span>
            <img className="h-12 w-auto" src={logo} alt="" />
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-400"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-12">
          {navigation.map((item) => (
            <Link
              key={item.name}
              to={item.href}
              className="text-lg font-semibold leading-6 text-brandtext"
            >
              <p className=" hover:border-b-2 hover:border-gray-50 border-transparent border-b-2 active:text-gray-400 active:border-gray-400 min-h-6">
                {item.name}
              </p>
            </Link>
          ))}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end">
          <Profile />
        </div>
      </nav>
      <Dialog
        as="div"
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-50" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-brandgray-900 px-6 py-6 sm:max-w-sm sm:ring-1 sm:ring-white/10">
          <div className="flex items-center justify-between">
            <Link to="/" className="-m-1.5 p-1.5">
              <span className="sr-only">Your Company</span>
              <img className="h-8 w-auto" src={logo} alt="" />
            </Link>
            <button
              type="button"
              className="-m-2.5 rounded-md p-2.5 text-gray-400"
              onClick={() => setMobileMenuOpen(false)}
            >
              <span className="sr-only">Close menu</span>
              <XMarkIcon className="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div className="mt-6 flow-root">
            <div className="-my-6 divide-y divide-gray-500/25">
              <div className="space-y-2 py-6">
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="-mx-3 block rounded-lg px-3 py-2 text-base font-semibold leading-7 text-brandtext hover:bg-brandgray-800"
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
              <div className="py-6">
                {user?.username ? (
                  <Link
                    to="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-brandtext hover:bg-brandgray-800"
                  >
                    Profile
                  </Link>
                ) : (
                  <Link
                    to="/login"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base font-semibold leading-7 text-brandtext hover:bg-brandgray-800"
                  >
                    Log in
                  </Link>
                )}
              </div>
            </div>
          </div>
        </Dialog.Panel>
      </Dialog>
    </header>
  );
};

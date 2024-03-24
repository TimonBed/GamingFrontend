import { useState } from "react";
import axios from "axios";
import { useUser } from "../../UserContext";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png";

const VerificationRequested = () => {
  const { user } = useUser();
  const [resendBlocked, setResendBlocked] = useState(false);
  const [error, setError] = useState(false);

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
            setError(false);
            setResendBlocked(false);
          }, 60000);
        });
    } else {
      setError(true);
    }
  };

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
            Verification Email sent to {user?.email}
          </h1>
          {/* resend after 1min */}
          <p className="mt-10 text-center text-sm font-semibold leading-6">
            Didn't receive the email? Check your spam folder or{" "}
            <button
              className={`text-brandprimary hover:text-brandprimaryhover ${
                resendBlocked ? "pointer-events-none opacity-50" : ""
              }`}
              onClick={() => {
                handleResendEmail();
              }}
            >
              {resendBlocked ? (
                <>
                  <div className="flex flex-row space-x-1">
                    <span>Resending</span>
                    <svg
                      aria-hidden="true"
                      className="w-5 h-5 my-auto text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
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
                <span>Resend</span>
              )}
            </button>
          </p>
        </div>
        {/* error message if email not found */}
        {error ? (
          <div className="mt-10 text-center text-md font-semibold leading-6">
            <p className="font-semibold text-red-500/80">
              Email or User not found
            </p>
          </div>
        ) : null}
      </div>
    </div>
  );
};

export default VerificationRequested;

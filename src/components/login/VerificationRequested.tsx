import axios from "axios";
import { useUser } from "../../UserContext";

const VerificationRequested = () => {
  const { user } = useUser();
  const handleResendEmail = () => {
    // resend email
    axios.post(`${import.meta.env.VITE_BACKEND_URL}/auth/resend-email/`, {
      email: user?.email,
    });
  };

  return (
    <div className="flex flex-1 text-brandtext flex-col px-6 py-12 lg:px-8 bg-slate-800 ">
      <div className="mt-16">
        <h1>Email Verification Requested</h1>
        <p className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight">
          Please check your email to verify your account.
        </p>
        {/* resend after 1min */}
        <p className="mt-10 text-center text-md font-semibold leading-6">
          Didn't receive the email? Check your spam folder or{" "}
          <button
            className="text-brandprimary hover:text-brandprimaryhover"
            onClick={() => {
              handleResendEmail();
            }}
          >
            resend
          </button>
        </p>
      </div>
    </div>
  );
};

export default VerificationRequested;

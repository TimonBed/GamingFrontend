import axios from "axios";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

export default function EmailVerification() {
  const { token } = useParams();

  useEffect(() => {
    // verify token
    axios
      .get(`${import.meta.env.VITE_BACKEND_URL}/auth/verify/${token}/`)
      .then(() => {
        console.log("Token verified");
        window.location.href = "/login";
      })
      .catch(() => {
        console.log("Token verification failed");
      });
  }, [token]);

  return <div></div>;
}

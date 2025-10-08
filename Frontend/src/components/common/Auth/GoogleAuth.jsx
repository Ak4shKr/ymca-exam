import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import service from "../../../httpd/service";

const GoogleAuthCallbackPage = () => {
  const [searchParam] = useSearchParams();
  const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const code = searchParam.get("code");
      // console.log("Authorization Code:", code);
      try {
        const res = await axios.post(
          "https://oauth2.googleapis.com/token",
          new URLSearchParams({
            grant_type: "authorization_code",
            code,
            client_id: clientId,
            client_secret: clientSecret,
            redirect_uri: `http://localhost:5173/google-auth/callback`,
          })
        );
        console.log("res after google auth", res);

        const response = await service.post("/google-login", {
          access_token: res.data.access_token,
        });
        console.log("response from backend", response);

        navigate("/");
        // handle response if needed
      } catch (error) {
        // handle error if needed
        console.log("errors at auth2.0", error);
      }
    };
    fetchToken();
  }, []);
  return (
    <div className="p-4 text-center text-white font-semibold text-xs">
      <h1>Google Auth Callback Page</h1>
    </div>
  );
};

export default GoogleAuthCallbackPage;

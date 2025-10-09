import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import service from "../../../httpd/service";
import { useAuthStore } from "../../../store/authState";

const GoogleAuthCallbackPage = () => {
  const [searchParam] = useSearchParams();
  const { setUser, setToken } = useAuthStore();

  const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
  const clientSecret = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_SECRET;
  const navigate = useNavigate();
  useEffect(() => {
    const fetchToken = async () => {
      const code = searchParam.get("code");
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

        const response = await service.post("/google-login", {
          access_token: res.data.access_token,
        });

        if (response.status === 200) {
          setToken(response.data.token);
          setUser(response.data.user);
          navigate("/");
        }

        // handle response if needed
      } catch (error) {
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

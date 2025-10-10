import { useState } from "react";
import { Button, Input, PasswordInput } from "@mantine/core";
import service from "../httpd/service";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../store/authState";
import { Link, useNavigate } from "react-router-dom";
import { useLoaderStore } from "../store/loaderState";
// import { FaGoogle } from "react-icons/fa";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { setToken, setUser } = useAuthStore();
  const navigate = useNavigate();
  const setloading = useLoaderStore((state) => state.setLoading);

  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);

  const handleGoogleLogin = () => {
    const clientId = import.meta.env.VITE_GOOGLE_OAUTH_CLIENT_ID;
    const redirectUri = import.meta.env.VITE_GOOGLE_OAUTH_REDIRECT_URL_PROD;
    

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=code&scope=openid%20email%20profile&access_type=offline`;

    window.location.href = googleAuthUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) {
      notifications.show({
        title: "All fields required",
        color: "red",
      });
      return;
    }
    setLoading(true);
    setloading(true);

    // Login logic here
    try {
      const response = await service.post("/login", {
        email,
        password,
      });
      if (response.status === 200) {
        notifications.show({
          title: "Login Success",
          message: "You have been logged in successfully.",
          color: "green",
        });
        setToken(response.data.token);
        setUser(response.data.user);

       navigate("/", { replace: true });
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Login Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
      setloading(false);
    }
  };

  return (
    <div className="h-dvh flex justify-center items-center bg-gray-800">
      <div className="w-[95%] md:w-[33%] p-4 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-exo font-bold mb-2 text-white/80 text-center">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          {/* Email Input */}
          <Input.Wrapper label="Email">
            <Input
              placeholder="Enter email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              styles={{
                input: {
                  backgroundColor: "black",
                },
              }}
            />
          </Input.Wrapper>
          {/* password input */}
          <PasswordInput
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            styles={{
              innerInput: {
                backgroundColor: "black",
              },
            }}
          />
          {/* Submit Button */}
          <div className="text-center">
            <Button
              w="100%"
              mb="sm"
              size="sm"
              type="submit"
              color="indigo"
              loading={loading}
              mt="sm"
            >
              Login
            </Button>
            <Button
              w="100%"
              mb="sm"
              size="sm"
              color="indigo"
              mt="sm"
              onClick={handleGoogleLogin}
            >
              {/* <FaGoogle className="mr-2 text-red-500" /> */}<svg className="w-4 h-4 mr-2" viewBox="0 0 24 24">
                <path
                  fill="#4285F4"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="#34A853"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="#FBBC05"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                />
                <path
                  fill="#EA4335"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
              Login with Google
            </Button>
            <p className="text-white text-sm">
              Don&apos;t have an Account?{" "}
              <Link
                className="text-green-700 font-semibold hover:text-green-600"
                to="/register"
              >
                SignUp
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

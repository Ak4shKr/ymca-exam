import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../store/authState";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoutes = ({ children }) => {
  const { getUser } = useAuthStore();
  useEffect(() => {
    if (!getUser()) {
      notifications.show({
        title: "Unauthorized",
        message: "You need to be logged in to access this page.",
        color: "red",
      });
    }
  }, [getUser]); // Run effect when 'getUser()' value changes

  if (getUser()) {
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

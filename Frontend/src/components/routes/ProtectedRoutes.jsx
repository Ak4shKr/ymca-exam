import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../store/authState";
import { Navigate } from "react-router-dom";
import { useEffect } from "react";

export const ProtectedRoutes = ({ children }) => {
  const { getUser } = useAuthStore();

  // Trigger notification only when the user is not logged in
  useEffect(() => {
    if (!getUser()) {
      notifications.show({
        title: "Unauthorized",
        message: "You need to be logged in to access this page.",
        color: "red",
        position: "top-right",
        autoClose: 1500,
      });
    }
  }, [getUser]); // Run effect when 'getUser()' value changes

  // If user exists, render the children, otherwise redirect to login
  if (getUser()) {
    // Use getUser() to actually retrieve the user
    return children;
  } else {
    return <Navigate to="/login" replace />;
  }
};

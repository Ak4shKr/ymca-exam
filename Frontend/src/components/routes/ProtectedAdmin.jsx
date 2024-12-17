import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../store/authState";
import PropTypes from "prop-types";

export const ProtectedAdmin = ({ children }) => {
  const { getUser } = useAuthStore();
  const user = getUser();

  if (user && user.isAdmin) {
    return children;
  } else {
    notifications.show({
      title: "Unauthorized",
      message: "You need to be an Admin to access this page.",
      color: "red",
    });
  }
  return null;
};

ProtectedAdmin.propTypes = {
  children: PropTypes.node.isRequired,
};

import {
  House,
  LogOut,
  CircleUserRound,
  BookmarkPlus,
  List,
  ClipboardList,
  ArrowLeftRight,
} from "lucide-react";
import { useState } from "react"; // Import the useState hook from React
import { useLocation, useNavigate } from "react-router-dom"; // Import from react-router-dom for route handling
import { modals } from "@mantine/modals";
import { Text, Tooltip } from "@mantine/core";

export const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Use for programmatic navigation
  const [toggle, setToggle] = useState(false);

  // Function to toggle sidebar visibility (for responsive design)
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // Function to handle logout, shows the confirmation modal
  const handleLogout = () => {
    console.log("clciked");
    // Open the confirmation modal
    openLogoutModal();
  };

  // Open the confirmation modal for logout
  const openLogoutModal = () => {
    modals.openConfirmModal({
      title: "Logout",
      centered: true,
      children: (
        <Text size="sm">
          Are you sure you want to logout? You will be redirected to the login.
        </Text>
      ),
      labels: { confirm: "Logout", cancel: "No don't leave it" },
      confirmProps: { color: "#F0185C" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        logoutUser();
      },
    });
  };

  // Function to handle the actual logout action
  const logoutUser = () => {
    // Clear authentication data (e.g., user session, tokens)
    localStorage.removeItem("user"); // Adjust as needed
    localStorage.removeItem("token");

    // Optionally, sessionStorage.removeItem('token') if you're using sessionStorage

    // Redirect to the login page or another route
    navigate("/login"); // Redirect to the login page
  };

  // Define the sidebar menu items
  const userMenu = [
    {
      name: "Home",
      path: "/",
      icon: House,
    },
    {
      name: "Schedule Exam",
      path: "/book-exam",
      icon: BookmarkPlus,
    },
    {
      name: "All Booking",
      path: "/all-booking",
      icon: List,
    },
    {
      name: "Your Booking",
      path: "/your-booking",
      icon: ClipboardList,
    },
    // {
    //   name: "Profile",
    //   path: "/profile",
    //   icon: CircleUserRound,
    // },
    {
      name: "Logout",
      icon: LogOut,
      action: handleLogout, // Attach the handleLogout function
    },
  ];

  return (
    <div className="sidebar flex flex-col justify-between  py-2 pl-4 border-r border-gray-500">
      {/* Top Section */}
      <div>
        {/* Logo Section */}
        <div className="sidebar__logo mb-6 mt-2 flex justify-center">
          <a href="/">
            <img
              src="/src/assets/logo/ymca_logo.png"
              alt="YMCA Logo"
              width="50"
            />
          </a>
        </div>

        {/* Menu Items */}
        <div className="sidebar__menu flex flex-col gap-4">
          {userMenu.map((item, index) => (
            <Tooltip
              key={index}
              label={item.name}
              withArrow
              color="dark"
              position="right-end"
            >
              <a
                href={item.path}
                key={index}
                onClick={
                  item.action
                    ? (e) => {
                        e.preventDefault();
                        item.action(); // Call the logout function
                      }
                    : undefined
                }
                className={`sidebar__menu-item flex items-center gap-4 py-2 px-5 rounded-l-md text-md font-semibold cursor-pointer transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#3f4bd1]"
                    : "hover:bg-[#3f4bd19a]"
                }`}
              >
                <item.icon size={24} className="text-white" />
                {toggle && (
                  <span className="text-white/90 truncate">{item.name}</span>
                )}
              </a>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Bottom Icon */}
      <div className="flex justify-end px-4 mb-4">
        <Tooltip label="Toggle Sidebar" withArrow color="dark" position="right">
          <ArrowLeftRight
            size={24}
            className="text-gray-200 hover:text-[#3f4bd1] cursor-pointer"
            onClick={handleToggle}
          />
        </Tooltip>
      </div>
    </div>
  );
};

import {
  House,
  LogOut,
  BookmarkPlus,
  List,
  ClipboardList,
  ArrowLeftRight,
} from "lucide-react";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { modals } from "@mantine/modals";
import { Text, Tooltip } from "@mantine/core";

export const Sidebar = () => {
  const location = useLocation(); // Get the current location
  const navigate = useNavigate(); // Use for programmatic navigation
  const [toggle, setToggle] = useState(false);

  // toggle sidebar
  const handleToggle = () => {
    setToggle(!toggle);
  };

  // Function to handle logout, shows the confirmation modal
  const handleLogout = () => {
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
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    navigate("/login"); // Redirect to the login page
  };

  // sidebar menu items
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
    {
      name: "Logout",
      icon: LogOut,
      action: handleLogout, // Attach the handleLogout function
    },
  ];

  return (
    <div className="sidebar flex flex-col justify-between py-2 pl-1 border-r border-gray-500">
      <div>
        {/* Logo Section */}
        <div className="sidebar__logo mb-6 mt-2 flex justify-center">
          <a href="/">
            <img src="/logo/ymca_logo.png" alt="YMCA Logo" width="36" />
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
                        item.action(); // Call the logout
                      }
                    : undefined
                }
                className={`sidebar__menu-item flex items-center gap-3 py-2 px-3 rounded-l-md text-md font-semibold cursor-pointer transition-colors ${
                  location.pathname === item.path
                    ? "bg-[#3f4bd1]"
                    : "hover:bg-[#3f4bd16b]"
                }`}
              >
                <item.icon size={18} className="text-white" />
                {toggle && (
                  <span className="text-white/90 truncate ">{item.name}</span>
                )}
              </a>
            </Tooltip>
          ))}
        </div>
      </div>

      {/* Bottom Icon */}
      <div className="flex justify-end px-3 mb-4">
        <Tooltip label="Toggle Sidebar" withArrow color="dark" position="right">
          <ArrowLeftRight
            size={18}
            className="text-gray-200 hover:text-[#3f4bd1] cursor-pointer"
            onClick={handleToggle}
          />
        </Tooltip>
      </div>
    </div>
  );
};

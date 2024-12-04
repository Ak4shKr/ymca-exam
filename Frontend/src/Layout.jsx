import { Navbar } from "./components/common/Navbar";
import { Sidebar } from "./components/common/Sidebar";
import PropTypes from "prop-types";

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Sidebar remains constant and takes full height */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-1 flex flex-col bg-gray-900/80 border-b border-gray-800 min-w-0">
        <Navbar />

        {/* Scrollable content area */}
        <div className="flex-1 overflow-y-auto bg-gradient-to-br from-gray-900 to-gray-800 w-full p-4">
          <div className="max-w-full">{children}</div>
        </div>
      </div>
    </div>
  );
};

Layout.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Layout;

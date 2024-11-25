import { Navbar } from "./components/common/Navbar";
import { Sidebar } from "./components/common/Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen bg-gradient-to-b from-gray-800 to-gray-900 text-white">
      {/* Sidebar remains constant and takes full height */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-grow flex flex-col bg-gray-900/80 border-b border-gray-800">
        <Navbar />

        {/* Scrollable content area */}
        <div className="flex-grow overflow-y-auto  bg-gradient-to-br from-gray-900 to-gray-800 w-full mx-auto my-auto px-4 py-4">
          {children}
        </div>
      </div>
    </div>
  );
};

import { Navbar } from "./components/common/Navbar";
import { Sidebar } from "./components/common/Sidebar";

export const Layout = ({ children }) => {
  return (
    <div className="flex h-screen">
      {/* Sidebar remains constant and takes full height */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex-grow flex flex-col">
        <Navbar />

        {/* Scrollable content area */}
        <div className="flex-grow overflow-y-auto px-4 py-4 w-full mx-auto my-auto">
          {children}
        </div>
      </div>
    </div>
  );
};

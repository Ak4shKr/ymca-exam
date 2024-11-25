// import { Button } from "@mantine/core";
import { Bell } from "lucide-react";
import { CgBoy } from "react-icons/cg";
import { useAuthStore } from "../../store/authState";
import { GrUserFemale } from "react-icons/gr";
import { Tooltip } from "@mantine/core";

export const Navbar = () => {
  const { getUser } = useAuthStore();
  const gender = getUser().gender;
  return (
    <div className="navbar w-full h-[3.5rem] border-b border-white/70 shadow-slate-800 shadow-lg">
      <div className="flex justify-end gap-6 mr-[1rem] py-3 items-center">
        {/* Notification bell and profile button */}
        <Tooltip label="Notifications" position="left" color="dark" withArrow>
          <Bell size={24} color="white" />
        </Tooltip>
        <Tooltip label="UserName" position="left" color="dark" withArrow>
          <button className="font-medium  text-white font-exo text-md p-1 px-4 border bg-[#3f4bd1] border-blue-600  rounded-md">
            {gender == "male" ? (
              <CgBoy className="inline-block mr-2 mb-1 " />
            ) : (
              <GrUserFemale className="inline-block mr-2 mb-1" />
            )}
            <span>{getUser().name.split(" ")[0]}</span>
          </button>
        </Tooltip>
      </div>
    </div>
  );
};

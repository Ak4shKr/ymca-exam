import { Bell } from "lucide-react";
import { CgBoy } from "react-icons/cg";
import { useAuthStore } from "../../store/authState";
import { GrUserFemale } from "react-icons/gr";
import { Button, Input, Modal, PasswordInput, Tooltip } from "@mantine/core";
import { useState } from "react";

export const Navbar = () => {
  const { getUser } = useAuthStore();
  const gender = getUser().gender;

  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <div className="navbar w-full border-b border-white/70 shadow-slate-800 shadow-lg">
        <div className="flex justify-end gap-4 mr-[1rem] py-2 items-center">
          {/* Notification bell and profile button */}
          <Tooltip label="Notifications" position="left" color="dark" withArrow>
            <Bell size={18} color="white" />
          </Tooltip>
          <Tooltip label="Admin" position="left" color="dark" withArrow>
            <button
              // onClick={() => setModalOpen(true)}
              className=" text-white/90 text-sm p-[2px] px-4 border border-white/80  rounded-md hover:text-red-500 "
            >
              <a href="/dashboard">Admin</a>
            </button>
          </Tooltip>
          <Tooltip label="UserName" position="left" color="dark" withArrow>
            <button className="font-medium text-sm text-white p-[2px] px-4 border bg-[#3f4bd1] border-blue-600  rounded-md">
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

      {/* Admin Modal */}
      {modalOpen && (
        <Modal
          opened={modalOpen}
          onClose={() => setModalOpen(false)}
          centered
          title="Admin Login"
        >
          <form>
            {/* Email Input */}
            <Input.Wrapper label="Email">
              <Input
                placeholder="Enter email"
                type="email"
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
                size="xs"
                type="submit"
                color="#1d72fe"
                mt="sm"
              >
                Login
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </>
  );
};

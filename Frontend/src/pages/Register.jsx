import {
  Button,
  Input,
  Modal,
  PasswordInput,
  PinInput,
  Select,
} from "@mantine/core";
import { useState } from "react";
import service from "../httpd/service";
import { notifications } from "@mantine/notifications";
import { AxiosError } from "axios";
import { redirect } from "react-router-dom";
import { useLoaderStore } from "../store/loaderState";

const Register = () => {
  //global state for loading spinner
  const setloading = useLoaderStore((state) => state.setLoading);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [gender, setGender] = useState("");
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [pin, setPin] = useState(""); // State for Pin input
  const [otpLoading, setOtpLoading] = useState(false); // State for OTP submit loading

  // Handlers for inputs
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handlePasswordChange = (e) => setPassword(e.target.value);
  const handleGenderChange = (value) => setGender(value);
  const handlePinChange = (value) => setPin(value);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name || !email || !password || !gender) {
      notifications.show({
        title: "Registration Error",
        message: "All fields are required.",
        color: "red",
      });
      setLoading(false);
      return;
    }
    setLoading(true);
    setloading(true);
    try {
      const response = await service.post("/register", {
        name,
        email,
        password,
        gender,
      });
      if (response.status === 200) {
        notifications.show({
          title: "Registration Success",
          message: response.data.message,
        });
        setLoading(false);
        setIsModalOpen(true);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        notifications.show({
          title: "Registration Error",
          message: error.response?.data?.error || "Something went wrong",
          color: "red",
        });
      }
    } finally {
      setLoading(false);
      setloading(false);
    }
  };

  const handleOTPSubmit = async (e) => {
    e.preventDefault();
    setOtpLoading(true);
    setloading(true);

    try {
      const response = await service.post("/verify-otp", {
        email,
        otp: pin,
        name,
        password,
        gender,
      });
      if (response.status === 200) {
        notifications.show({
          title: "OTP Verification Success",
          message: response.data.message,
        });
        setIsModalOpen(false); // Close modal on success
        redirect("/login");
      }
    } catch (error) {
      notifications.show({
        title: "OTP Verification Error",
        message:
          error.response?.data?.message || "Invalid OTP. Please try again.",
        color: "red",
      });
    } finally {
      setOtpLoading(false);
      setloading(false);
    }
  };

  return (
    <div className="h-dvh flex justify-center items-center bg-gray-800">
      <div className="w-[95%] md:w-[33%] mx-auto mt-10 p-4 bg-gradient-to-b from-gray-900 to-gray-800 rounded-lg shadow-lg">
        <h2 className="text-2xl font-exo font-bold mb-2 text-white/80 text-center">
          Register
        </h2>
        <form onSubmit={handleSubmit}>
          <Input.Wrapper label="Name">
            <Input
              placeholder="Enter your name"
              value={name}
              onChange={handleNameChange}
              required
              styles={{
                input: {
                  backgroundColor: "black",
                },
              }}
            />
          </Input.Wrapper>
          <Input.Wrapper label="Email">
            <Input
              placeholder="Enter your email"
              type="email"
              value={email}
              onChange={handleEmailChange}
              required
              styles={{
                input: {
                  backgroundColor: "black",
                },
              }}
            />
          </Input.Wrapper>
          <PasswordInput
            label="Password"
            value={password}
            onChange={handlePasswordChange}
            placeholder="Enter password"
            styles={{
              innerInput: {
                backgroundColor: "black",
              },
            }}
          />
          <Select
            label="Gender"
            placeholder="Select your gender"
            value={gender}
            checkIconPosition="right"
            onChange={handleGenderChange}
            data={[
              { value: "male", label: "Male" },
              { value: "female", label: "Female" },
            ]}
            styles={{
              input: {
                backgroundColor: "black",
              },
            }}
          />
          <div className="text-center">
            <Button
              w="100%"
              my="sm"
              size="sm"
              type="submit"
              color="indigo"
              loading={loading}
            >
              Register
            </Button>
            <p className="text-white text-sm">
              Already have an Account?{" "}
              <a
                className="text-green-700 font-semibold hover:text-green-600"
                href="/login"
              >
                LogIn
              </a>
            </p>
          </div>
        </form>
      </div>

      {isModalOpen && (
        <Modal
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          title="Verify OTP"
          centered
          className="text-white text-2xl"
        >
          <form onSubmit={handleOTPSubmit}>
            <PinInput
              value={pin}
              onChange={handlePinChange}
              length={6}
              type="number"
              oneTimeCode
            />
            <Button
              my="sm"
              size="xs"
              type="submit"
              color="indigo"
              loading={otpLoading}
            >
              Submit
            </Button>
          </form>
        </Modal>
      )}
    </div>
  );
};

export default Register;

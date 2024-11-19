// import { Navbar } from "../components/common/Navbar";
// import { Sidebar } from "../components/common/Sidebar";
import { Layout } from "../Layout";
import { Button, Grid, Select } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useState } from "react";
import { Input } from "@mantine/core";
import { Card, Text, Box } from "@mantine/core";

const availableRooms = [
  { room: { _id: "t1", name: "T1" }, slot: 1 },
  { room: { _id: "t2", name: "T2" }, slot: 2 },
  { room: { _id: "t3", name: "T3" }, slot: 1 },
  { room: { _id: "t4", name: "T4" }, slot: 2 },
];

const RoomCard = () => {
  const [selectedRoom, setSelectedRoom] = useState(null); // State for selected card

  // Handler for card selection
  const handleSelect = (room) => {
    setSelectedRoom(room); // Allow only one selection
  };

  return (
    <Box className="flex flex-wrap justify-center items-center gap-4 p-4">
      {availableRooms.map((item) => (
        <Card
          key={item.room._id}
          shadow="sm"
          radius="sm"
          withBorder
          onClick={() => handleSelect(item.room._id)}
          className={`cursor-pointer transition-all duration-300 p-2 ${
            selectedRoom === item.room._id
              ? "bg-[#32c832] text-white border-violet-700 "
              : "bg-white text-black hover:bg-teal-200 border-gray-300 border-2"
          }`}
        >
          <Text className="font-extrabold text-xl text-center">
            {item.room.name}
          </Text>
          <Text className="text-xs font-medium">Slot {item.slot}</Text>
        </Card>
      ))}
    </Box>
  );
};

export const Home = () => {
  const [value, setValue] = useState();
  return (
    <Layout>
      <div className="flex flex-wrap mx-auto mt-4 bg-[#0e13144f] border border-gray-700 rounded-lg p-4 shadow-md">
        {/* Select Branch */}
        <div className="w-full md:w-1/2 px-4">
          <Select
            label="Select Branch"
            placeholder="Pick branch"
            data={["ECE", "EEIOT", "ENC"]}
            checkIconPosition="right"
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
          />
        </div>

        {/* Select Semester */}
        <div className="w-full md:w-1/2 px-4">
          <Select
            label="Select Semester"
            placeholder="Pick semester"
            checkIconPosition="right"
            data={["1", "2", "3", "4", "5", "6", "7", "8"]}
            comboboxProps={{
              transitionProps: { transition: "pop", duration: 200 },
            }}
          />
        </div>

        {/* Start Booking Button */}
        {/* <div className="w-full px-2 mt-4">
          <Button
            align="center"
            size="xs"
            variant="gradient"
            gradient={{ from: "indigo", to: "violet", deg: 107 }}
            style={{ width: "100%" }}
          >
            Start Booking
          </Button>
        </div> */}

        {/* Subject Input */}
        <div className="w-full md:w-1/2 px-4 mt-4">
          <Input.Wrapper label="Subject" description="" error="">
            <Input placeholder="Subject Input" />
          </Input.Wrapper>
        </div>

        {/* Date Input */}
        <div className="w-full md:w-1/2 px-4 mt-4">
          <DateInput
            clearable
            value={value}
            onChange={setValue}
            label="Choose a Date"
            placeholder="Exam Date"
            pointer
          />
        </div>

        {/* Check Room Availability Button */}

        <Button
          align="center"
          size="xs"
          // variant="gradient"
          // gradient={{ from: "indigo", to: "violet", deg: 107 }}
          color="#3f4bd1"
          className="w-full md:w-[50%] mx-auto px-4 mt-4"
        >
          Check Room Availability
        </Button>
      </div>
      <div className="flex flex-col items-center mt-8 bg-[#0e13144f] border border-gray-700 rounded-lg p-4 shadow-md">
        <RoomCard className="w-[50%]" />
        <Button
          align="center"
          mt="sm"
          size="xs"
          color="#3f4bd1"
          className="w-full md:w-[50%] mx-auto px-4 mt-4"
        >
          Book Room
        </Button>
      </div>
    </Layout>
  );
};

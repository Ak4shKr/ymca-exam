import { Layout } from "../Layout";
import { Button, NumberInput, ScrollArea, Select, Table } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { Card, Text, Box, Modal } from "@mantine/core";
import service from "../httpd/service";
import { notifications } from "@mantine/notifications";

const availableRooms1 = [
  {
    room: { _id: "t1", name: "T1" },
    slot: 1,
    totalSeats: 30,
    availableSeats: 10,
  },
  {
    room: { _id: "t2", name: "T2" },
    slot: 2,
    totalSeats: 25,
    availableSeats: 15,
  },
  {
    room: { _id: "t3", name: "T3" },
    slot: 1,
    totalSeats: 20,
    availableSeats: 5,
  },
  {
    room: { _id: "t4", name: "T4" },
    slot: 2,
    totalSeats: 50,
    availableSeats: 20,
  },
];

const rows = availableRooms1.map((availableRooms) => (
  <Table.Tr key={availableRooms.room._id} ta="center">
    <Table.Td>{availableRooms.room.name}</Table.Td>
    <Table.Td>{availableRooms.slot}</Table.Td>
    <Table.Td>{availableRooms.totalSeats}</Table.Td>
    <Table.Td style={{ color: "green" }}>
      {availableRooms.availableSeats}
    </Table.Td>
    <Table.Td>
      <NumberInput
        placeholder="No of Seats"
        clampBehavior="strict"
        min={1}
        max={availableRooms.availableSeats}
        style={{ width: "8rem" }}
      />
    </Table.Td>
  </Table.Tr>
));

const RoomCard = ({ availableRooms }) => {
  return (
    <Box className="flex flex-wrap justify-center items-center gap-4 p-4">
      {availableRooms.map((item) =>
        item.slots.map((slot) => (
          <Card
            key={`${item.id}`}
            shadow="sm"
            radius="sm"
            withBorder
            className="cursor-pointer transition-all duration-300 p-2 bg-white text-black hover:bg-teal-100 hover:scale-95 border-gray-300 border-2"
          >
            {/* Room Name */}
            <Text className="font-extrabold text-xl text-center mb-1">
              {item.room}
            </Text>

            {/* Slot Details */}
            <Text className="text-sm font-medium text-center text-gray-700">
              Slot {slot.slot}
            </Text>
          </Card>
        ))
      )}
    </Box>
  );
};

export const Booking = () => {
  const [inputdate, setInputDate] = useState();
  const [formattedDate, setFormattedDate] = useState();
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isroomdata, setIsRoomdata] = useState(false);

  const handleAvailableRooms = async (e) => {
    e.preventDefault();
    try {
      const response = await service.post("/available-rooms", {
        date: formattedDate,
        branch,
        semester,
      });
      console.log(response.data.availableRooms);
      if (response.status === 200) {
        notifications.show({
          title: "Success",
          message: "AvailableRooms fetched successfully",
          color: "green",
        });
        setAvailableRooms(response.data.availableRooms);
        setIsRoomdata(true);
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    }
  };

  useEffect(() => {
    const formatDate = (inputdate) => {
      const date = new Date(inputdate); // Convert to Date object
      const year = date.getFullYear(); // Extract year
      const month = String(date.getMonth() + 1).padStart(2, "0"); // Extract month and pad with zero
      const day = String(date.getDate()).padStart(2, "0"); // Extract day and pad with zero
      return `${year}-${month}-${day}`; // Return formatted string
    };
    setFormattedDate(formatDate(inputdate)); // Set formatted date
  }, [inputdate]);
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal
  return (
    <Layout>
      <form onSubmit={handleAvailableRooms}>
        <div className="flex flex-wrap mx-auto mt-4 bg-[#0e13144f] border border-gray-700 rounded-lg p-4 shadow-md">
          {/* Select Branch */}
          <div className="w-full md:w-1/2 px-4">
            <Select
              label="Select Branch"
              placeholder="Pick branch"
              data={["ECE", "EEIOT", "ENC"]}
              value={branch}
              onChange={setBranch}
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
              value={semester}
              onChange={setSemester}
              checkIconPosition="right"
              data={["1", "2", "3", "4", "5", "6", "7", "8"]}
              comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
              }}
            />
          </div>

          {/* Subject Input */}
          <div className="w-full md:w-1/2 px-4 mt-4">
            <Input.Wrapper label="Subject" description="" error="">
              <Input
                required
                placeholder="Subject Input"
                onChange={(e) => setSubject(e.target.value)}
              />
            </Input.Wrapper>
          </div>

          {/* Date Input */}
          <div className="w-full md:w-1/2 px-4 mt-4">
            <DateInput
              value={inputdate}
              onChange={setInputDate}
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
            type="submit"
          >
            Check Room Availability
          </Button>
        </div>
      </form>
      {isroomdata && (
        <div className="flex flex-col items-center mt-8 bg-[#0e13144f] border border-gray-700 rounded-lg p-4 shadow-md">
          <RoomCard availableRooms={availableRooms} className="w-[50%]" />
          <Button
            align="center"
            mt="sm"
            size="xs"
            color="#3f4bd1"
            className="w-full md:w-[50%] mx-auto px-4 mt-4"
            onClick={() => setIsModalOpen(true)}
          >
            Start Scheduling Slot
          </Button>
        </div>
      )}
      {isModalOpen && (
        <Modal
          title={
            <div
              style={{
                fontSize: "18px",
                color: "white",
              }}
            >
              Seat Booking Details
            </div>
          }
          opened={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          size="auto"
          centered
          scrollAreaComponent={ScrollArea}
          mx="auto"
        >
          <Table stickyHeader stickyHeaderOffset={60} horizontalSpacing="lg">
            <Table.Thead>
              <Table.Tr
                ta="center"
                style={{
                  color: "rgba(186, 186, 186, 0.7)",
                }}
              >
                <Table.Th>Room</Table.Th>
                <Table.Th>Slot</Table.Th>
                <Table.Th>Total Seat</Table.Th>
                <Table.Th>Available Seat</Table.Th>
                <Table.Th>Book Seat</Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody style={{ fontWeight: "bold", fontSize: "14px" }}>
              {rows}
            </Table.Tbody>
          </Table>
          <div className="flex justify-center">
            <Button
              mt="lg"
              size="sm"
              color="#3f4bd1"
              className="w-full md:w-[50%] px-4 mt-4 mx-auto"
            >
              Confirm Booking
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

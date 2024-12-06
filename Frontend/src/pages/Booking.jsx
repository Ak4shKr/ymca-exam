import { Layout } from "../Layout";
import { Button, NumberInput, ScrollArea, Select, Table } from "@mantine/core";
import { DateInput } from "@mantine/dates";
import { useEffect, useState } from "react";
import { Input } from "@mantine/core";
import { Card, Text, Box, Modal } from "@mantine/core";
import service from "../httpd/service";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../store/authState";

// interface Slot {
//   slot: string;
//   availableSeats: number;
// }

// interface Room {
//   id: string;
//   room: string;
//   totalSeats: number;
//   slots: Slot[];
// }

// interface BookingRoom {
//   room: string;
//   seats: number;
// }

const RoomCard = ({ availableRooms }) => {
  return (
    <Box className="flex flex-wrap justify-center items-center gap-4 p-2">
      {availableRooms.map((item) =>
        item.slots.map((slot) => (
          <Card
            key={`${item.id}-${slot.slot}`}
            shadow="sm"
            radius="sm"
            withBorder
            className="cursor-pointer transition-all duration-300 p-1 bg-white text-black hover:bg-teal-100 hover:scale-95 border-gray-300 border-2"
          >
            <Text className="font-extrabold text-lg text-center">
              {item.room}
            </Text>
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
  const [inputdate, setInputDate] = useState("");
  const [formattedDate, setFormattedDate] = useState("");
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [subject, setSubject] = useState("");
  const [availableRooms, setAvailableRooms] = useState([]);
  const [isroomdata, setIsRoomdata] = useState(false); //state for if roomdata box
  const [activeTab, setActiveTab] = useState("slot1"); //state for slot tab in booking table
  const [slot, setSlot] = useState("1");
  const [filteredRooms, setFilteredRooms] = useState([]); //rooms are filtered on the basis of slot
  const [isModalOpen, setIsModalOpen] = useState(false); //modal for booking table
  const [selectedRooms, setSelectedRooms] = useState([]); //selected room are array of room selected with seats in booking table i.e. BookingRoom

  const [loading, setLoading] = useState(false);

  //user state
  const { getUser } = useAuthStore();
  const professorId = getUser()._id;

  // available room check api
  const handleAvailableRooms = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await service.post("/available-rooms", {
        date: formattedDate,
        branch,
        semester,
      });
      console.log(
        "Available Rooms API Response:",
        response.data.availableRooms
      );
      if (response.status === 200) {
        notifications.show({
          title: "Success",
          message: "AvailableRooms fetched successfully",
          color: "green",
        });
        setAvailableRooms(response.data.availableRooms);
        setLoading(false);
        setIsRoomdata(true);
      }
    } catch (error) {
      // console.error(error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  //booking api call
  const handleBooking = async () => {
    if (!professorId) {
      notifications.show({
        title: "Error",
        message: "Professor ID not found. Please log in again.",
        color: "red",
      });
      return;
    }

    const bookingData = {
      semester,
      branch,
      subject,
      rooms: selectedRooms,
      date: formattedDate,
      slot,
      professorId,
    };

    try {
      setLoading(true);
      const response = await service.post("/booking", bookingData);
      if (response.status === 200) {
        notifications.show({
          title: "Success",
          message: "Rooms booked successfully",
          color: "green",
        });
        setIsModalOpen(false);
        setLoading(false);
        setIsRoomdata(false);
      }
    } catch (error) {
      // console.error(error);
      notifications.show({
        title: "Error",
        message: error.response?.data?.error || "Booking failed",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSeatSelection = (roomId, seats) => {
    setSelectedRooms((prevRooms) => {
      const existingRoomIndex = prevRooms.findIndex((r) => r.room === roomId);
      if (existingRoomIndex >= 0) {
        if (seats === 0) {
          return prevRooms.filter((r) => r.room !== roomId);
        }
        const updatedRooms = [...prevRooms];
        updatedRooms[existingRoomIndex].seats = seats;
        return updatedRooms;
      } else if (seats > 0) {
        return [...prevRooms, { room: roomId, seats }];
      }
      return prevRooms;
    });
  };

  useEffect(() => {
    const filtered = availableRooms
      .map((room) => ({
        ...room,
        slots: room.slots.filter((s) => s.slot === slot),
      }))
      .filter((room) => room.slots.length > 0);
    setFilteredRooms(filtered);
    setSelectedRooms([]); // Clear selected rooms when changing slots
    // console.log("Filtered Rooms:", filtered);
  }, [slot, availableRooms]);

  useEffect(() => {
    if (inputdate) {
      const date = new Date(inputdate);
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const day = String(date.getDate()).padStart(2, "0");
      setFormattedDate(`${year}-${month}-${day}`);
    }
  }, [inputdate]);

  useEffect(() => {
    setIsRoomdata(false);
  }, [branch, semester, inputdate]);

  return (
    <Layout>
      <form onSubmit={handleAvailableRooms}>
        <div className="flex flex-wrap mx-auto mt-4 bg-[#0e13144f] border border-gray-700 rounded-lg p-4 shadow-md">
          {/* branch input */}
          <div className="w-full md:w-1/2 md:px-4">
            <Select
              label="Select Branch"
              placeholder="Pick branch"
              data={["ECE", "EEIOT", "ENC"]}
              value={branch}
              size="xs"
              onChange={(value) => setBranch(value || "")}
              checkIconPosition="right"
              required
              comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
              }}
            />
          </div>
          {/* semester input */}
          <div className="w-full md:w-1/2 md:px-4">
            <Select
              label="Select Semester"
              placeholder="Pick semester"
              value={semester}
              size="xs"
              onChange={(value) => setSemester(value || "")}
              checkIconPosition="right"
              data={["1", "2", "3", "4", "5", "6", "7", "8"]}
              comboboxProps={{
                transitionProps: { transition: "pop", duration: 200 },
              }}
              required
            />
          </div>
          {/* subject input */}
          <div className="w-full md:w-1/2 md:px-4 mt-4">
            <Input.Wrapper label="Subject" description="" error="">
              <Input
                required
                placeholder="Subject Input"
                size="xs"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </Input.Wrapper>
          </div>
          {/* date input */}
          <div className="w-full md:w-1/2 md:px-4 md:mt-4">
            <DateInput
              value={inputdate}
              size="xs"
              onChange={(date) => setInputDate(date)}
              label="Choose a Date"
              placeholder="Exam Date"
              required
              pointer
            />
          </div>
          <Button
            align="center"
            size="xs"
            color="#3f4bd1"
            className="w-full md:w-[50%] mx-auto px-4 mt-4"
            type="submit"
            disabled={loading}
          >
            {loading ? "Processing..." : "Check Available Rooms"}
          </Button>
        </div>
      </form>

      {/* room data box */}
      {isroomdata && (
        <div className="flex flex-col items-center mt-8 bg-[#0e13144f] border border-gray-700 rounded-lg p-4 shadow-md">
          <RoomCard availableRooms={availableRooms} />
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

      {/* modal for booking table */}
      {isModalOpen && (
        <Modal
          title={
            <div
              style={{
                fontSize: "16px",
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
          scrollAreaComponent={ScrollArea.Autosize}
          mx="auto"
        >
          {/* slots tab */}
          <div className="w-[50%] mx-auto my-2  flex gap-2 text-white mb-2 rounded-lg justify-center">
            <button
              className={`px-4 border border-white/30 rounded-md text-sm font-medium  ${
                activeTab === "slot1"
                  ? "bg-white text-black border-2 border-blue-700"
                  : ""
              }`}
              onClick={() => {
                setActiveTab("slot1");
                setSlot("1");
              }}
            >
              SLOT 1
            </button>
            <button
              className={`px-4 border border-white/30 rounded-md text-sm font-medium ${
                activeTab === "slot2"
                  ? "bg-white text-black border-2 border-blue-700"
                  : ""
              }`}
              onClick={() => {
                setActiveTab("slot2");
                setSlot("2");
              }}
            >
              SLOT 2
            </button>
          </div>
          {/* booking table */}
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
            <Table.Tbody style={{ fontWeight: "bold", fontSize: "12px" }}>
              {filteredRooms.length > 0 ? (
                filteredRooms.map((room) => (
                  <Table.Tr key={room.id} ta="center">
                    <Table.Td>{room.room}</Table.Td>
                    <Table.Td>{room.slots[0].slot}</Table.Td>
                    <Table.Td>{room.totalSeats}</Table.Td>
                    <Table.Td style={{ color: "green" }}>
                      {room.slots[0].availableSeats}
                    </Table.Td>
                    <Table.Td>
                      <NumberInput
                        placeholder="No of Seats"
                        clampBehavior="strict"
                        min={0}
                        max={room.slots[0].availableSeats}
                        style={{ width: "8rem" }}
                        onChange={(value) =>
                          handleSeatSelection(room.id, value || 0)
                        }
                        value={
                          selectedRooms.find((r) => r.room === room.id)
                            ?.seats || 0
                        }
                      />
                    </Table.Td>
                  </Table.Tr>
                ))
              ) : (
                <Table.Tr>
                  <Table.Td colSpan={5} style={{ textAlign: "center" }}>
                    No rooms available for this slot
                  </Table.Td>
                </Table.Tr>
              )}
            </Table.Tbody>
          </Table>
          {/* button */}
          <div className="flex justify-center">
            <Button
              mt="lg"
              size="xs"
              color="#3f4bd1"
              className="w-full md:w-[50%] px-4 mt-4 mx-auto"
              onClick={handleBooking}
              disabled={selectedRooms.length === 0 || loading}
            >
              {loading ? "Processing..." : "Confirm Booking"}
            </Button>
          </div>
        </Modal>
      )}
    </Layout>
  );
};

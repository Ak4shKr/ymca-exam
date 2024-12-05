import {
  Table,
  Paper,
  Button,
  Input,
  Modal,
  NumberInput,
  Group,
  Tooltip,
  Text,
} from "@mantine/core";

import { DashboardHeader } from "./DashboardHeader";
import { useEffect, useState } from "react";
import { Edit, Trash2 } from "lucide-react";
import { CollapseDesktop } from "./AdminLayout";
import { notifications } from "@mantine/notifications";
import service from "../httpd/service";
import { modals } from "@mantine/modals";

export const RoomManage = () => {
  const [room, setRoom] = useState("");
  const [capacity, setCapacity] = useState();
  const [loading, setLoading] = useState(false);
  const [rooms, setRooms] = useState([]);

  const [editRoom, setEditRoom] = useState("");
  const [editCapacity, setEditCapacity] = useState();

  const handleAddRoom = () => {
    setCreateModalOpen(true);
  };
  const submitAddRoom = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await service.post("/create-room", {
        number: room,
        capacity,
      });
      if (response.status === 200) {
        notifications.show({
          title: "Room Created",
          message: "Room has been created successfully.",
          color: "green",
        });
        setCreateModalOpen(false);
        setLoading(false);
        setRoom("");
        setCapacity();
        fetchRooms();
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Room Creation Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };
  const handleEditRoom = ({ roomId }) => {
    console.log(roomId);
    const selectedRoom = rooms.find((room) => room._id === roomId);
    if (selectedRoom) {
      setEditRoom(selectedRoom.number);
      setEditCapacity(selectedRoom.totalSeats);
    }
    setEditModalOpen(true);
  };

  const handleEditRoomSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const response = await service.put("/update-room", {
        number: editRoom,
        capacity: editCapacity,
      });
      if (response.status === 200) {
        notifications.show({
          title: "Room Updated",
          message: "Room has been updated successfully.",
          color: "green",
        });
        setEditModalOpen(false);
        setLoading(false);
        setEditRoom("");
        setEditCapacity();
        fetchRooms();
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Room Update Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const openConfirm = (roomId) => {
    modals.openConfirmModal({
      title: "Delete Room",
      centered: true,
      children: <Text size="sm">Are you sure, want to Delete this Room?</Text>,
      labels: { confirm: "Yes, do", cancel: "No, don't " },
      confirmProps: { color: "#F0185C" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        handleDeleteRoom(roomId);
      },
    });
  };

  const handleDeleteRoom = async ({ roomId }) => {
    const selectedRoom = rooms.find((room) => room._id === roomId);
    if (!selectedRoom) {
      notifications.show({
        title: "Room Deletion Error",
        message: "Room not found",
        color: "red",
      });
      return;
    }
    // const Confirm = window.confirm(
    //   "Are you sure you want to delete this room?"
    // );
    // if (!Confirm) return;
    // console.log(typeof selectedRoom.number);
    try {
      const response = await service.delete("/delete-room", {
        params: { number: selectedRoom.number },
      });
      if (response.status === 200) {
        notifications.show({
          title: "Room Deleted",
          message: "Room has been deleted successfully.",
          color: "green",
        });
        fetchRooms();
      }
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Room Deletion Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    }
  };

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const roomdata = [];
  const fetchRooms = async () => {
    try {
      const response = await service.get("/all-rooms");
      setRooms(response.data.rooms);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Rooms Fetch Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    }
  };

  useEffect(() => {
    fetchRooms();
  }, []);

  if (rooms.length > 0) {
    rooms.map((room, index) => {
      roomdata.push({
        id: room._id,
        index: index + 1,
        room: room.number,
        capacity: room.totalSeats,
      });
    });
  }

  const rows = roomdata.map((item) => (
    <Table.Tr key={item.index}>
      <Table.Td ta="center">{item.index}</Table.Td>
      <Table.Td ta="center">{item.room}</Table.Td>
      <Table.Td ta="center">{item.capacity}</Table.Td>
      <Table.Td ta="center">
        <Group gap="xs" justify="center">
          <Tooltip label="edit" position="left" color="dark">
            <span className="hover:text-green-500 cursor-pointer">
              <Edit
                size={16}
                onClick={() => handleEditRoom({ roomId: item.id })}
              />
            </span>
          </Tooltip>
          <Tooltip label="delete" position="right" color="dark">
            <span className="hover:text-red-500 cursor-pointer">
              <Trash2
                size={16}
                onClick={() => openConfirm({ roomId: item.id })}
              />
            </span>
          </Tooltip>
        </Group>
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <CollapseDesktop>
      <DashboardHeader
        title="Room Management"
        ButtonProps={{
          label: "Add Room",
          color: "#2bdd66",
          size: "xs",
          radius: "sm",
          sizeIcon: 20,
          onClick: handleAddRoom,
        }}
      />
      <div className="relative overflow-auto h-[calc(100vh-9rem)]">
        <Paper
          w="95%"
          mx="auto"
          shadow="md"
          p="md"
          radius="md"
          className="bg-[#0e13144f]"
        >
          <Table.ScrollContainer minWidth={500}>
            <Table fontSize="sm" ta="center" verticalSpacing="sm">
              <Table.Thead>
                <Table.Tr>
                  <Table.Th ta="center">Index</Table.Th>
                  <Table.Th ta="center">Room</Table.Th>
                  <Table.Th ta="center">Capacity</Table.Th>
                  <Table.Th ta="center">Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Paper>
      </div>
      {createModalOpen && (
        <Modal
          opened={createModalOpen}
          onClose={() => setCreateModalOpen(false)}
          centered
          title="Create Room"
        >
          <form onSubmit={submitAddRoom}>
            <Input.Wrapper label="Room">
              <Input
                placeholder="Room Number"
                value={room}
                onChange={(e) => setRoom(e.target.value)}
                required
                styles={{
                  input: {
                    backgroundColor: "black",
                  },
                }}
              />
            </Input.Wrapper>

            <NumberInput
              label="Capacity"
              placeholder="Capacity"
              value={capacity}
              onChange={(value) => setCapacity(value)}
              required
              min={2}
              styles={{
                input: {
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
                mt="sm"
                color="#0058e4"
              >
                {loading ? "Processing..." : "Create Room"}
              </Button>
            </div>
          </form>
        </Modal>
      )}
      {editModalOpen && (
        <Modal
          opened={editModalOpen}
          onClose={() => setEditModalOpen(false)}
          centered
          title="Edit Room Details"
        >
          <form onSubmit={handleEditRoomSubmit}>
            <Input.Wrapper label="Room">
              <Input
                placeholder="Room Number"
                value={editRoom}
                onChange={(value) => setEditRoom(value)}
                required
                styles={{
                  input: {
                    backgroundColor: "black",
                  },
                }}
              />
            </Input.Wrapper>

            <NumberInput
              label="Capacity"
              placeholder="Capacity"
              value={editCapacity}
              onChange={(value) => setEditCapacity(value)}
              required
              min={2}
              styles={{
                input: {
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
                mt="sm"
                color="#0058e4"
              >
                Update Room
              </Button>
            </div>
          </form>
        </Modal>
      )}
    </CollapseDesktop>
  );
};

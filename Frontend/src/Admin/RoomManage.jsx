import {
  Table,
  Paper,
  Button,
  Input,
  Modal,
  NumberInput,
  Group,
  Tooltip,
} from "@mantine/core";
import { CollapseDesktop } from "./Layout";
import { DashboardHeader } from "./DashboardHeader";
import { useState } from "react";
import { Edit, Trash2 } from "lucide-react";

export const RoomManage = () => {
  const handleAddRoom = () => {
    setCreateModalOpen(true);
  };
  const handleEditRoom = () => {
    setEditModalOpen(true);
  };

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [editModalOpen, setEditModalOpen] = useState(false);
  const roomdata = [
    { index: 1, room: "T1", capacity: 50, action: "Delete" },
    { index: 2, room: "T2", capacity: 54, action: "Delete" },
    { index: 3, room: "T3", capacity: 58, action: "Delete" },
    { index: 4, room: "S13", capacity: 40, action: "Delete" },
    { index: 5, room: "T5", capacity: 32, action: "Delete" },
  ];

  const rows = roomdata.map((item) => (
    <Table.Tr key={item.index}>
      <Table.Td ta="center">{item.index}</Table.Td>
      <Table.Td ta="center">{item.room}</Table.Td>
      <Table.Td ta="center">{item.capacity}</Table.Td>
      <Table.Td ta="center">
        <Group gap="xs" justify="center">
          <Tooltip label="edit" position="left" color="dark">
            <span className="hover:text-green-500 cursor-pointer">
              <Edit size={16} onClick={handleEditRoom} />
            </span>
          </Tooltip>
          <Tooltip label="delete" position="right" color="dark">
            <span className="hover:text-red-500 cursor-pointer">
              <Trash2 size={16} />
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
          <form>
            <Input.Wrapper label="Room">
              <Input
                placeholder="Room Number"
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
                Create Room
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
          <form>
            <Input.Wrapper label="Room">
              <Input
                placeholder="Room Number"
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

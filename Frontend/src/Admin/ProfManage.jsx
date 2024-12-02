import { Paper, Table } from "@mantine/core";
import { CollapseDesktop } from "./AdminLayout";
import { DashboardHeader } from "./DashboardHeader";

export const ProfManage = () => {
  const roomdata = [
    {
      index: 1,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "Block",
    },
    {
      index: 2,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "Block",
    },
    {
      index: 3,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "UnBlock",
    },
    {
      index: 4,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "Block",
    },
    {
      index: 5,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "Block",
    },
    {
      index: 6,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "UnBlock",
    },
    {
      index: 7,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "Block",
    },
    {
      index: 8,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "Block",
    },
    {
      index: 9,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "Block",
    },
    {
      index: 10,
      name: "Akash",
      email: "akashsahabanaul@gmail.com",
      gender: "Male",
      action: "UnBlock",
    },
  ];

  const rows = roomdata.map((item) => (
    <Table.Tr key={item.index}>
      <Table.Td ta="center">{item.index}</Table.Td>
      <Table.Td ta="center">{item.name}</Table.Td>
      <Table.Td ta="center">{item.email}</Table.Td>
      <Table.Td ta="center">{item.gender}</Table.Td>
      <Table.Td
        ta="center"
        className={`${
          item.action === "Block" ? "text-green-500" : "text-red-500"
        } font-medium cursor-pointer hover:scale-105`}
      >
        {item.action}
      </Table.Td>
    </Table.Tr>
  ));

  return (
    <CollapseDesktop>
      <DashboardHeader title="Professor Management" />
      <div className=" overflow-auto h-[calc(100vh-9rem)]">
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
                  <Table.Th ta="center">Name</Table.Th>
                  <Table.Th ta="center">Email</Table.Th>
                  <Table.Th ta="center">Gender</Table.Th>
                  <Table.Th ta="center">Action</Table.Th>
                </Table.Tr>
              </Table.Thead>
              <Table.Tbody>{rows}</Table.Tbody>
            </Table>
          </Table.ScrollContainer>
        </Paper>
      </div>
    </CollapseDesktop>
  );
};

import { Paper, Table, Text } from "@mantine/core";
import { CollapseDesktop } from "./AdminLayout";
import { DashboardHeader } from "./DashboardHeader";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import service from "../httpd/service";
import { useLoaderStore } from "../store/loaderState";
import { modals } from "@mantine/modals";

export const ProfManage = () => {
  const [professors, setProfessors] = useState([]);
  const profdata = [];
  const setloading = useLoaderStore((state) => state.setLoading);

  const fetchProfessors = async () => {
    setloading(true);
    try {
      const response = await service.get("/all-professor");
      setProfessors(response.data.professors);
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Professors Fetch Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchProfessors();
  }, []);

  const handleBlock = async (professorId, action) => {
    setloading(true);
    try {
      const response = await service.post("/update-professor", {
        professorId,
        status: action === "Block" ? "false" : "true",
      });
      notifications.show({
        title: "Professor Block",
        message: response.data.message,
        color: "blue",
      });
      await fetchProfessors();
    } catch (error) {
      console.error(error);
      notifications.show({
        title: "Professor Block Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setloading(false);
    }
  };

  const openConfirm = (professorId, action) => {
    modals.openConfirmModal({
      title: `${action} Professor`,
      centered: true,
      children: (
        <Text size="sm">Are you sure, want to {action} this professor?</Text>
      ),
      labels: { confirm: "Yes, do", cancel: "No, don't " },
      confirmProps: { color: "#F0185C" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        handleBlock(professorId, action);
      },
    });
  };

  professors.map((professor, index) => {
    profdata.push({
      index: index + 1,
      professorId: professor._id,
      name: professor.name,
      email: professor.email,
      gender: professor.gender,
      action: professor.isVerified ? "Block" : "Unblock",
    });
  });

  const rows = profdata.map((item) => (
    <Table.Tr key={item.index}>
      <Table.Td ta="center">{item.index}</Table.Td>
      <Table.Td ta="center">{item.name}</Table.Td>
      <Table.Td ta="center">{item.email}</Table.Td>
      <Table.Td ta="center">{item.gender}</Table.Td>
      <Table.Td
        ta="center"
        onClick={() => openConfirm(item.professorId, item.action)}
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

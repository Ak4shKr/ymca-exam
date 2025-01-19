import { Check } from "lucide-react";
import { CollapseDesktop } from "./AdminLayout";
import { DashboardHeader } from "./DashboardHeader";
import {
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Tabs,
  Text,
  Tooltip,
} from "@mantine/core";
import { useEffect, useState } from "react";
import service from "../httpd/service";
import { useLoaderStore } from "../store/loaderState";
import { notifications } from "@mantine/notifications";

export const Feedback = () => {
  const [reports, setReports] = useState([]);
  const [status, setStatus] = useState("false");
  const setloading = useLoaderStore((state) => state.setLoading);
  const fetchReports = async (status) => {
    try {
      setloading(true);
      const response = await service.get(`/all-reports?status=${status}`);
      setReports(response.data.data);
      setloading(false);
      console.log(response.data.data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  const updateReport = async (reportId, status1 = "true") => {
    try {
      setloading(true);
      const response = await service.put(
        `/update-reports?reportId=${reportId}&status=${status1}`
      );
      if (response.status === 200) {
        notifications.show({
          title: "Report Status",
          message: response.data.message,
          color: "blue",
        });
        fetchReports(status);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
    }
  };

  useEffect(() => {
    fetchReports(status);
  }, [status]);

  return (
    <CollapseDesktop>
      <DashboardHeader title="Feedback Management" />
      <div
        className="relative overflow-auto h-[calc(100vh-9rem)] "
        style={{ scrollbarWidth: "none" }}
      >
        <Paper
          mx="auto"
          shadow="md"
          p="md"
          radius="md"
          className="bg-[#0e13144f]"
        >
          <Tabs color="teal" defaultValue="first">
            <Tabs.List>
              <Tabs.Tab
                value="first"
                color="red"
                onClick={() => setStatus("false")}
              >
                Unseen
              </Tabs.Tab>
              <Tabs.Tab
                value="second"
                color="#9d32df"
                onClick={() => setStatus("true")}
              >
                Seen
              </Tabs.Tab>
              <Tabs.Tab
                value="third"
                color="#9d32df"
                onClick={() => setStatus("")}
              >
                All Reports
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel value="first" pt="xs">
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, md: "sm" }}
              >
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <ReportCard
                      key={report._id}
                      report={report}
                      updateReport={updateReport}
                    />
                  ))
                ) : (
                  <Text c="gray.5">No reports found</Text>
                )}
              </SimpleGrid>
            </Tabs.Panel>
            <Tabs.Panel value="second" pt="xs">
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, md: "sm" }}
              >
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <ReportCard
                      key={report._id}
                      report={report}
                      updateReport={updateReport}
                    />
                  ))
                ) : (
                  <Text c="gray.5">No reports found</Text>
                )}
              </SimpleGrid>
            </Tabs.Panel>{" "}
            <Tabs.Panel value="third" pt="xs">
              <SimpleGrid
                cols={{ base: 1, sm: 2, lg: 3 }}
                spacing={{ base: 10, md: "sm" }}
              >
                {reports.length > 0 ? (
                  reports.map((report) => (
                    <ReportCard
                      key={report._id}
                      report={report}
                      updateReport={updateReport}
                    />
                  ))
                ) : (
                  <Text c="gray.5">No reports found</Text>
                )}
              </SimpleGrid>
            </Tabs.Panel>
          </Tabs>
        </Paper>
      </div>
    </CollapseDesktop>
  );
};

const ReportCard = ({ report, updateReport }) => {
  const { _id, name, email, comment, seen, createdAt } = report;
  return (
    <Card
      shadow="sm"
      padding="sm"
      radius="md"
      bg="#18181b"
      withBorder
      style={{ borderColor: "#1f2937" }}
    >
      <Group justify="space-between" mb="xs">
        <Group gap={"xs"}>
          <Avatar
            src={`/avatar/avatar${Math.floor(Math.random() * 3) + 1}.png`}
            size="md"
          />
          <Stack gap={2}>
            <Text size="xs" fw={500} c="white">
              {name}
            </Text>
            <Text size="xs" c="dimmed">
              {email}
            </Text>
          </Stack>
        </Group>
        <Tooltip label="Mark as seen" position="top-end" withArrow color="dark">
          <Button
            radius="md"
            color="green"
            size="xs"
            variant="light"
            style={{ visibility: seen ? "hidden" : "visible" }}
            onClick={() => updateReport(_id)}
          >
            <Check size={20} />
          </Button>
        </Tooltip>
      </Group>

      <Divider color="gray.8" my="xs" />

      <Text size="sm" c="gray.3" mb="sm" lineClamp={2}>
        {comment}
      </Text>

      <Text size="xs" c="dimmed" fs="italic">
        Created at: {new Date(createdAt).toLocaleString().split(",")[0]}
      </Text>
    </Card>
  );
};

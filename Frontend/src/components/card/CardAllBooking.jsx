import {
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Input,
  Select,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { Layout } from "../../Layout";
import { Plus } from "lucide-react";
import service from "../../httpd/service";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";
import { useAuthStore } from "../../store/authState";
import { modals } from "@mantine/modals";
import { useLoaderStore } from "../../store/loaderState";

export const CardAllBooking = () => {
  const setLoading = useLoaderStore((state) => state.setLoading);
  const { getUser } = useAuthStore();
  const user = getUser();

  const [responsedata, setResponsedata] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [semester, setSemester] = useState("");
  const [branch, setBranch] = useState("");
  const [booking, setBooking] = useState("upcoming");
  const [search, setSearch] = useState("");

  const getBooking = async () => {
    setLoading(true);
    try {
      const response = await service.get("/all-booking");
      const filteredBookings = response.data.bookings.filter(
        (booking) =>
          !booking.professor.some((prof) => prof.professorId === user._id)
      );
      setResponsedata(filteredBookings);
      setFilteredData(filteredBookings);
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: error.response.data.error,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  const filterData = () => {
    let filtered = responsedata;

    if (search) {
      filtered = filtered.filter(
        (item) =>
          item.subject.toLowerCase().includes(search.toLowerCase()) ||
          item.professor.some((prof) =>
            prof.professorName.toLowerCase().includes(search.toLowerCase())
          )
      );
    }

    if (branch && branch !== "All") {
      filtered = filtered.filter((item) => item.branch === branch);
    }
    if (semester && semester !== "All") {
      filtered = filtered.filter(
        (item) => String(item.semester) === String(semester)
      );
    }
    if (booking) {
      const now = new Date();
      filtered = filtered.filter((item) => {
        const bookingDate = new Date(item.date);
        return booking === "upcoming" ? bookingDate >= now : bookingDate < now;
      });
    }
    setFilteredData(filtered);
  };

  useEffect(() => {
    getBooking();
  }, []);

  useEffect(() => {
    filterData();
  }, [semester, branch, booking, responsedata, search]);

  const openConfirm = (bookingId) => {
    modals.openConfirmModal({
      title: "Add Booking",
      centered: true,
      children: <Text size="sm">Are you sure, want to Add into Room?</Text>,
      labels: { confirm: "Yes, do", cancel: "No, don't " },
      confirmProps: { color: "#2bdd66" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => handleAddProfessor(bookingId),
    });
  };

  const handleAddProfessor = async (bookingId) => {
    setLoading(true);
    try {
      const user = JSON.parse(localStorage.getItem("user"));
      if (!user || !user._id) {
        notifications.show({
          title: "Error",
          message: "Please login to continue",
          color: "red",
        });
        return;
      }
      const professorId = user._id;

      const response = await service.post("/add-professor", {
        professorId,
        bookingId,
      });

      if (response.status == 200) {
        await getBooking();
        notifications.show({
          title: "Success",
          message: "Professor added successfully",
          color: "green",
        });
      }
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: error.response.data.error,
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Layout>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 5 }}
        spacing={{ base: 2, md: "xs" }}
      >
        <Input
          placeholder="search subject or prof."
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          size="xs"
          styles={{
            input: {
              backgroundColor: "black",
            },
          }}
        />
        <Select
          styles={{
            input: {
              backgroundColor: "black",
            },
          }}
          placeholder="Branch"
          value={branch}
          size="xs"
          onChange={(value) => setBranch(value || "")}
          data={["All", "ECE", "ENC", "EEIOT"]}
          required
        />
        <Select
          styles={{
            input: {
              backgroundColor: "black",
            },
          }}
          placeholder="Semester"
          value={semester}
          size="xs"
          onChange={(value) => setSemester(value || "")}
          data={["All", "1", "2", "3", "4", "5", "6", "7", "8"]}
          required
        />
        <Select
          styles={{
            input: {
              backgroundColor: "black",
            },
          }}
          placeholder="Booking date"
          value={booking}
          size="xs"
          onChange={(value) => setBooking(value || "")}
          data={["past", "upcoming"]}
          required
        />
      </SimpleGrid>
      <Divider my={8} />
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, md: "xl" }}
      >
        {filteredData.length > 0 ? (
          filteredData.map((data) => (
            <Card
              key={data._id}
              shadow="sm"
              padding="lg"
              radius="md"
              bg="#0e13144f"
              withBorder
            >
              <Group justify="space-between" mb={4}>
                <Badge color="cyan">
                  {data.date.split("T")[0].split("-").reverse().join("-")}
                </Badge>
                <Badge color="cyan">slot: {data.slot}</Badge>
              </Group>
              <Text fw={700} size="xl">
                {data.subject.toUpperCase()}
              </Text>
              <Text size="sm" c="dimmed">
                Btech {data.branch} Semester {data.semester}
              </Text>
              <Text size="sm" c="dimmed">
                Room: {data.rooms.map((room) => room.roomNumber).join(", ")}
              </Text>
              <Group justify="space-between">
                <Stack gap={0}>
                  {data.professor.map((prof) => (
                    <Badge
                      color="indigo"
                      mt="xs"
                      radius="sm"
                      fw={500}
                      key={prof.professorId}
                    >
                      {prof.professorName.split(" ")[0]}
                    </Badge>
                  ))}
                </Stack>
                <Button
                  color="green"
                  mt="md"
                  size="xs"
                  disabled={data.professor.length > 1}
                  onClick={() => openConfirm(data._id)}
                >
                  <Plus size={20} />
                </Button>
              </Group>
            </Card>
          ))
        ) : (
          <Text>No bookings available</Text>
        )}
      </SimpleGrid>
    </Layout>
  );
};

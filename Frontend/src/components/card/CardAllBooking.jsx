import {
  Badge,
  Button,
  Card,
  Group,
  SimpleGrid,
  Stack,
  Text,
} from "@mantine/core";
import { Layout } from "../../Layout";
import { Plus } from "lucide-react";
import service from "../../httpd/service";
import { useEffect, useState } from "react";
import { notifications } from "@mantine/notifications";

export const CardAllBooking = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [responsedata, setResponsedata] = useState([]);
  const getBooking = async () => {
    try {
      const response = await service.get("/all-booking");
      const filteredBookings = response.data.bookings.filter(
        (booking) =>
          !booking.professor.some((prof) => prof.professorId === user._id)
      );

      setResponsedata(filteredBookings);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddProfessor = async (bookingId) => {
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
        notifications.show({
          title: "Success",
          message: "Professor added successfully",
          color: "green",
        });
      }
      getBooking();
    } catch (error) {
      console.log(error.response.data.error);
      notifications.show({
        title: "Failed",
        message: error.response.data.error,
        color: "red",
      });
    }
  };

  useEffect(() => {
    getBooking();
  }, []);
  return (
    <Layout>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, md: "xl" }}
      >
        {responsedata.map((data) => (
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
              Room:{" "}
              {data.rooms.map((room, index) => (
                <span key={index}>{room.roomNumber + " "}</span>
              ))}
            </Text>
            <Group justify="space-between">
              <Stack gap={0}>
                {data.professor.map((prof, index) => (
                  <Badge
                    color="indigo"
                    mt="xs"
                    radius="sm"
                    fw={500}
                    key={index}
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
                onClick={() => handleAddProfessor(data._id)}
              >
                <Plus size={24} />
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

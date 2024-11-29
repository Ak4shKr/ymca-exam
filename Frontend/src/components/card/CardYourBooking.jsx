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
import { Minus } from "lucide-react";
import service from "../../httpd/service";
import { useEffect, useState } from "react";
import { useAuthStore } from "../../store/authState";
import { notifications } from "@mantine/notifications";

export const CardYourBooking = () => {
  const [responsedata, setResponsedata] = useState([]);
  const { getUser } = useAuthStore();
  const professorId = getUser()._id;

  const handleRemoveProfessor = async (bookingId) => {
    try {
      const response = await service.post("/remove-professor", {
        professorId,
        bookingId,
      });
      if (response.status == 200) {
        notifications.show({
          title: "Success",
          message: "Professor removed successfully",
          color: "green",
        });
      }
      getBooking();
    } catch (error) {
      notifications.show({
        title: "Failed",
        message: error.response.data.error,
        color: "red",
      });
    }
  };

  const getBooking = async () => {
    try {
      const response = await service.get(`/booking-professor/${professorId}`);
      setResponsedata(response.data.bookings);
      console.log(response.data);
    } catch (error) {
      console.error(error);
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
        {responsedata?.length > 0 ? (
          responsedata.map((data) => (
            <Card
              key={data._id}
              shadow="sm"
              padding="lg"
              radius="md"
              bg="#0e13144f"
              withBorder
            >
              <Group justify="space-between" mb={4}>
                <Badge color="grape">
                  {data.date.split("T")[0].split("-").reverse().join("-")}
                </Badge>
                <Badge color="grape">Slot: {data.slot}</Badge>
              </Group>
              <Text fw={700} size="xl">
                {data.subject.toUpperCase()}
              </Text>

              <Text size="sm" c="dimmed">
                B.Tech {data.branch} Semester {data.semester}
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
                  color="red"
                  mt="md"
                  size="xs"
                  disabled={data.professor.length < 2}
                  onClick={() => handleRemoveProfessor(data._id)}
                >
                  <Minus size={24} />
                </Button>
              </Group>
            </Card>
          ))
        ) : (
          <Text>No bookings found</Text>
        )}
      </SimpleGrid>
    </Layout>
  );
};

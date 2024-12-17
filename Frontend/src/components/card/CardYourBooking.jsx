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
import { modals } from "@mantine/modals";
import { useLoaderStore } from "../../store/loaderState";

export const CardYourBooking = () => {
  const [responsedata, setResponsedata] = useState([]);
  const { getUser } = useAuthStore();
  const professorId = getUser()._id;
  const setloading = useLoaderStore((state) => state.setLoading);

  const openConfirm = (bookingId) => {
    modals.openConfirmModal({
      title: "Cancel Booking",
      centered: true,
      children: <Text size="sm">Are you sure, want to left Room?</Text>,
      labels: { confirm: "Yes, do", cancel: "No, don't " },
      confirmProps: { color: "#F0185C" },
      onCancel: () => console.log("Cancel"),
      onConfirm: () => {
        handleRemoveProfessor(bookingId);
      },
    });
  };

  const handleRemoveProfessor = async (bookingId) => {
    setloading(true);
    try {
      const response = await service.post("/remove-professor", {
        professorId,
        bookingId,
      });
      if (response.status == 200) {
        await getBooking();
        notifications.show({
          title: "Success",
          message: "Professor removed successfully",
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
      setloading(false);
    }
  };

  const getBooking = async () => {
    setloading(true);
    try {
      const response = await service.get(`/booking-professor/${professorId}`);
      setResponsedata(response.data.bookings);
      console.log(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setloading(false);
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
            className="hover:border-gray-800 "
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
                <span key={index}>
                  {room.roomNumber + "->" + room.seatsBooked + "  "}
                </span>
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
                // disabled={data.professor.length < 2}
                // onClick={() => handleRemoveProfessor(data._id)}
                onClick={() => openConfirm(data._id)}
              >
                <Minus size={20} />
              </Button>
            </Group>
          </Card>
        ))}
      </SimpleGrid>
    </Layout>
  );
};

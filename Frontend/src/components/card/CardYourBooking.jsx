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

export const CardYourBooking = () => {
  return (
    <Layout>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, md: "xl" }}
      >
        <Card shadow="sm" padding="lg" radius="md" bg="#0e13144f" withBorder>
          <Group justify="space-between" mb={4}>
            <Badge color="grape">12-10-2024</Badge>
            <Badge color="grape">slot: 1</Badge>
          </Group>
          <Text fw={700} size="xl">
            FOC
          </Text>

          <Text size="sm" c="dimmed">
            Btech ECE Semester 7
          </Text>
          <Text size="sm" c="dimmed">
            Room : T1 T2
          </Text>
          <Group justify="space-between">
            <Stack gap={0}>
              <Badge color="indigo" mt="xs" radius="sm" fw={500}>
                sonam
              </Badge>
              <Badge color="indigo" mt="xs" radius="sm" fw={500}>
                manju
              </Badge>
            </Stack>
            <Button color="red" mt="md" size="xs">
              <Minus size={24} />
            </Button>
          </Group>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" bg="#0e13144f" withBorder>
          <Group justify="space-between" mb={4}>
            <Badge color="grape">18-10-2024</Badge>
            <Badge color="grape">slot: 2</Badge>
          </Group>
          <Text fw={700} size="xl">
            AP
          </Text>

          <Text size="sm" c="dimmed">
            Btech EEIOT Semester 7
          </Text>
          <Text size="sm" c="dimmed">
            Room : T1 T2
          </Text>
          <Group justify="space-between">
            <Stack gap={0}>
              <Badge color="indigo" mt="xs" radius="sm" fw={500}>
                rahul
              </Badge>
            </Stack>
            <Button color="red" mt="md" size="xs">
              <Minus size={24} />
            </Button>
          </Group>
        </Card>{" "}
        <Card
          shadow="sm"
          padding="lg"
          radius="md"
          bg="#0e13144f"
          className="border border-gray-700"
        >
          <Group justify="space-between" mb={4}>
            <Badge color="grape">14-10-2024</Badge>
            <Badge color="grape">slot: 3</Badge>
          </Group>
          <Text fw={700} size="xl">
            ICC
          </Text>

          <Text size="sm" c="dimmed">
            Btech ENC Semester 7
          </Text>
          <Text size="sm" c="dimmed">
            Room : T1 T2
          </Text>
          <Group justify="space-between">
            <Stack gap={0}>
              <Badge color="indigo" mt="xs" radius="sm" fw={500}>
                lalit
              </Badge>
              <Badge color="indigo" mt="xs" radius="sm" fw={500}>
                neetu
              </Badge>
            </Stack>
            <Button color="red" mt="md" size="xs" disabled>
              <Minus size={24} />
            </Button>
          </Group>
        </Card>
      </SimpleGrid>
    </Layout>
  );
};

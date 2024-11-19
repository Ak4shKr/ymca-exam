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

export const CardAllBooking = () => {
  return (
    <Layout>
      <SimpleGrid
        cols={{ base: 1, sm: 2, lg: 4 }}
        spacing={{ base: 10, md: "xl" }}
      >
        <Card shadow="sm" padding="lg" radius="md" bg="#0e13144f" withBorder>
          <Group justify="space-between" mb={4}>
            <Badge color="cyan">12-10-2024</Badge>
            <Badge color="cyan">slot: 1</Badge>
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
            <Button color="green" mt="md" size="xs">
              <Plus size={24} />
            </Button>
          </Group>
        </Card>
        <Card shadow="sm" padding="lg" radius="md" bg="#0e13144f" withBorder>
          <Group justify="space-between" mb={4}>
            <Badge color="cyan">18-10-2024</Badge>
            <Badge color="cyan">slot: 2</Badge>
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
            <Button color="green" mt="md" size="xs">
              <Plus size={24} />
            </Button>
          </Group>
        </Card>{" "}
        <Card shadow="sm" padding="lg" radius="md" bg="#0e13144f" withBorder>
          <Group justify="space-between" mb={4}>
            <Badge color="cyan">14-10-2024</Badge>
            <Badge color="cyan">slot: 3</Badge>
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
            <Button color="green" mt="md" size="xs" disabled>
              <Plus size={24} />
            </Button>
          </Group>
        </Card>
      </SimpleGrid>
    </Layout>
  );
};

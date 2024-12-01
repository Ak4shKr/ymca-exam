import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "@mantine/core/styles.css";
import "@mantine/notifications/styles.css";
import "@mantine/dates/styles.css";
import "@mantine/carousel/styles.css";
import "@mantine/modals";

import { AppShell, MantineProvider } from "@mantine/core";
import { Notifications } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import "./index.css";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <MantineProvider defaultColorScheme="dark">
    <ModalsProvider />
    <Notifications />
    <AppShell />
    <App />
  </MantineProvider>
);

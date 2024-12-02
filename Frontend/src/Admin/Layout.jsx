import { AppShell, Burger, Group, Skeleton } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { useLocation } from "react-router-dom";

const navItem = [
  {
    id: 1,
    name: "Room",
    path: "/dashboard",
  },
  {
    id: 2,
    name: "Professors",
    path: "/dashboard/professors",
  },
];

export const CollapseDesktop = ({ children }) => {
  const [mobileOpened, { toggle: toggleMobile }] = useDisclosure();
  const [desktopOpened, { toggle: toggleDesktop }] = useDisclosure(true);
  const location = useLocation();

  return (
    <AppShell
      header={{ height: 55 }}
      navbar={{
        width: 200,
        breakpoint: "sm",
        collapsed: { mobile: !mobileOpened, desktop: !desktopOpened },
      }}
      padding="md"
    >
      <AppShell.Header className="bg-gray-900">
        <Group h="100%" px="md">
          <Burger
            opened={mobileOpened}
            onClick={toggleMobile}
            hiddenFrom="sm"
            size="sm"
          />
          <Burger
            opened={desktopOpened}
            onClick={toggleDesktop}
            visibleFrom="sm"
            size="sm"
          />

          <div className="flex items-center">
            <img
              src="/logo/ymca_logo.png"
              alt="YMCA Logo"
              className="h-9 w-auto mr-4"
            />
            <h2 className="font-exo font-semibold text-xl">DashBoard</h2>
          </div>
        </Group>
      </AppShell.Header>
      <AppShell.Navbar p="xs" className="bg-gray-900/50">
        {navItem.map((item, index) => (
          <a
            key={index}
            href={item.path}
            className={`text-md font-semibold py-1 my-1 ${
              location.pathname === item.path
                ? "bg-[#3f4bd1]"
                : "hover:bg-[#3f4bd16b]"
            } rounded-md px-4`}
          >
            {item.name}
          </a>
        ))}
      </AppShell.Navbar>
      <AppShell.Main className=" bg-gradient-to-br from-gray-900 to-gray-800">
        {children}
      </AppShell.Main>
    </AppShell>
  );
};

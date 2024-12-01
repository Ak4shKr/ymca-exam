import { Button, Tooltip } from "@mantine/core";
import { Plus } from "lucide-react";

export const DashboardHeader = ({ title, ButtonProps = {} }) => {
  return (
    <div className="h-8 mb-4 flex justify-between mx-6 items-center sticky top-[4.5rem] z-10">
      <div>
        <h1 className="font-exo font-semibold text-[#9d32df] text-xl">
          {title}
        </h1>
      </div>
      <div>
        {ButtonProps.label && (
          <Tooltip label={ButtonProps.label} position="left" color="dark">
            <Button
              color={ButtonProps.color}
              size={ButtonProps.size}
              radius={ButtonProps.radius}
              onClick={ButtonProps.onClick}
            >
              <Plus size={ButtonProps.sizeIcon} />
            </Button>
          </Tooltip>
        )}
      </div>
    </div>
  );
};

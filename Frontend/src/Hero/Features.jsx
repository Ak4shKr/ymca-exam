import { Card, SimpleGrid } from "@mantine/core";
import { featuresData } from "../Data/data";

export const Features = () => {
  return (
    <div className="py-12 px-4 md:px-8 bg-dark text-white">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-exo font-semibold text-white">
          Why Choose Us
        </h1>
        <p className="text-gray-300 mt-2">
          Discover the features that make our platform the best choice for exam
          scheduling.
        </p>
      </div>

      {/* Cards Grid */}
      <div>
        <SimpleGrid
          cols={{ base: 1, sm: 2, lg: 4 }}
          spacing={{ base: 10, md: "xl" }}
          className="gap-6"
        >
          {featuresData.map((feature, index) => (
            <Card
              key={index}
              whileHover={{ scale: 1.05 }}
              shadow="sm"
              radius="md"
              withBorder
              className="rounded-lg border border-gray-700 bg-gradient-to-tr from-[#3f4bd1] to-[#5e69e7] hover:scale-105 hover:border-2 hover:border-blue-600  cursor-pointer duration-300 ease-in-out"
            >
              <Card.Section className="flex justify-center items-center py-4 bg-[#2f3136]">
                <div
                  className="bg-cover bg-center rounded-t-lg"
                  style={{
                    backgroundImage: `url(${feature.icon})`, // Replace with actual image paths
                    height: "80px", // Set the height of the div
                    width: "80px", // Set the width of the div
                  }}
                />
              </Card.Section>
              <div className="py-4 text-center">
                <h2 className="text-lg font-semibold mb-2">{feature.title}</h2>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            </Card>
          ))}
        </SimpleGrid>
      </div>
    </div>
  );
};

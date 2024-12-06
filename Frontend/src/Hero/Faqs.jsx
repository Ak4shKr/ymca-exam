import { Accordion } from "@mantine/core";
import { faqsData } from "../Data/data";

export const Faqs = () => {
  const faqItems = faqsData.map((item) => (
    <Accordion.Item key={item.value} value={item.value} className="text-sm">
      <Accordion.Control icon={item.emoji} className="text-white">
        {item.value}
      </Accordion.Control>
      <Accordion.Panel className="text-gray-300">
        {item.description}
      </Accordion.Panel>
    </Accordion.Item>
  ));
  return (
    <div className="w-[98%] md:w-[80%] mt-16 mx-auto py-8">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-exo font-semibold text-white">
          Frequently Asked Questions
        </h1>
      </div>
      <div className="bg-[#141313] p-2 rounded-md shadow-lg">
        <Accordion transitionDuration={500} className="py-2 md:p-4 mx-auto">
          {faqItems}
        </Accordion>
      </div>
    </div>
  );
};

import { testimonialsData } from "../Data/data";
import { Carousel } from "@mantine/carousel";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { Image } from "@mantine/core";

export const Testimonials = () => {
  const autoplay = useRef(Autoplay({ delay: 1500 }));

  return (
    <div className="py-12 mt-12 max-w-full overflow-hidden">
      {/* Section Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-exo font-semibold text-white">
          Testimonials
        </h1>
      </div>
      {/* Testimonials Carousel */}
      <div className="w-full lg:w-[80%] mx-auto px-4">
        <Carousel
          withIndicators
          slideSize={{ base: "100%", sm: "50%", md: "33.333333%" }}
          slideGap={{ base: "sm", sm: "md" }}
          plugins={[autoplay.current]}
          onMouseEnter={autoplay.current.stop}
          onMouseLeave={autoplay.current.reset}
          dragFree
          align="center"
          loop
          className="shadow-lg"
        >
          {testimonialsData.map((testimonial, index) => (
            <Carousel.Slide key={index}>
              <div className="bg-[#3c92d8] text-white p-4 rounded-lg shadow-lg flex flex-col items-center min-h-[250px] h-full">
                {/* Image Section */}
                <div className="w-24 h-24 sm:w-32 sm:h-32 mb-2 flex items-center justify-center overflow-hidden rounded-full border-2 border-violet-600 relative">
                  <Image
                    src={testimonial.image}
                    alt={`Teacher ${index + 1}`}
                    fit="cover"
                    className="w-full h-full object-cover"
                  />
                </div>
                {/* Text Content Section */}
                <h3 className="text-lg font-semibold mb-2">
                  {testimonial.name}
                </h3>
                <p className="text-sm sm:text-md text-gray-200 text-center">
                  {testimonial.review}
                </p>
              </div>
            </Carousel.Slide>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

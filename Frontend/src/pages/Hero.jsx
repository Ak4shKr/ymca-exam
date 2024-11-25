import {
  Accordion,
  Button,
  Card,
  Image,
  Input,
  SimpleGrid,
  Textarea,
} from "@mantine/core";
import { Carousel } from "@mantine/carousel";
import { Layout } from "../Layout";
import { useRef } from "react";
import Autoplay from "embla-carousel-autoplay";
import { motion } from "motion/react";

const Hero = () => {
  const autoplay = useRef(Autoplay({ delay: 1500 }));
  const features = [
    {
      icon: "src/assets/features/calendar.png",
      title: "Effortless Exam Scheduling",
      description:
        "Simplify exam scheduling with an intuitive interface that saves time and reduces manual work.",
    },
    {
      icon: "src/assets/features/clock.png",
      title: "Conflict-Free Timetables",
      description:
        "Automated conflict detection ensures no overlapping exams or resource clashes.",
    },
    {
      icon: "src/assets/features/edit.png",
      title: "Customizable Exam Plans",
      description:
        "Tailor exam schedules to specific requirements with easy-to-use customization tools..",
    },
    {
      icon: "src/assets/features/lock.png",
      title: "Secure Data Management",
      description:
        "Keep all exam schedules and student data safe with robust encryption and backup support.",
    },
  ];
  const faqs = [
    {
      emoji: "🔒",
      value: "Is authentication required?",
      description:
        "Yes, only verified users with official credentials can log in to ensure secure access to the scheduling system.",
    },
    {
      emoji: "📧",
      value: "Who can sign up?",
      description:
        "Only teachers with official institutional email addresses can register and access the platform, ensuring an exclusive space for faculty members.",
    },
    {
      emoji: "⏰",
      value: "Is the platform available 24/7?",
      description:
        "Absolutely! The platform is accessible 24/7, allowing you to schedule exams at your convenience, from anywhere.",
    },
    {
      emoji: "📅",
      value: "How does booking work?",
      description:
        "Booking is simple: just select the exam dates, times, and rooms, and the system will automatically reserve the schedule, preventing conflicts.",
    },
    {
      emoji: "👨‍💻",
      value: "Who developed this platform?",
      description:
        "This platform was developed by Akash Kumar, an ECE student, to streamline exam scheduling for educational institutions.",
    },
  ];

  const Testimonials = [
    {
      id: 1,
      name: "Dr. Ananya ",
      image: "src/assets/prof/teacher1.jpg",
      review: "Efficient and easy to use, saves hours of scheduling time!",
    },
    {
      id: 2,
      name: "Prof. Rajesh ",
      image: "src/assets/prof/teacher2.jpg",
      review: "Accessible anywhere, simplifies exam management significantly.",
    },
    {
      id: 3,
      name: "Dr. Meera ",
      image: "src/assets/prof/teacher3.jpg",
      review:
        "Visual schedules reduce confusion, making coordination seamless.",
    },
    {
      id: 4,
      name: "Prof. Joshi ",
      image: "src/assets/prof/teacher4.jpg",
      review: `"Hassle-free scheduling with intuitive features, highly recommend! "`,
    },
    {
      id: 5,
      name: "Mr. Poddar ",
      image: "src/assets/prof/teacher5.jpg",
      review: `"User-friendly and time-saving, perfect for managing complex schedules! "`,
    },
  ];

  const faqItems = faqs.map((item) => (
    <Accordion.Item key={item.value} value={item.value}>
      <Accordion.Control icon={item.emoji} className="text-white">
        {item.value}
      </Accordion.Control>
      <Accordion.Panel className="text-gray-300">
        {item.description}
      </Accordion.Panel>
    </Accordion.Item>
  ));

  return (
    <Layout>
      <div>
        {/* section1 */}
        <div className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen">
          {/* Text Content */}
          <div className="w-full md:w-[60%] text-white text-center md:text-left mb-8 md:mb-0 md:mx-auto">
            <h1 className="font-exo font-bold text-4xl mb-4">
              Hii{" "}
              <motion.span className="text-[#3f8ecf]">Professors,</motion.span>
            </h1>
            <h1 className="font-exo font-bold text-4xl mb-2">
              Let&apos;s schedule Exams on Your{" "}
              <motion.span
                // Scale text on hover

                className="text-violet-600"
              >
                Availability.
              </motion.span>
            </h1>
            <p className="md:w-[80%] mb-6">
              Simplify the way you manage exams with our intuitive scheduling
              platform, designed to keep you organized and prepared.
            </p>
            <div className="flex gap-4 justify-center md:justify-start">
              <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                <Button
                  className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-exo text-md px-6"
                  radius="md"
                >
                  <a href="/book-exam">Get Started</a>
                </Button>
              </motion.div>
              <motion.div whileHover={{ scale: 1.1 }}>
                <Button
                  className="hover:bg-blue-600 transition-all duration-300"
                  radius="md"
                >
                  Learn More
                </Button>
              </motion.div>
            </div>
          </div>

          {/* Image Section */}
          <div className="w-full md:w-[30%] flex justify-center md:justify-end md:mx-auto">
            <div className="bg-gradient-to-r from-violet-600 to-blue-500 p-1 rounded-lg">
              <Card shadow="sm" padding="xl" radius="md" withBorder>
                <motion.div
                  animate={{
                    y: [0, -20, 0], // Moves up and down
                  }}
                  transition={{
                    duration: 3, // Animation duration
                    repeat: Infinity, // Infinite loop
                    repeatType: "loop", // Repeats in a loop
                  }}
                >
                  <Image
                    src="/src/assets/hero/exam.png"
                    height={160}
                    alt="exam"
                    className="rounded-lg"
                  />
                </motion.div>
              </Card>
            </div>
          </div>
        </div>

        {/* section2 */}
        <div className="py-12 px-4 md:px-8 bg-dark text-white">
          {/* Section Heading */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-exo font-bold text-white">
              Why Choose Us
            </h1>
            <p className="text-gray-300 mt-2">
              Discover the features that make our platform the best choice for
              exam scheduling.
            </p>
          </div>

          {/* Cards Grid */}
          <div>
            <SimpleGrid
              cols={{ base: 1, sm: 2, lg: 4 }}
              spacing={{ base: 10, md: "xl" }}
              className="gap-6"
            >
              {features.map((feature, index) => (
                <Card
                  key={index}
                  whileHover={{ scale: 1.05 }}
                  shadow="sm"
                  radius="md"
                  withBorder
                  className="rounded-lg border border-gray-700 bg-gradient-to-tr from-[#3f4bd1] to-[#5e69e7] hover:scale-105 hover:border-2 hover:border-blue-600  cursor-pointer duration-300 ease-in-out"
                >
                  <Card.Section className="flex justify-center items-center py-8 bg-[#2f3136]">
                    <div
                      className="bg-cover bg-center rounded-t-lg"
                      style={{
                        backgroundImage: `url(${feature.icon})`, // Replace with actual image paths
                        height: "80px", // Set the height of the div
                        width: "80px", // Set the width of the div
                      }}
                    />
                  </Card.Section>
                  <div className="py-8 text-center">
                    <h2 className="text-lg font-semibold mb-2">
                      {feature.title}
                    </h2>
                    <p className="text-gray-400">{feature.description}</p>
                  </div>
                </Card>
              ))}
            </SimpleGrid>
          </div>
        </div>

        {/* section3 */}
        <div className="py-12 px-4 mt-12">
          {/* Section Title */}
          <div className="text-center mb-8">
            <h1 className="text-3xl font-exo font-bold text-white">
              Testimonials
            </h1>
          </div>

          {/* Testimonials Carousel */}
          <div className="w-full md:w-[70%] mx-auto">
            <Carousel
              withIndicators
              height={300}
              slideSize="50%"
              slideGap="md"
              plugins={[autoplay.current]}
              onMouseEnter={autoplay.current.stop}
              onMouseLeave={autoplay.current.reset}
              dragFree
              align="center"
              loop
              className="shadow-lg"
            >
              {Testimonials.map((testimonial, index) => (
                <Carousel.Slide key={index} style={{ marginRight: 10 }}>
                  <div className="bg-[#3c92d8] text-white p-6 rounded-lg shadow-lg flex flex-col items-center">
                    {/* Image Section */}
                    <div className="w-36 h-36 mb-4 flex items-center justify-center overflow-hidden rounded-full border-2 border-violet-600">
                      <Image
                        src={testimonial.image} // Replace with actual image paths
                        alt={`Teacher ${index + 1}`}
                        layout="fill"
                        objectFit="cover"
                      />
                    </div>
                    {/* Text Content Section */}
                    <h3 className="text-lg font-semibold mb-2">
                      {testimonial.name}
                    </h3>
                    <p className="text-md text-gray-200 text-center">
                      {testimonial.review}
                    </p>
                  </div>
                </Carousel.Slide>
              ))}
            </Carousel>
          </div>
        </div>

        {/* section4 */}

        <div className="w-[80%] mx-auto mt-16">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-exo font-bold text-white">
              Frequently Asked Questions
            </h1>
          </div>
          <div className="bg-[#141313] p-2 rounded-md shadow-lg">
            <Accordion
              transitionDuration={500}
              className="p-6 md:w-[85%] mx-auto"
            >
              {faqItems}
            </Accordion>
          </div>
        </div>
        {/* section5 */}
        <div className="w-[90%] mx-auto pt-12 mt-16">
          <div className="text-center mb-8">
            <h1 className="text-4xl font-exo font-bold text-white mb-4">
              Contact Us
            </h1>
            <p className="text-md font-exo text-white mt-1">
              We are honoured to receive your comments and suggestions. Please
              feel free to contact us:
            </p>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center bg-[#101010] px-6 py-8 rounded-lg shadow-xl">
            {/* Left Form */}
            <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
              {/* <h2 className="text-2xl font-exo font-bold text-white mb-6">
                Send Us A Message
              </h2> */}
              <form className="space-y-4 w-[90%] mx-auto">
                <div className="flex gap-4">
                  <Input.Wrapper label="Name" size="xs" className="w-1/2">
                    <Input
                      size="xs"
                      placeholder="Your Name"
                      className="text-white border-1 border-gray-600 focus:ring-indigo-500 rounded-md"
                    />
                  </Input.Wrapper>
                  <Input.Wrapper label="Email" size="xs" className="w-1/2">
                    <Input
                      size="xs"
                      placeholder="Your Email"
                      className="text-white border-1 border-gray-600 focus:ring-indigo-500 rounded-md"
                    />
                  </Input.Wrapper>
                </div>
                <div>
                  <Textarea
                    size="xs"
                    label="Comments"
                    placeholder="Write your query.."
                    className="text-white border-1 border-gray-600 focus:ring-indigo-500 rounded-md"
                  />
                </div>
                <Button
                  variant="filled"
                  color="indigo"
                  className="w-full mt-8 py-1 text-md font-semibold hover:bg-indigo-700 transition duration-300"
                >
                  Report
                </Button>
              </form>
            </div>

            {/* Right Contact Info */}
            <div className="w-full lg:w-[48%] text-white flex-col items-center justify-center">
              <div className="w-full md:w-[60%] mx-auto space-y-6">
                <h2 className="text-2xl font-exo font-bold mb-4">
                  Get In Touch
                </h2>
                <div className="space-y-2">
                  <p>
                    <span className="font-semibold">Email:</span>{" "}
                    <a
                      href="mailto:akashsahabanaul@gmail.com"
                      className="text-indigo-400 hover:text-indigo-300"
                    >
                      akashsahabanaul@gmail.com
                    </a>
                  </p>
                  <p>
                    <span className="font-semibold">Phone:</span>{" "}
                    <a className="text-indigo-400 hover:text-indigo-300">
                      +91 76670 XXXXX
                    </a>
                  </p>
                </div>

                {/* Social Media Icons */}
                <div className="flex gap-6">
                  <a
                    href="https://www.linkedin.com/in/akash-saha-cod/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/src/assets/icons/linkedin.png"
                      alt="LinkedIn"
                      className="w-10 h-10 rounded-full p-2 bg-gray-600 hover:bg-gray-500 transition-all"
                    />
                  </a>
                  <a
                    href="https://github.com/ak4shkr"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/src/assets/icons/github.png"
                      alt="GitHub"
                      className="w-10 h-10 rounded-full p-2 bg-gray-700 hover:bg-gray-600 transition-all"
                    />
                  </a>
                  <a
                    href="https://x.com/akash_saha14"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <img
                      src="/src/assets/icons/twitter.png"
                      alt="Twitter"
                      className="w-10 h-10 rounded-full p-2 bg-gray-700 hover:bg-gray-600 transition-all"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer - Copyright */}
          <div className="text-center text-sm text-gray-400 mt-12">
            <p>&copy; {new Date().getFullYear()} YMCA. All Rights Reserved.</p>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Hero;

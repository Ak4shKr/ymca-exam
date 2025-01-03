import { Button, Card, Image } from "@mantine/core";
import { motion } from "motion/react";
import { Link } from "react-router-dom";

export const Landing = () => {
  return (
    <div className="flex flex-col-reverse md:flex-row items-center justify-center min-h-[94vh] md:px-8 py-8 md:py-0 gap-12 md:gap-12">
      {/* Text Content */}
      <div className="w-full md:w-[60%] text-white text-center md:text-left">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="font-exo font-bold text-4xl md:text-3xl mb-4">
            Hii{" "}
            <motion.span className="text-[#09b8ff]">Professors,</motion.span>
          </h1>
          <h1 className="font-exo font-bold text-3xl md:text-3xl mb-4">
            Let&apos;s schedule Exams on Your{" "}
            <motion.span className="text-[#833bdb]">Availability.</motion.span>
          </h1>
          <p className="text-base md:text-md mb-8 max-w-[600px] mx-auto md:mx-0 text-gray-300">
            Simplify the way you manage exams with our intuitive scheduling
            platform, designed to keep you organized and prepared.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                className="bg-indigo-600 hover:bg-indigo-700 transition-all duration-300 font-exo px-4 py-2 text-base"
                radius="md"
              >
                <Link to="/book-exam">Get Started</Link>
              </Button>
            </motion.div>
            <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
              <Button
                className="hover:bg-blue-600 transition-all duration-300 px-4 py-2 text-base"
                radius="md"
              >
                Learn More
              </Button>
            </motion.div>
          </div>
        </motion.div>
      </div>

      {/* Image Section */}
      <div className="w-[85%] sm:w-[70%] md:w-[30%] max-w-[400px]">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
        >
          <div className="bg-gradient-to-r from-violet-600 to-blue-500 p-[2px] rounded-lg">
            <Card shadow="sm" padding="xl" radius="md" withBorder>
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  repeatType: "loop",
                }}
              >
                <Image
                  src="/Hero/exam.png"
                  height={200}
                  alt="exam"
                  className="rounded-lg"
                />
              </motion.div>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

import { Button, Input, Textarea } from "@mantine/core";
import { notifications } from "@mantine/notifications";
import service from "../httpd/service";
import { useState } from "react";

export const Contact = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const handleNameChange = (e) => setName(e.target.value);
  const handleEmailChange = (e) => setEmail(e.target.value);
  const handleCommentChange = (e) => setComment(e.target.value);

  //handle contactUs form
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = {
      name,
      email,
      comment,
    };
    try {
      setLoading(true);
      const response = await service.post("/report", formData);
      // console.log(response.data);
      if (response.status === 200) {
        notifications.show({
          title: "Reported",
          message: "Your feedback has been submitted successfully.",
          color: "green",
        });
        setName("");
        setEmail("");
        setComment("");
      }
    } catch (error) {
      notifications.show({
        title: "Error",
        message: error.response.data.error || "Something went wrong",
        color: "red",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="md:w-[90%] mx-auto pt-12 mt-16">
      <div className="text-center mb-8">
        <h1 className="text-3xl  font-exo font-semibold text-white mb-2">
          Contact Us
        </h1>
        <p className="text-sm px-2 font-exo text-white mt-1">
          We are honoured to receive your comments and suggestions. Please feel
          free to contact us:
        </p>
      </div>

      <div className="flex flex-col lg:flex-row justify-between items-center bg-[#101010] px-2 md:px-6 py-8 rounded-lg shadow-xl">
        {/* Left Form */}
        <div className="w-full lg:w-1/2 mb-8 lg:mb-0">
          {/* <h2 className="text-2xl font-exo font-bold text-white mb-6">
                Send Us A Message
              </h2> */}
          <form className="space-y-4 w-[90%] mx-auto" onSubmit={handleSubmit}>
            <div className="flex gap-2 md:gap-4">
              <Input.Wrapper label="Name" size="xs" className="w-1/2">
                <Input
                  size="xs"
                  placeholder="Your Name"
                  value={name}
                  onChange={handleNameChange}
                  required
                  className="text-white border-1 border-gray-600 focus:ring-indigo-500 rounded-md"
                />
              </Input.Wrapper>
              <Input.Wrapper label="Email" size="xs" className="w-1/2">
                <Input
                  size="xs"
                  placeholder="Your Email"
                  value={email}
                  onChange={handleEmailChange}
                  className="text-white border-1 border-gray-600 focus:ring-indigo-500 rounded-md"
                />
              </Input.Wrapper>
            </div>
            <div>
              <Textarea
                size="xs"
                label="Comments"
                value={comment}
                onChange={handleCommentChange}
                placeholder="Write your query.."
                required
                className="text-white border-1 border-gray-600 focus:ring-indigo-500 rounded-md"
              />
            </div>

            <Button
              variant="filled"
              color="indigo"
              type="submit"
              size="xs"
              className="w-full mt-8 py-1 text-md font-semibold hover:bg-indigo-700 transition duration-300"
            >
              {loading ? "Reporting..." : "Report"}
            </Button>
          </form>
        </div>

        {/* Right Contact Info */}
        <div className="w-full lg:w-[48%] text-white px-2">
          <div className="w-full md:w-[80%] lg:w-[70%] mx-auto space-y-4">
            <h2 className="text-xl font-exo font-semibold mb-4">
              Get In Touch
            </h2>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-semibold">Email:</span>{" "}
                <a
                  href="mailto:akashsahabanaul@gmail.com"
                  className="text-indigo-400 hover:text-indigo-300 transition-colors"
                >
                  akashsahabanaul@gmail.com
                </a>
              </p>
              <p className="text-sm">
                <span className="font-semibold">Phone:</span>{" "}
                <a className="text-indigo-400 hover:text-indigo-300 transition-colors">
                  +91 76670 XXXXX
                </a>
              </p>
            </div>

            {/* Social Media Icons */}
            <div className="flex gap-6 justify-center md:justify-start mt-8">
              <a
                href="https://www.linkedin.com/in/akash-saha-cod/"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/linkedin.png"
                  alt="LinkedIn"
                  className="w-9 h-9 rounded-full p-2.5 bg-gray-600 hover:bg-gray-500 transition-all"
                />
              </a>
              <a
                href="https://github.com/ak4shkr"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/github.png"
                  alt="GitHub"
                  className="w-9 h-9 rounded-full p-2.5 bg-gray-700 hover:bg-gray-600 transition-all"
                />
              </a>
              <a
                href="https://x.com/akash_saha14"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img
                  src="/icons/twitter.png"
                  alt="Twitter"
                  className="w-9 h-9 rounded-full p-2.5 bg-gray-700 hover:bg-gray-600 transition-all"
                />
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Footer - Copyright */}
      <div className="text-center text-sm text-gray-400 mt-12 ">
        <p>&copy; {new Date().getFullYear()} YMCA. All Rights Reserved.</p>
      </div>
    </div>
  );
};

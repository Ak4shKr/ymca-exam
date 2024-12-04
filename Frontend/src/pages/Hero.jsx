import { Landing } from "../Hero/Landing.jsx";
import { Features } from "../Hero/Features.jsx";
import { Testimonials } from "../Hero/Testimonials.jsx";
import { Faqs } from "../Hero/Faqs.jsx";
import { Contact } from "../Hero/Contact.jsx";
import { Layout } from "../Layout.jsx";

const Hero = () => {
  return (
    <>
      <Layout>
        <Landing />
        <Features />
        <Testimonials />
        <Faqs />
        <Contact />
      </Layout>
    </>
  );
};

export default Hero;

import React from "react";
import Intro from "../components/About/Intro";
import Mission from "../components/About/Mission";
import Description from "../components/About/Description";
import Team from "../components/About/Team";
import Walkthrough from "../components/About/Walkthrough";
import Footer from "../layout/Footer";
import JoinUs from "../components/About/Join_us";
import Involvement from "../components/About/Involvement";

const About = () => {
  return (
    <div>
    <div className="lg:ml-[130px] lg:mr-12 relative bg-nightModeDark text-white">
          <Intro />
          <Mission />
          <Description />
          <Walkthrough />
          <JoinUs />
          <Team />
          <Involvement />
      </div>
      <Footer/>
    </div>
  );
};

export default About;

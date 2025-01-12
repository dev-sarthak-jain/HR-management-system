import React from "react";
import { Avatar } from "../index";
import teamMembers from "../../mockups/Home/teamMembers";

const TeamInfo = () => {
  return (
    <div className="py-8 bg-backgroundColor">
      <h1 className="text-3xl text-purpleCustom text-center font-bold font-inter">
        Meet the <span className="text-black font-inter">Team</span>{" "}
      </h1>
      <div className="max-w-4xl mx-auto px-4 mt-10 flex justify-around">
        {teamMembers.map((member, index) => (
          <Avatar {...member} key={index} />
        ))}
      </div>
    </div>
  );
};

export default TeamInfo;

import React from "react";
import { PiPencilSimpleLineThin } from "react-icons/pi";
import { FaSearch } from "react-icons/fa";
import { BsChatRightDots } from "react-icons/bs";

const chatData = [
  {
    icon: <FaSearch className="mx-auto" />,
    mainPrompt: "Discover",
    prompt1: "What are the differnet classes of employee working at our organization",
    prompt2: "Tell me how can we reduce attrition in our organization",
  },
  {
    icon: <PiPencilSimpleLineThin className="mx-auto" />,
    mainPrompt: "Ask",
    prompt1:
      "what is the avergae salary of employees here",
    prompt2: "Tell me about the employees with age more than 40 and which departments are they working in",
  },
  {
    icon: <BsChatRightDots className="mx-auto" />,
    mainPrompt: "Chats",
    prompt1: "What is your role",
    prompt2: "how can you assist me",
  },
];

export default chatData;

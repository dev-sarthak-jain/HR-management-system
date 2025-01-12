import React from "react";
import { CiMicrophoneOn } from "react-icons/ci";
import { VscSend } from "react-icons/vsc";

const ChatPrompt = ({
  submitPrompt,
  value,
  handleChange,
  currentMode,
  position,
  placeholder,
  bgOnDark,
}) => {
  return (
    <div
      className={`flex justify-center px-3 py-2 ${position} w-full bottom-0 z-10 ${
        !currentMode ? `bg-white text-black` : `${bgOnDark} text-white`
      }`}
    >
      <form action="" className="relative w-full">
        <input
          className={`outline-none px-5 py-4 mx-auto w-full rounded-full ${
            !currentMode && `bg-chatTipBackground `
          } text-black border-white`}
          type="text"
          value={value}
          onChange={handleChange}
          name=""
          id=""
          placeholder={placeholder}
        />
        <CiMicrophoneOn
          className={`inline absolute right-10 bottom-4 text-xl text-black `}
        />
        <button
          type="submit"
          onClick={submitPrompt}
          className={`inline absolute right-3 bottom-4 text-xl text-black `}
        >
        {/* Send icon */}
          <VscSend />
        </button>
      </form>
    </div>
  );
};

export default ChatPrompt;

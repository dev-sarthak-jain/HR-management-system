import React from "react";

const Faq = ({ question, answer }) => {
  return (
    <div className="mx-5 my-5">
      <h1 className="text-lg sm:text-xl text-cardBackground font-bold font-inter">
        {question}
      </h1>
      <p className="text-md mt-5 text-white font-inter">{answer}</p>
    </div>
  );
};

export default Faq;

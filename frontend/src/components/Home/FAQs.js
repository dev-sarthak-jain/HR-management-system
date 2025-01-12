import React from "react";
import Faq from "../../components/common/Faq";
import Footer from "../../layout/Footer";
import faqs from "../../mockups/Home/faqs";

const FAQs = () => {
  return (
    <>
      <div className="w-full sm:w-[95%] lg:ml-4 py-3 bg-black border border-white rounded-l-md my-8">
        <div className="mx-auto px-4">
          <h1 className="text-3xl text-white text-center font-bold font-inter mt-10 mb-2">
            Got <span className="text-white font-inter">Questions?</span>
          </h1>
          <div className="md:flex">
            {faqs.slice(0, -2).map((faq, index) => (
              <Faq key={index} {...faq} />
            ))}
          </div>
          <div className="md:flex">
            {faqs.slice(-2).map((faq, index) => (
              <Faq key={index} {...faq} />
            ))}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FAQs;

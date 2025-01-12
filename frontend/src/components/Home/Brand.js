import React from "react";
import { mediaBoard } from "../../mockups";
import { Link } from "react-router-dom";

const Brand = () => {
  return (
    <div>
      <div className="grid 2xl:grid-cols-11">
        <div className="2xl:col-span-1"></div>
        <div className="2xl:col-span-4">
          <div className="p-4 lg:mx-36 mt-10">
            <div
              className="text-left rounded-lg"
              id="about"
              role="tabpanel"
              aria-labelledby="about-tab"
            >
              <h2 className="text-center sm:text-left text-xl sm:text-4xl font-bold mx-2.5 my-3  text-white">
                {mediaBoard.title} {mediaBoard.subtitle}
              </h2>
              <p className="text-center sm:text-left m-3 inter-justify text-gray-200 sm:text-xl">{mediaBoard.desc}</p>
              <Link
                to="/about"
                className="mx-3 inline-flex font-medium text-blue-600 hover:text-blue-800 dark:text-blue-500 dark:hover:text-blue-700"
              >
                Learn more
                <svg
                  className="w-2.5 h-2.5 ml-2"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 6 10"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 9 4-4-4-4"
                  />
                </svg>
              </Link>
            </div>
          </div>
        </div>
        <div className="2xl:col-span-5 py-4 lg:mx-36 lg:mt-10">
          <div className="relative col-span-2">
            <div className="mb-8 group cursor-pointer transition-transform transform duration-1000 hover:scale-105">
              <Link to={'/chat'}>
              <img
                src="./assets/img/chatbot-front.png"
                alt="img"
                className="w-full h-auto"
              />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Brand;

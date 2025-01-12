import React from "react";
import Form from "../components/SignIn/Form";
import Footer from "../layout/Footer";

const SignIn = () => {
  return (
    <div>
    <div className="h-100 grid md:grid-cols-2 grid-flow-row gap-4 my-10 mx-5 lg:mx-60 bg-white rounded-lg">
      <div>
        <div className="flex flex-col justify-center px-8 md:pl-16 md:py-36">
          <div className="text-center">
            <h1 className="text-3xl md:text-5xl font-bold my-4">
              Your Journey
            </h1>
            <span className="text-3xl md:text-5xl font-bold">Starts Here</span>
          </div>

          <div className="md:pr-5">
            <p className="mt-5 ml-5 text-base md:text-lg">
            At NeuralNiti, we are dedicated to transforming the interaction between human resources
            departments and employees by leveraging advanced artificial intelligence. Our bot is
            designed to respond to employee needs effectively, streamline HR processes.
            </p>
          </div>
        </div>
      </div>
      <div>
        <div className="mb-5 md:mt-9 md:mr-14 bg-[#000000] border-white rounded-lg">
          <div>
            <div className="p-8 pt:8 md:pt-16 text-white">
              <h1 className="text-2xl md:text-4xl text-center font-bold mb-2 md:mb-5">
                Welcome Back!
              </h1>
              <p className="text-center text-sm md:text-base">
                Please Sign in to Continue.
              </p>
            </div>

            <Form />
          </div>
        </div>
      </div>

    </div>
    <Footer />
    </div>
  );
};

export default SignIn;

import { getNameList } from "country-list";
import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signupUser } from "../store/auth/action";
import Footer from "../layout/Footer";

const SignUp = () => {
  const countryList = getNameList();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [error, setError] = useState(false);

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    data.password !== data.confirmPassword
    ? setError(true)
    : dispatch(signupUser({ ...data, navigate }));
    // reset()
  };
  return (
    <div>
    <div className="min-h-screen flex items-center justify-center bg-backgroundColor py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl w-full bg-white p-5 rounded-md">
        <div className="bg-[#000000] rounded-md p-5">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-white">
            Sign Up
          </h2>

          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="sm:mb-6 grid sm:grid-cols-2 sm:mt-10 sm:space-x-9 space-y-4 sm:space-y-0">
              <div className="col-span-1">
                <label
                  htmlFor="email"
                  className="block mb-2 text-md font-medium text-white"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  {...register("email")}
                  className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="name@flowbite.com"
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="password"
                  className="block mb-2 text-md font-medium text-white dark:text-white"
                >
                  Password
                </label>
                <input
                  type="password"
                  id="password"
                  {...register("password")}
                  className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  required
                />
              </div>
            </div>
            <div className="sm:mb-6 grid sm:grid-cols-2 sm:mt-10 sm:space-x-9  space-y-4 sm:space-y-0">
              <div className="col-span-1">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-md font-medium text-white"
                >
                  First Name
                </label>
                <input
                  type="text"
                  id="firstName"
                  {...register("firstName")}
                  className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder=""
                  required
                />
              </div>
              <div className="col-span-1">
                <label
                  htmlFor="confirmPassword"
                  className="block mb-2 text-md font-medium text-white"
                >
                  Confirm Password
                </label>
                <input
                  type="password"
                  id="confirmPassword"
                  {...register("confirmPassword")}
                  className={`${error ? "border-2 border-red-500" : "bg-gray-50 border border-gray-300"} text-black text-md rounded-lg block w-full p-2.5"`}
                  required
                />
                {error && (
                  <p
                    id="filled_error_help"
                    className="mt-2 text-xs text-red-600 dark:text-red-400"
                  >
                    <span className="font-medium">Password doesn't match.</span>
                  </p>
          )}
              </div>
            </div>
            <div className="sm:mb-6 grid sm:grid-cols-2 sm:mt-10 sm:space-x-9  space-y-4 sm:space-y-0">
              <div className="col-span-1">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-md font-medium text-white"
                >
                  Last Name
                </label>
                <input
                  type="text"
                  id="lastName"
                  {...register("lastName")}
                  className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder=""
                  required
                />
              </div>
              <div className="col-span-1">
                <div className="grid grid-cols-3">
                  <div className="col-span-1">
                    <label
                      htmlFor="country"
                      className="block mb-2 text-md font-medium text-white"
                    >
                      Country
                    </label>
                    <select
                      id="country"
                      name="country"
                      {...register("country")}
                      className="p-2 border rounded-md w-full h-12"
                      required
                    >
                      {/* Map the countryList object to create options */}
                      {Object.keys(countryList).map((countryName) => (
                        <option key={countryName} value={countryName}>
                          {capitalizeFirstLetter(countryName)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div className="col-span-1 mx-1">
                    <label
                      htmlFor="state"
                      className="block mb-2 text-md font-medium text-white"
                    >
                      State
                    </label>
                    <input
                      type="text"
                      id="state"
                      {...register("state")}
                      className="h-12 bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder=""
                      required
                    />
                  </div>
                  <div className="col-span-1">
                    <label
                      htmlFor="city"
                      className="block mb-2 text-md font-medium text-white"
                    >
                      City
                    </label>
                    <input
                      type="text"
                      id="city"
                      {...register("city")}
                      className="h-12 bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                      placeholder=""
                      required
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-6 grid sm:grid-cols-2 sm:mt-10 sm:space-x-9  space-y-4 sm:space-y-0 sm:justify-center sm:items-end">
              <div className="col-span-1">
                <label
                  htmlFor="phone_number"
                  className="block mb-2 text-md font-medium text-white"
                >
                  Phone Number
                </label>
                <input
                  type="text"
                  id="phone_number"
                  {...register("phone_number")}
                  className="bg-gray-50 border border-gray-300 text-black text-md rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder=""
                />
              </div>
              <div className="col-span-1 flex justify-end">
                <button
                  type="button"
                  onClick={() => (window.location.href = "/")}
                  className="text-white bg-[#868BC7] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center mr-3"
                >
                  Back
                </button>
                <button
                  type="submit"
                  className="text-white bg-[#868BC7] hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-md w-full sm:w-auto px-5 py-2.5 text-center "
                >
                  Submit
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    <Footer />
    </div>
  );
};

export default SignUp;

import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import { login } from "../../store/auth/action";
import { Link, useNavigate } from "react-router-dom";

// import { getError } from "../../store/auth/selectors";

const Form = () => {
  const { register, handleSubmit, reset  } = useForm();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const error = useSelector(getError);
  const onSubmit = async (data) => {
    // console.log(data);
    dispatch(login({ ...data, navigate }));
    reset()
  };
  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)} className="mt-5 px-8 pb-5">
        <div className="mb-6">
          <label
            htmlFor="email"
            className="block mb-2 text-xs md:text-sm font-medium text-white"
          >
            Email
          </label>
          <input
            id="email"
            {...register("email")}
            className="bg-gray-50 border border-gray-300 text-black text-xs md:text-sm rounded-lg block w-full p-2.5"
            placeholder="name@policyWeb.com"
            required
          />
        </div>
        <div className="mb-6">
          <label
            htmlFor="password"
            className="block mb-2 text-xs md:text-sm font-medium text-white"
          >
            Password
          </label>
          <input
            type="password"
            {...register("password")}
            id="password"
            className="bg-gray-50 border border-gray-300 text-black text-xs md:text-sm rounded-lg block w-full p-2.5"
            required
          />
        </div>
        <div className="flex items-start mb-6">
          <div className="flex items-center h-5">
            <input
              id="remember"
              type="checkbox"
              value=""
              className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-purple-300" /*dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-purple-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 */
            />
          </div>
          <label
            htmlFor="remember"
            className="ml-2 text-xs md:text-sm font-medium text-gray-200" /*dark:text-gray-300*/
          >
            Remember me
          </label>
        </div>
        <button
          type="submit"
          className="md:flex md:ml-auto text-white bg-[#868BC7] hover:bg-purple-800 focus:ring-4 focus:outline-none focus:ring-purple-300 font-medium rounded-lg text-xs md:text-sm w-full sm:w-auto px-5 py-2.5 text-center" /* dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800 */
        >
          Sign In
        </button>
        <p className="text-white mt-7 font-extralight">
        Don't have an account? <Link to="/signup" className="font-bold text-[#868BC7]">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Form;

import {
  clearAuth,
  setAuth,
  signupFailure,
  signupStart,
} from "./slice";
// import { user as users } from "./../../mockups";
// import jwtEncode from "jwt-encode";
import { toast } from "react-toastify";
import { SERVER_URL } from "../../config/config";


export const login = ({ email, password, navigate }) => async (dispatch) => {
    toast.loading("Processing...")
    try {
      const response = await fetch(`${SERVER_URL}/api/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password
        })
      });
      if (!response.ok) {
        toast.dismiss()
        toast.error("Invalid Credentials, Login Failed!");
      }else{

        const data = await response.json();
        if (data) {
          toast.dismiss()
          navigate("/");
          toast.success("Login Success.");
        }
        dispatch(setAuth({ data }));
      }

    } catch (error) {
      toast.dismiss()
      toast.error("Network Error!");
      navigate("/signin");
    }
};


export const signout =
  ({ navigate }) =>
  async (dispatch) => {
    dispatch(clearAuth());
    navigate("/");
  };


export const signupUser = ({email, password, firstName, lastName,phone_number, country, state, city, navigate}) => async (dispatch) => {
  toast.loading("Processing...")
  dispatch(signupStart());

  try {
    const response = await fetch(`${SERVER_URL}/api/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        first_name: firstName,
        last_name: lastName,
        email: email,
        password: password,
        phone_number: phone_number,
        country: country,
        state: state,
        city: city,
      })
    });


    if (!response.ok) {
      toast.dismiss()
      throw new Error("Signup failed");
    }

    const data = await response.json();

    if (data && data?.data !== null) {
      toast.dismiss()
      navigate("/signin");
      toast.success(`${data?.message}`);
    } else {
      toast.dismiss()
      toast.error(`${data?.message}`);
    }
  } catch (error) {
    toast.dismiss()
    dispatch(signupFailure(error.message));
    toast.error(error.message);
  }
};

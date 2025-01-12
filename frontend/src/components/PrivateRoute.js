import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { getUser } from "../store/auth/selectors";

const PrivateRoute = ({ children }) => {
  const user = useSelector(getUser);

  if (!user) {
    // not logged in so redirect to login page with the return url
    return <Navigate to="/signin" />;
  }

  // authorized so return child components
  return children;
};

export default PrivateRoute;

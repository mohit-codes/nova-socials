import { Redirect } from "@reach/router";
import { useSelector } from "react-redux";

const PrivateRoute = ({ component: Component, path }) => {
  const isUserLoggedIn = useSelector((state) => state.user.isUserLoggedIn);
  return !isUserLoggedIn ? (
    <Redirect from="" to="/" noThrow />
  ) : (
    <Component path={path} />
  );
};

export default PrivateRoute;

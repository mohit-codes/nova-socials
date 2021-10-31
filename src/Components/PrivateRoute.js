import { Redirect } from "@reach/router";
import { useAuth } from "../Context/authProvider";

const PrivateRoute = ({ component: Component, path }) => {
  const { user } = useAuth();
  return user == null ? (
    <Redirect from="" to="/" noThrow />
  ) : (
    <Component path={path} />
  );
};

export default PrivateRoute;

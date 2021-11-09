import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import LoadingPage from "./LoadingPage";

const PrivateRoute = () => {
  const userState = useSelector((state) => state.user);
  const initialLoading = useSelector((state) => state.user.initialLoading);

  if (initialLoading) {
    return <LoadingPage />;
  }

  if (userState.isUserLoggedIn) {
    return <Outlet />;
  }

  return <Navigate to="/" replace />;
};

export default PrivateRoute;

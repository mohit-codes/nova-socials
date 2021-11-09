import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute";
import { setUserFromLocalStorage } from "./features/user/userSlice";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Route, Routes } from "react-router-dom";

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, []);

  return (
    <div className="App h-screen">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/home" element={<PrivateRoute />}>
          <Route path="/home" element={<Home />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

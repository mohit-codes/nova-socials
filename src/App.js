import { useEffect } from "react";
import { useDispatch } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute";
import { setUserFromLocalStorage } from "./features/user/userSlice";
import {
  Home,
  Login,
  Notification,
  Signup,
  Profile,
  Messages,
  PostInfo,
} from "./Pages/index";
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
        <Route path="/notifications" element={<PrivateRoute />}>
          <Route path="/notifications" element={<Notification />} />
        </Route>
        <Route path="/profile/:userId" element={<PrivateRoute />}>
          <Route path="/profile/:userId" element={<Profile />} />
        </Route>
        <Route path="/messages" element={<PrivateRoute />}>
          <Route path="/messages" element={<Messages />} />
        </Route>
        <Route path="/post/:postId" element={<PrivateRoute />}>
          <Route path="/post/:postId" element={<PostInfo />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;

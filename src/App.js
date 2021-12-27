import React, { useEffect, Suspense } from "react";
import { useDispatch } from "react-redux";
import PrivateRoute from "./Components/PrivateRoute";
import { setUserFromLocalStorage } from "./features/user/userSlice";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import { Route, Routes } from "react-router-dom";
import { socket, SocketContext } from "./SocketContext/socketContext";
import LoadingPage from "./Components/LoadingPage";

const Home = React.lazy(() => import("./Pages/Home"));
const Explore = React.lazy(() => import("./Pages/Explore"));
const Profile = React.lazy(() => import("./Pages/Profile"));
const Messages = React.lazy(() => import("./Pages/Messages"));
const PostInfo = React.lazy(() => import("./Pages/PostInfo"));
const Notification = React.lazy(() => import("./Pages/Notification"));
const Chats = React.lazy(() =>
  import("./Components/MessagesPageComponents/Chats")
);

function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(setUserFromLocalStorage());
  }, []);

  return (
    <SocketContext.Provider value={socket}>
      <Suspense fallback={<LoadingPage />}>
        <div className="App h-screen">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/home" element={<PrivateRoute />}>
              <Route path="/home" element={<Home />} />
            </Route>
            <Route path="/explore" element={<PrivateRoute />}>
              <Route path="/explore" element={<Explore />} />
            </Route>
            <Route path="/notifications" element={<PrivateRoute />}>
              <Route path="/notifications" element={<Notification />} />
            </Route>
            <Route path="/profile/:userId" element={<PrivateRoute />}>
              <Route path="/profile/:userId" element={<Profile />} />
            </Route>
            <Route path="/messages" element={<PrivateRoute />}>
              <Route path="/messages" element={<Messages />}>
                <Route path=":id" element={<Chats />} />
              </Route>
            </Route>
            <Route path="/post/:postId" element={<PrivateRoute />}>
              <Route path="/post/:postId" element={<PostInfo />} />
            </Route>
          </Routes>
        </div>
      </Suspense>
    </SocketContext.Provider>
  );
}

export default App;

import { Router } from "@reach/router";
import PrivateRoute from "./Components/PrivateRoute";
import Home from "./Pages/Home";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";

function App() {
  return (
    <div className="App h-screen">
      <Router>
        <Login path="/" />
        <Signup path="signup" />
        <PrivateRoute component={Home} path="home" />
      </Router>
    </div>
  );
}

export default App;

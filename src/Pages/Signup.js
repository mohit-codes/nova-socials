import { useState } from "react";
import { Input, Label } from "../Components/FormComponents";
import { useAuth } from "../Context/authProvider";

const Signup = () => {
  const { signupUserWithCredentials } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const signupHandler = async (event) => {
    event.preventDefault();
  };
  return (
    <div className="h-screen flex justify-center">
      <div className="text-center mt-40">
        <h1 className="text-5xl font-semibold">Nova Socials</h1>
        <div className="bg-gray-200 p-4 text-left rounded-md">
          <form onSubmit={signupHandler}>
            <div>
              <Label htmlFor="name" labelText="Name" id="name-input-title" />
              <Input
                value={name}
                id="name"
                placeholder="Name"
                ariaLabelledBy="name-input-title"
                callback={setName}
              />
            </div>
            <div>
              <Label
                htmlFor="username"
                labelText="Username"
                id="username-input-title"
              />
              <Input
                id="username"
                placeholder="Username"
                ariaLabelledBy="username-input-title"
                value={username}
                callback={setUsername}
              />
            </div>
            <div>
              <Label
                htmlFor="password"
                id="password-input-title"
                labelText="Password"
              />
              <Input
                id="password"
                placeholder="Password"
                ariaLabelledBy="password-input-title"
                value={password}
                callback={setPassword}
              />
            </div>
            <div>
              <Label
                htmlFor="confirmPassword"
                id="confirmPassword-input-title"
                labelText="Confirm Password"
              />
              <Input
                placeholder="Password"
                id="confirmPassword"
                ariaLabelledBy="confirmPassword-input-title"
                value={confirmPassword}
                callback={setConfirmPassword}
              />
            </div>
            <button type="submit">Signup</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

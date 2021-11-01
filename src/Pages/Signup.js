import { navigate } from "@reach/router";
import { useState } from "react";
import { Input, Label } from "../Components/FormComponents";
import { useAuth } from "../Context/authProvider";

const Signup = () => {
  const { signupUserWithCredentials, validateEmail } = useAuth();
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const matchPassword = confirmPassword === password;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  const signupHandler = async (event) => {
    event.preventDefault();
    setError("");
    if (
      name === "" ||
      username === "" ||
      email === "" ||
      password === "" ||
      confirmPassword === ""
    ) {
      setError("All fields are required!");
      return;
    }
    if (!validateEmail(email)) {
      setError("Please enter a valid email");
      return;
    }
    if (!isPasswordValid) {
      setError(
        "Password must be 8 characters long, have one upper and lower case character and one number."
      );
      return;
    }
    if (!matchPassword) {
      setError("Both passwords must be same");
      return;
    }
    setLoading(true);
    const { message, success } = await signupUserWithCredentials(
      username,
      name,
      email,
      password
    );
    setLoading(false);
    if (success) {
      navigate("home");
      return;
    }
    setError(message);
  };
  return (
    <div className="h-screen flex justify-center back">
      <div className="text-center mt-14">
        <h1 className="text-5xl font-semibold mb-4">Nova Socials</h1>
        {error !== "" && (
          <p className="text-red-600 font-medium max-w-sm">{error}</p>
        )}
        <div className="bg-gray-200 p-4 text-left rounded-md mt-2 shadow-lg">
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
              <Label htmlFor="email" labelText="Email" id="email-input-title" />
              <Input
                callback={setEmail}
                placeholder="Email"
                value={email}
                id="email"
                ariaLabelledBy="email-input-title"
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
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-blue-500 text-white px-3 py-2 rounded-md mt-2 w-36 font-semibold shadow-md"
              >
                {!loading ? "Signup" : "Signing In..."}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;

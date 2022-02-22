import { useState } from "react";
import { Input, Label } from "../Components/FormComponents";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { signupUserAsync } from "../features/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { validateEmail } from "../utils/utility";
import { useNavigate } from "react-router-dom";
import useDocumentTitle from "../hooks/useDocumentTitle";

const Signup = () => {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, errorMessage } = useSelector((state) => state.user);

  const matchPassword = confirmPassword === password;
  const isEmptyFields =
    !name.trim().length ||
    !username.trim().length ||
    !email.trim().length ||
    !password.trim().length;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  useDocumentTitle("Sign up | Nova Socials");

  const signupHandler = async (event) => {
    event.preventDefault();
    setError("");
    if (isEmptyFields) {
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
    const { meta } = await dispatch(
      signupUserAsync({
        username,
        name,
        email,
        password,
      })
    );
    if (meta.requestStatus === "fulfilled") {
      navigate("/home");
    }
  };

  return (
    <div className="h-screen flex justify-center back">
      <div className="text-center mt-14">
        <h1 className="text-5xl font-semibold mb-4">Nova Socials</h1>
        {error !== "" && (
          <p className="text-red-600 font-medium max-w-sm">{error}</p>
        )}
        {errorMessage !== "" && (
          <p className="text-red-600 font-medium max-w-sm">{errorMessage}</p>
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
                callback={(e) => setName(e.target.value)}
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
                callback={(e) => setUsername(e.target.value)}
              />
            </div>
            <div>
              <Label htmlFor="email" labelText="Email" id="email-input-title" />
              <Input
                callback={(e) => setEmail(e.target.value)}
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
              <div className="border-2 border-gray-400 bg-white rounded-md flex items-center">
                <input
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                  placeholder="Password"
                  id="password"
                  value={password}
                  type={showPassword ? "text" : "password"}
                  className="bg-transparent rounded-md w-11/12 p-2 focus:outline-none"
                  aria-labelledby="password-input-title"
                />
                {showPassword ? (
                  <AiOutlineEyeInvisible
                    onClick={() => setShowPassword(false)}
                    className="text-2xl cursor-pointer"
                  />
                ) : (
                  <AiOutlineEye
                    onClick={() => setShowPassword(true)}
                    className="text-2xl cursor-pointer"
                  />
                )}
              </div>
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
                callback={(e) => setConfirmPassword(e.target.value)}
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

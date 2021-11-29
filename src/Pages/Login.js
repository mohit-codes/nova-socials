import { useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { Input, Label } from "../Components/FormComponents";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import { useSelector, useDispatch } from "react-redux";
import { loginUserAsync } from "../features/user/userSlice";

export const Login = () => {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { loading, errorMessage, isUserLoggedIn } = useSelector(
    (state) => state.user
  );
  const navigate = useNavigate();

  const loginHandler = async (event) => {
    event.preventDefault();
    const { meta } = await dispatch(
      loginUserAsync({
        email,
        password,
      })
    );
    if (meta.requestStatus === "fulfilled") {
      navigate("home");
    }
  };
  return (
    <>
      {isUserLoggedIn && <Navigate to="home" replace />}
      <div className="h-screen flex justify-center back">
        <div className="text-center mt-40">
          <h1 className="text-5xl font-semibold mb-4">Nova Socials</h1>
          {errorMessage !== "" && (
            <p className="text-red-600 font-medium max-w-sm">{errorMessage}</p>
          )}
          <div className="text-left shadow-lg w-96 p-4 bg-gray-200 rounded-md mt-2">
            <form onSubmit={loginHandler}>
              <div className="">
                <Label
                  htmlFor="email"
                  labelText="Email"
                  id="email-input-title"
                />
                <Input
                  callback={setEmail}
                  placeholder="Your Email"
                  value={email}
                  id="email"
                  ariaLabelledBy="email-input-title"
                />
              </div>
              <div>
                <Label
                  htmlFor="password"
                  labelText="Password"
                  id="password-input-title"
                />
                <div className="border-2 border-gray-400 bg-white rounded-md flex items-center">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="Your Password"
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
              <div className="flex justify-center mt-2">
                <button
                  type="submit"
                  disabled={email === "" || password === ""}
                  className="bg-blue-500 text-white px-3 py-2 rounded-full my-2 w-36 font-semibold"
                >
                  {!loading ? "Login" : "Logging In..."}
                </button>
              </div>
              <button
                className="w-full  text-center hover:underline"
                onClick={() => {
                  setEmail("test@test.com");
                  setPassword("Test@123");
                }}
              >
                Use test credentials
              </button>
            </form>
            <div className="text-center mt-4">
              <p className="font-normal">
                Dont have an account?{" "}
                <Link to="signup" className="hover:underline">
                  Sign Up!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

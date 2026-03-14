import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setAuthUser } from "../redux/userSlice";
import { toast } from "react-toastify";

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:5000/user/login",
        { email, password },
        { withCredentials: true },
      );
      setEmail("");
      setPassword("");
      dispatch(setAuthUser(res.data));
      toast.success(res.data.message);
      navigate("/dashboard");
    } catch (err) {
      if (err.res?.status === 401) {
        toast.error("Invalid email or password");
      } else if (err.res?.status === 400) {
        toast.warning("Please fill all fields");
      } else {
        toast.error("Server error");
      }
      // console.log("LOGIN ERROR: ", err.res?.data || err.message);
    }
  };

  return (
    <>
      {/* Container: White in light mode, Zinc-950 in dark mode */}
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://companieslogo.com/img/orig/LLY-a89a5a37.png?t=1722952494"
            // Invert only in dark mode to keep it visible
            className="mx-auto h-10 w-auto invert"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-zinc-900 dark:text-white">
            Sign in to your account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            autoComplete="off"
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm/6 font-medium text-zinc-700 dark:text-zinc-300"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  name="email"
                  type="email"
                  required
                  className="block w-full rounded-md px-3 py-1.5 text-base shadow-sm ring-1 ring-inset transition-all
                    bg-white text-zinc-900 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600
                    dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-zinc-500 dark:focus:ring-white sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-white transition-colors"
                  >
                    Forgot password?
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-md px-3 py-1.5 text-base shadow-sm ring-1 ring-inset transition-all
                    bg-white text-zinc-900 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600
                    dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-zinc-500 dark:focus:ring-white sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-sm transition-colors
                  bg-zinc-900 text-white hover:bg-zinc-800 
                  dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Sign in
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-zinc-500 dark:text-zinc-400">
            or{" "}
            <Link
              to="/"
              className="font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;

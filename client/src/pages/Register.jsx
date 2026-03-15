import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify"
function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstname] = useState("");
  const [lastName, setLastname] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}/user/register`,
        { firstName, lastName, email, password },
        { withCredentials: true },
      );
      setEmail("");
      setPassword("");
      setFirstname("");
      setLastname("");
      toast.success(res.data.message);
      navigate("/dashboard")
    } catch (err) {
      if (err.res?.status === 400) {
        toast.warning(err.res.data.message);
      } else if (err.res?.status === 401) {
        toast.error(err.res.data.message);
      } else {
        toast.error("Server error. Please try again.");
      }
      // console.log("REGISTER ERROR: ", err.res?.data || err.message);
    }
  };

  return (
    <>
      <div className="flex min-h-screen flex-col justify-center px-6 py-12 lg:px-8 bg-white dark:bg-zinc-950 transition-colors duration-300">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            alt="Your Company"
            src="https://companieslogo.com/img/orig/LLY-a89a5a37.png?t=1722952494"
            className="mx-auto h-10 w-auto invert"
          />
          <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-zinc-900 dark:text-white">
            Create new Account
          </h2>
        </div>

        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            onSubmit={handleSubmit}
            className="space-y-6"
            autoComplete="off"
          >
            <div className="grid grid-cols-1 items-center justify-between gap-4 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="firstName"
                  className="block text-sm/6 font-medium text-zinc-700 dark:text-zinc-300"
                >
                  First Name
                </label>
                <div className="mt-2">
                  <input
                    value={firstName}
                    onChange={(e) => setFirstname(e.target.value)}
                    id="firstName"
                    name="firstName"
                    type="text"
                    required
                    autoComplete="given-name"
                    className="block w-full rounded-md px-3 py-1.5 text-base shadow-sm ring-1 ring-inset transition-all
                      bg-white text-zinc-900 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600
                      dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-zinc-500 dark:focus:ring-white sm:text-sm/6"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="lastName"
                  className="block text-sm/6 font-medium text-zinc-700 dark:text-zinc-300"
                >
                  Last Name
                </label>
                <div className="mt-2">
                  <input
                    value={lastName}
                    onChange={(e) => setLastname(e.target.value)}
                    id="lastName"
                    name="lastName"
                    type="text"
                    autoComplete="family-name"
                    className="block w-full rounded-md px-3 py-1.5 text-base shadow-sm ring-1 ring-inset transition-all
                      bg-white text-zinc-900 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600
                      dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-zinc-500 dark:focus:ring-white sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

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
                  autoComplete="email"
                  className="block w-full rounded-md px-3 py-1.5 text-base shadow-sm ring-1 ring-inset transition-all
                    bg-white text-zinc-900 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600
                    dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-zinc-500 dark:focus:ring-white sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block text-sm/6 font-medium text-zinc-700 dark:text-zinc-300"
              >
                Password
              </label>
              <div className="mt-2">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Min. 8 characters"
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="new-password"
                  className="block w-full rounded-md px-3 py-1.5 text-base shadow-sm ring-1 ring-inset transition-all
                    bg-white text-zinc-900 ring-zinc-300 placeholder:text-zinc-400 focus:ring-2 focus:ring-inset focus:ring-zinc-600
                    dark:bg-white/5 dark:text-white dark:ring-white/10 dark:placeholder:text-zinc-500 dark:focus:ring-white sm:text-sm/6"
                />
              </div>
            </div>

            <div>
              <button
                type="submit"
                className="flex w-full justify-center rounded-md px-3 py-1.5 text-sm/6 font-semibold shadow-sm transition-all active:scale-95
                  bg-zinc-900 text-white hover:bg-zinc-800 
                  dark:bg-white dark:text-black dark:hover:bg-zinc-200"
              >
                Sign Up
              </button>
            </div>
          </form>

          <p className="mt-10 text-center text-sm/6 text-zinc-500 dark:text-zinc-400">
            Already have an Account?{" "}
            <Link
              to="/login"
              className="font-semibold text-zinc-700 hover:text-zinc-900 dark:text-zinc-300 dark:hover:text-white transition-colors"
            >
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Register;

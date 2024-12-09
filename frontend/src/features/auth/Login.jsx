import { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="w-full h-screen p-5">
      <div className="w-24 mb-5">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png"
          alt=""
        />
      </div>
      <form className="flex flex-col gap-2">
        <label className="text-[1.5em] font-medium" htmlFor="email">
          What&lsquo;s your email
        </label>
        <input
          type="email"
          id="email"
          placeholder="email.example.com"
          className="w-full border rounded-md px-2 py-2 bg-[#eee]"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <label className="text-[1.5em] font-medium" htmlFor="password">
          Enter Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="Password"
          className="w-full border rounded-md px-2 py-2 bg-[#eee]"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="w-full border rounded-md px-2 py-2 mt-4 bg-[#111] text-white font-medium text-xl">
          Login
        </button>
      </form>
      <p className="text-base text-center mt-2">
        New here?{" "}
        <span>
          <Link
            to="/register"
            className="text-blue-800 hover:underline font-semibold"
          >
            Create new Account
          </Link>
        </span>
      </p>
    </section>
  );
};

import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InputFeild from "../../components/InputFeild";

export const Login = () => {
  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const [password, setPassword] = useState("");
  const pwdRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(email, password);

    setEmail("");
    setPassword("");
  };

  return (
    <section onSubmit={handleFormSubmit}>
      <form className="flex flex-col gap-2">
        <h3 className="text-[1.5em] font-medium">What&lsquo;s your Email</h3>
        <InputFeild
          type="email"
          ref={emailRef}
          placeholder="email@example.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <h3 className="text-[1.5em] font-medium">Enter Password</h3>
        <InputFeild
          ref={pwdRef}
          type="password"
          placeholder="Your password..."
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
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

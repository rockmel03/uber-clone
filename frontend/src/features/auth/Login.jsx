import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputFeild from "../../components/InputFeild";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

export const Login = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const [email, setEmail] = useState("");
  const emailRef = useRef(null);

  const [password, setPassword] = useState("");
  const pwdRef = useRef(null);

  const [errMsg, setErrMsg] = useState("");
  const errRef = useRef(null);

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    if (errMsg) errRef.current.focus();
  }, [errMsg]);

  useEffect(() => {
    setErrMsg("");
  }, [email, password]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    if (!email || !password) return setErrMsg("All feilds are required");

    try {
      const response = await api.post("/auth/login", { email, password });
      const { token, user } = response.data.data;
      setAuth({ token, user });
      setEmail("");
      setPassword("");
      navigate(from, { replace: true });
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <section className="p-5 pt-20">
      {errMsg && (
        <p
          ref={errRef}
          className="text-red-500 font-semibold bg-red-200 px-2 py-2 rounded"
        >
          {errMsg}
        </p>
      )}
      <form onSubmit={handleFormSubmit} className="flex flex-col gap-2">
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

import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import InputFeild from "../../components/InputFeild";
import api from "../../api/axios";
import { useAuth } from "../../hooks/useAuth";

const rolesList = ["user", "captain"];
const initialFormData = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  vNumber: "",
  vColor: "",
  vCapacity: "",
  vType: "",
};

export const Register = () => {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const from = location?.state?.from?.pathname || "/";

  const emailRef = useRef(null);
  const errRef = useRef(null);

  const [formData, setFormData] = useState(initialFormData);
  const [accountType, setAccountType] = useState("user");
  const [errMsg, setErrMsg] = useState("");

  const handleChange = async (e) => {
    const fieldName = e.target.name;
    const data = e.target.value;
    // check
    if (!fieldName) return;
    // set data to state
    setFormData((prev) => {
      const x = { ...prev };
      x[fieldName] = data;
      return x;
    });
  };

  const registerUser = async (data) => {
    try {
      const response = await api.post("/auth/register", data);
      console.log(response);
      // set data to state
      const { token, user } = response.data.data;
      setAuth({ token, user });
      //reset form
      setFormData(initialFormData);
      //navigate
      navigate(from);
    } catch (error) {
      setErrMsg(error.response?.data?.message || "Registration Failed");
    }
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  useEffect(() => {
    setErrMsg("");
  }, [formData]);

  useEffect(() => {
    if (errMsg) errRef.current.focus();
  }, [errMsg]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    console.log(formData);
    const {
      firstname,
      lastname,
      email,
      password,
      vNumber,
      vColor,
      vCapacity,
      vType,
    } = formData;

    const condition1 = [firstname, lastname, email, password].some(
      (val) => val == ""
    );
    const condition2 =
      accountType === "captain" &&
      [vNumber, vColor, vCapacity, vType].some((val) => val == "");
    if (condition1 || condition2) return setErrMsg("All feilds are required");

    const data = {
      fullname: {
        firstname,
        lastname,
      },
      email,
      password,
    };

    if (accountType === "captain") {
      data.roles = ["captain"];
      data.vehicle = {
        plate: vNumber,
        capacity: vCapacity,
        vehicleType: vType,
        color: vColor,
      };
    }
    console.log(data);
    // register user
    await registerUser(data);
  };

  const rolesOptions = rolesList.map((val) => (
    <option key={val} value={val}>
      {val}
    </option>
  ));

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
        <InputFeild
          ref={emailRef}
          label="Email Address :"
          type="email"
          placeholder="email@example.com"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <div className="flex items-center gap-4">
          <InputFeild
            label="Firstname :"
            type="text"
            placeholder="Jhone"
            name="firstname"
            value={formData.firstname}
            onChange={handleChange}
            required
          />
          <InputFeild
            label="Lastname :"
            type="text"
            placeholder="Doe"
            name="lastname"
            value={formData.lastname}
            onChange={handleChange}
            required
          />
        </div>
        <InputFeild
          label="Enter Password"
          type="password"
          placeholder="Minimum 6 characters"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <div>
          <label htmlFor="role" className="text-[1.2em] font-medium">
            Account Type
          </label>
          <select
            id="role"
            className="capitalize w-full border rounded-md px-2 py-2 bg-[#eee]"
            defaultValue={accountType}
            onChange={(e) => setAccountType(e.target.value)}
          >
            {rolesOptions}
          </select>
        </div>

        {accountType === "captain" && (
          <div className="grid grid-cols-2 gap-4">
            <h2 className=" col-span-2 text-[1.2em] font-medium">
              Vehicle Details
            </h2>

            <InputFeild
              type="text"
              placeholder="Vehicle no."
              name="vNumber"
              value={formData.vNumber}
              onChange={handleChange}
              required
            />
            <select
              className="w-full border rounded-md px-2 py-2 bg-[#eee]"
              id="vtype"
              name="vType"
              defaultValue={formData.vType}
              onChange={handleChange}
              required
            >
              <option value="">--Vehicle type--</option>
              <option value="car">Car</option>
              <option value="motorcycle">Motorcycle</option>
              <option value="auto">Auto</option>
            </select>
            <InputFeild
              type="number"
              placeholder="Vehicle capacity"
              name="vCapacity"
              value={formData.vCapacity}
              onChange={handleChange}
              required
            />
            <InputFeild
              type="text"
              placeholder="Vehicle color"
              name="vColor"
              value={formData.vColor}
              onChange={handleChange}
              required
            />
          </div>
        )}
        <button className="w-full border rounded-md px-2 py-2 mt-4 bg-[#111] text-white font-medium text-xl">
          Register
        </button>
      </form>
      <p className="text-base text-center mt-2">
        Already have Account?{" "}
        <span>
          <Link
            to="/login"
            className="text-blue-800 hover:underline font-semibold"
          >
            Login here
          </Link>
        </span>
      </p>
    </section>
  );
};

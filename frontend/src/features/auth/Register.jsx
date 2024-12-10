import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import InputFeild from "../../components/InputFeild";

const rolesList = ["user", "captain"];

export const Register = () => {
  const emailRef = useRef(null);

  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
    vNumber: "",
    vColor: "",
    vCapacity: "",
    vType: "",
  });
  const [accountType, setAccountType] = useState("user");

  const handleChange = (e) => {
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

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  const handleFormSubmit = (e) => {
    e.preventDefault();

    console.log(formData);

    setFormData({
      firstname: "",
      lastname: "",
      email: "",
      password: "",
      vNumber: "",
      vColor: "",
      vCapacity: "",
      vType: "",
    });
  };

  const rolesOptions = rolesList.map((val) => (
    <option key={val} value={val}>
      {val}
    </option>
  ));

  return (
    <section>
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

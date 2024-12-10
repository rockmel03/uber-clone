import { forwardRef, useId } from "react";

const InputFeild = ({ label, type, className, ...rest }, ref) => {
  const id = useId();
  return (
    <div>
      {label && (
        <label className="text-[1.2em] font-medium" htmlFor={id}>
          {label}
        </label>
      )}
      <input
        ref={ref}
        id={id}
        type={type || "text"}
        className={`w-full border rounded-md px-2 py-2 bg-[#eee] ${className}`}
        {...rest}
      />
    </div>
  );
};

export default forwardRef(InputFeild);

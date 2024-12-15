import { Link } from "react-router-dom";
import emojiImage from "../assets/disappointed-face-emoji.png";

export const Unauthorized = () => {
  return (
    <section className="bg-yellow-500 w-full h-screen flex flex-col  items-center justify-center">
      <div className="text-3xl">
        <img src={emojiImage} alt="" />
      </div>
      <h2 className="text-xl font-semibold mb-2">
        You are Unauthorized to see this page
      </h2>
      <Link
        to="/"
        className="bg-black text-yellow-500 px-3 py-2 font-semibold text-sm rounded-lg"
      >
        Go back to Home
      </Link>
    </section>
  );
};

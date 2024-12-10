import InputFeild from "../components/InputFeild";

const Home = () => {
  return (
    <section
      className="pt-20 w-full min-h-screen flex flex-col justify-end"
      style={{
        backgroundImage:
          "url(https://media.wired.com/photos/59269cd37034dc5f91bec0f1/master/w_1920,c_limit/GoogleMapTA.jpg)",
      }}
    >
      <div className="p-5 bg-white rounded-lg flex flex-col gap-3">
        <h2 className="font-semibold text-xl">Find a trip</h2>
        <InputFeild
          type="text"
          className="pl-12"
          placeholder="Add a pick-up location"
        />
        <InputFeild
          type="text"
          className="pl-12"
          placeholder="Enter your destination"
        />
        <button className="w-fit px-4 py-1 rounded-full bg-[#eee] text-sm font-semibold">
          Leave Now
        </button>
      </div>
    </section>
  );
};

export default Home;

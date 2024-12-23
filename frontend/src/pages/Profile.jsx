import { useEffect, useState } from "react";
import { useApiPrivate } from "../hooks/useApiPrivate";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import assets from "../assets";

export const Profile = () => {
  const { auth, setAuth } = useAuth();
  const api = useApiPrivate();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth?.roles) return;

      const endpoint = auth?.roles?.includes("captain")
        ? "/captains/profile"
        : auth?.roles?.includes("user")
        ? "/users/profile"
        : undefined;

      if (!endpoint) return;
      setIsLoading(true);
      try {
        const response = await api.get(endpoint);
        if (response?.status === 200) {
          setAuth((prev) => ({ ...prev, user: response.data.data }));
        }
      } catch (error) {
        toast.error(error?.response?.data?.message || error?.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (!auth?.user && !isLoading) fetchUserData();
  }, [auth]);

  if (isLoading)
    return (
      <div className="w-full h-full grid place-items-center">
        <p>Loading...</p>
      </div>
    );
  return (
    <section className="w-full h-full bg-zinc-100 pt-20">
      <div className="w-full bg-zinc-50 p-5 flex flex-col gap-1 items-center justify-center">
        <div className="w-24 h-24 rounded-full bg-zinc-200 overflow-hidden">
          <img src={assets.images.profilePlaceholder} alt="profile" />
        </div>
        <h2 className="text-xl font-semibold">
          {auth?.user?.fullname &&
            Object.values(auth?.user?.fullname).join(" ")}
        </h2>
        <p className="opacity-90 font-semibold">{auth?.user?.email}</p>
      </div>
      <div className="">
        <h3 className="font-semibold uppercase text-sm opacity-85 mt-3 px-5">
          Informations
        </h3>
        <ul className="bg-white px-5">
          <hr className="my-3" />
          <li className="w-full flex justify-between">
            <span className="font-semibold">ID</span>
            <span className="font-medium opacity-70">#{auth?.user?._id} </span>
          </li>
          <hr className="my-3" />
          <li className="w-full flex justify-between">
            <span className="font-semibold">Email</span>
            <span className="font-medium opacity-70">{auth?.user?.email} </span>
          </li>
          <hr className="my-3" />
          <li className="w-full flex justify-between">
            <span className="font-semibold">Role</span>
            <span className="font-medium opacity-70 capitalize">
              {auth?.user?.roles.join(", ")}{" "}
            </span>
          </li>
          <hr className="my-3" />
        </ul>

        {auth?.user?.roles?.includes("captain") && (
          <>
            <h3 className="font-semibold uppercase text-sm opacity-85 px-5">
              Vehicle Details
            </h3>
            <ul className="bg-white px-5">
              <hr className="my-3" />
              {auth?.user?.captain?.vehicle &&
                Object.entries(auth?.user?.captain?.vehicle).map(
                  ([key, value]) => {
                    return (
                      <li key={key}>
                        <div className="w-full flex justify-between">
                          <span className="font-semibold">{key}</span>
                          <span className="font-medium opacity-70">
                            {value}{" "}
                          </span>
                        </div>
                        <hr className="my-3" />
                      </li>
                    );
                  }
                )}
            </ul>
          </>
        )}
      </div>
    </section>
  );
};

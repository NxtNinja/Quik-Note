import axios from "axios";
import { useRouter } from "next/router";
import { AiOutlineLogout } from "react-icons/ai";

const Logout = () => {
  const router = useRouter();
  const logoutUser = async () => {
    try {
      const req = await axios.post(
        "http://localhost:4000/auth/logout",
        {},
        {
          withCredentials: true,
        }
      );
      //   router.push("/auth/login");
      console.log(req.data);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={logoutUser}
        className="text-gray-300 absolute flex justify-center items-center gap-2 bottom-20 text-lg bg-red-500 w-full p-3 hover:text-white mt-1"
      >
        <AiOutlineLogout />
        <p className="">Logout</p>
      </button>
    </>
  );
};

export default Logout;

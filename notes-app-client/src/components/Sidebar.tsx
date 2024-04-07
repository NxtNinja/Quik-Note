import { Collection } from "@/utils/types/CollectionType";
import { User } from "@/utils/types/UserType";
import { useState } from "react";
import { AiOutlineArrowDown, AiOutlineLogout } from "react-icons/ai";
import { IoIosArrowDown, IoIosArrowForward } from "react-icons/io";
import Logout from "./buttons/Logout";
import { useRouter } from "next/router";

const Sidebar = ({
  userInfo,
  collectionInfo,
}: {
  userInfo?: User;
  collectionInfo?: Collection[];
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showLogout, setShowLogout] = useState(false);
  const router = useRouter();

  const handleNameClick = () => {
    setShowLogout(!showLogout);
  };

  return (
    <>
      {/* Sidebar */}
      <aside className="bg-gray-800 md:w-56 lg:w-64 flex-shrink-0 fixed h-screen md:block hidden">
        <div
          onClick={() => router.push("/")}
          className="bg-gray-900 text-white py-4 px-6 cursor-pointer"
        >
          <p className="text-2xl">Quik-Note</p>
        </div>
        {/* Collections */}
        <div className="p-4">
          <h2 className="text-white text-lg font-semibold mb-2">Collections</h2>
          <ul className="space-y-2">
            {collectionInfo?.length !== 0 &&
              collectionInfo?.map((collection) => (
                <li
                  onClick={() => router.push(`/notes/${collection.id}`)}
                  key={collection.id}
                  className="text-gray-200 hover:text-white transition duration-300 cursor-pointer"
                >
                  <div className="flex justify-between items-center">
                    {collection.coll_name}
                    <IoIosArrowForward />
                  </div>
                </li>
              ))}
          </ul>
        </div>
        {showLogout && <Logout />}
        {/* Current User */}
        <div
          onClick={handleNameClick}
          className="bg-gray-900 text-white py-4 px-6 absolute w-full bottom-0 cursor-pointer"
        >
          <h1 className="text-lg font-semibold">{userInfo?.name}</h1>
          <p className="text-sm">{userInfo?.email}</p>
        </div>
      </aside>
      {/* Navbar */}
      <nav className="bg-gray-800 fixed top-0 left-0 w-full p-4 flex justify-between items-center md:hidden">
        <p className="text-white text-2xl">Quik-Note</p>
        <button
          className="text-white text-2xl focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-8 w-8"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M3 4.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75zm0 4.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75zm0 4.75a.75.75 0 0 1 .75-.75h12.5a.75.75 0 0 1 0 1.5H3.75a.75.75 0 0 1-.75-.75z"
            />
          </svg>
        </button>
      </nav>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="bg-gray-800 fixed top-0 left-0 w-full h-full flex flex-col items-center justify-center">
          <p className="text-white text-2xl mb-4">Menu</p>
          <ul className="space-y-2">
            <li className="text-white hover:text-gray-300 cursor-pointer">
              Option 1
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              Option 2
            </li>
            <li className="text-white hover:text-gray-300 cursor-pointer">
              Option 3
            </li>
            {/* Add more menu options as needed */}
          </ul>
        </div>
      )}
    </>
  );
};

export default Sidebar;

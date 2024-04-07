import { UserType } from "@/utils/types/UserType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Layout from "./Layout";
import { useAtom } from "jotai";
import { UserAtom } from "@/utils/atoms/UserAtom";
import { CollectionAtom } from "@/utils/atoms/CollectionAtom";
import CollectionCard from "./reuseable/CollectionCard";
import { useState } from "react";
import CreateCollection from "./modals/CreateCollections";

const HomePage = () => {
  const [user] = useAtom(UserAtom);
  const [collection = []] = useAtom(CollectionAtom);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <Layout>
        <div className="grid md:block md:ml-64 place-items-center mt-32 md:mt-0 p-4">
          <div className="max-w-full">
            {collection.length !== 0 ? (
              <div className="text-start mb-8 space-y-2">
                <div className="w-full flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <p className="text-3xl font-semibold">Your Collections</p>
                    <button
                      onClick={() => setIsModalOpen((prev) => !prev)}
                      className="bg-blue-500 w-fit hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    >
                      Create Collection
                    </button>
                    {isModalOpen && <CreateCollection onClose={closeModal} />}
                  </div>
                  <p className="text-lg w-fit text-gray-800 text-end">
                    Welcome back,{" "}
                    <span className="font-bold">{user.name}!</span>
                  </p>
                </div>

                <div className="w-full flex flex-col py-5">
                  <p className="text-gray-800 mb-4 text-lg">
                    You have existing collections. Start exploring them now.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {collection.map((items) => {
                      return (
                        <CollectionCard key={items.id} collectionInfo={items} />
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              <div className="">
                <div className="text-left mb-8">
                  <h1 className="text-3xl font-bold text-gray-800">
                    Welcome, {user.name}!
                  </h1>
                  <p className="text-gray-600 mt-2">
                    Get started by creating your first collection and adding
                    your first note.
                  </p>
                </div>
                <div className="flex justify-start">
                  <button
                    onClick={() => setIsModalOpen((prev) => !prev)}
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mr-4"
                  >
                    Create Collection
                  </button>
                  {isModalOpen && <CreateCollection onClose={closeModal} />}
                </div>
                <div className="mt-8">
                  <h2 className="text-xl font-bold text-gray-800 mb-4">
                    Explore Features:
                  </h2>
                  <ul className="list-disc list-inside">
                    <li className="text-gray-600">
                      Organize your notes into collections.
                    </li>
                    <li className="text-gray-600">
                      Add tags to easily find your notes.
                    </li>
                    <li className="text-gray-600">
                      Sync your notes across devices.
                    </li>
                    <li className="text-gray-600">
                      Collaborate with others by sharing collections.
                    </li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default HomePage;

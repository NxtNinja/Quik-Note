import { Collection } from "@/utils/types/CollectionType";
import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import React, { FormEvent, useState } from "react";

const EditCollection = ({
  onClose,
  collectionDetails,
}: {
  onClose: () => void;
  collectionDetails?: Collection;
}) => {
  const [name, setName] = useState(collectionDetails?.coll_name);
  const [description, setDescription] = useState(
    collectionDetails?.coll_description
  );
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  const updateCollection = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoad(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios.patch(
        `http://localhost:4000/collections/update/${collectionDetails?.id}`,
        {
          user_created: collectionDetails?.user_created,
          coll_name: name,
          coll_description: description,
        },
        {
          withCredentials: true,
        }
      );
      setLoad(false);
      onClose();
      queryClient.invalidateQueries({ queryKey: ["collection-data"] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="fixed z-10 inset-0 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75"></div>
        </div>
        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>
        <div className="inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
          <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
            <div className="sm:flex sm:items-start">
              <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                <h3 className="text-lg leading-6 font-medium text-gray-900">
                  Edit Collection
                </h3>
                <div className="mt-2">
                  <form onSubmit={updateCollection} className="w-full max-w-lg">
                    <div className="mb-4">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="collectionName"
                      >
                        Collection Name
                      </label>
                      <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="collectionName"
                        type="text"
                        value={name}
                        onChange={(e: any) => setName(e.target.value)}
                        placeholder="Enter collection name"
                      />
                    </div>
                    <div className="mb-6">
                      <label
                        className="block text-gray-700 text-sm font-bold mb-2"
                        htmlFor="collectionDescription"
                      >
                        Collection Description
                      </label>
                      <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="collectionDescription"
                        value={description}
                        onChange={(e: any) => setDescription(e.target.value)}
                        placeholder="Enter collection description"
                      ></textarea>
                    </div>
                    <div className="flex items-center justify-between">
                      <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline flex justify-center items-center"
                        type="submit"
                      >
                        {load ? (
                          <Spinner size="sm" color="current" />
                        ) : (
                          <p>Update</p>
                        )}
                      </button>
                      <button
                        onClick={onClose}
                        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="button"
                      >
                        Cancel
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditCollection;

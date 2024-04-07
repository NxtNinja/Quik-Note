import { UserAtom } from "@/utils/atoms/UserAtom";
import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useAtom } from "jotai";
import { FormEvent, useState } from "react";

const CreateCollection = ({ onClose }: { onClose: () => void }) => {
  const [user] = useAtom(UserAtom);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  const handleCreate = async (e: FormEvent) => {
    e.preventDefault();
    try {
      setLoad(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios.post(
        "http://localhost:4000/collections/add",
        {
          user_created: user.id,
          coll_name: title,
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
    <>
      <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <div className="bg-white p-8 rounded-lg w-[30rem]">
          <p className="text-lg font-bold mb-4">Create New Collection</p>
          <form onSubmit={handleCreate}>
            <input
              type="text"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-4 w-full focus:outline-none focus:border-blue-500"
            />
            <textarea
              placeholder="Description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-gray-300 rounded-md p-2 mb-4 w-full resize-none focus:outline-none focus:border-blue-500"
              rows={4}
            />
            <div className="flex justify-end gap-2">
              <button
                type="submit"
                onClick={handleCreate}
                className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
              >
                {load ? <Spinner size="sm" color="current" /> : <p>Create</p>}
              </button>
              <button
                onClick={onClose}
                className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-2"
              >
                Discard
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default CreateCollection;

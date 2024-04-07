import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const DeleteCollectionBtn = ({
  closeDeleteModal,
  collectionId,
}: {
  closeDeleteModal: () => void;
  collectionId: string;
}) => {
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  const deleteCollection = async () => {
    try {
      setLoad(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios.delete(
        `http://localhost:4000/collections/delete/${collectionId}`,
        {
          withCredentials: true,
        }
      );
      setLoad(false);
      closeDeleteModal();
      queryClient.invalidateQueries({ queryKey: ["collection-data"] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={deleteCollection}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-fit"
      >
        {load ? <Spinner size="sm" color="current" /> : <p>Confirm & Delete</p>}
      </button>
    </>
  );
};

export default DeleteCollectionBtn;

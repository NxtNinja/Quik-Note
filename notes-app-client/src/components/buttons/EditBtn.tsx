import React, { useState } from "react";
import EditCollection from "../modals/EditCollection";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { Spinner } from "@nextui-org/react";
import { Collection, SingleCollection } from "@/utils/types/CollectionType";

const EditBtn = ({ collectionId }: { collectionId: string }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [collection, setCollection] = useState<Collection>();

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getCollectionData = async () => {
    const req = await axios.get(
      `http://localhost:4000/collections/get-one/${collectionId}`,
      { withCredentials: true }
    );
    const data = req.data as SingleCollection;
    console.log(data.data);
    setCollection(data.data);

    openModal();
    return data.data;
  };

  return (
    <>
      <button
        className="bg-amber-500 hover:bg-amber-600 text-white font-bold py-2 px-4 rounded w-full"
        onClick={getCollectionData}
      >
        <p>Edit Collection</p>
      </button>
      {isModalOpen && (
        <EditCollection onClose={closeModal} collectionDetails={collection} />
      )}
    </>
  );
};

export default EditBtn;

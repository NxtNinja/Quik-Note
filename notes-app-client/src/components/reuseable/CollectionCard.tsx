import { Collection } from "@/utils/types/CollectionType";
import { useRouter } from "next/router";
import EditBtn from "../buttons/EditBtn";
import { AiFillFileAdd, AiFillPlusCircle } from "react-icons/ai";
import { useState } from "react";
import DeleteCollectionModal from "../modals/DeleteCollectionModal";

const CollectionCard = ({ collectionInfo }: { collectionInfo: Collection }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const router = useRouter();
  const formatCreatedAt = (createdAt: any) => {
    const date = new Date(createdAt);
    return date.toLocaleDateString();
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  // Function to handle closing the modal
  const closeDeleteModal = () => {
    setIsDeleteModalOpen(false);
  };
  return (
    <>
      <div className="bg-white shadow-md border border-slate-200 p-6 space-y-2 flex flex-col justify-start items-start">
        <div className="flex flex-col w-full">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">
              {collectionInfo.coll_name}
            </h2>
            <button
              onClick={() => router.push(`/addNote/${collectionInfo.id}`)}
              className=" text-white font-bold rounded-full focus:outline-none focus:shadow-outline flex justify-center items-center gap-2"
            >
              <div className="bg-green-500 hover:bg-green-600 rounded-full">
                <AiFillPlusCircle size={30} />
              </div>
              <p className="text-black">Add note</p>
            </button>
          </div>
          <div className="text-gray-900 text-sm">
            Creation Date: {formatCreatedAt(collectionInfo.created_at)}
          </div>
        </div>
        <p className="text-gray-600 text-base mb-4">
          {collectionInfo.coll_description}
        </p>
        <div className="flex justify-between items-end gap-3 w-full h-full">
          <button
            onClick={() => router.push(`/notes/${collectionInfo.id}`)}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-full"
          >
            View Notes
          </button>
          <EditBtn collectionId={collectionInfo.id} />
        </div>

        <button
          onClick={() => setIsDeleteModalOpen((prev) => !prev)}
          className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded w-full"
        >
          Delete Collection
        </button>
        {isDeleteModalOpen && (
          <DeleteCollectionModal
            closeDeleteModal={closeDeleteModal}
            collectionId={collectionInfo.id}
          />
        )}
      </div>
    </>
  );
};

export default CollectionCard;

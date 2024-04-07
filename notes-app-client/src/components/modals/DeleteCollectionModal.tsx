import DeleteBtn from "../buttons/DeleteBtn";
import DeleteCollectionBtn from "../buttons/DeleteCollectionBtn";

const DeleteCollectionModal = ({
  closeDeleteModal,
  collectionId,
}: {
  closeDeleteModal: () => void;
  collectionId: string;
}) => {
  return (
    <>
      <div className="fixed inset-0 flex items-center justify-center z-10 bg-black bg-opacity-50">
        <div className="bg-white p-7 rounded-lg">
          <p className="text-lg font-bold my-2">
            Are you sure you want to delete this note?
          </p>
          <div className="flex justify-end my-2">
            <button
              onClick={closeDeleteModal}
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded mr-2"
            >
              Cancel
            </button>
            <DeleteCollectionBtn
              closeDeleteModal={closeDeleteModal}
              collectionId={collectionId}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default DeleteCollectionModal;

import { Note } from "@/utils/types/NoteType";
import { useRouter } from "next/router";
import DeleteBtn from "../buttons/DeleteBtn";
import { useState } from "react";
import DeleteNoteModal from "../modals/DeleteNoteModal";

const NotesCard = ({ info }: { info: Note }) => {
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
    <div className="bg-white shadow-md border border-slate-200 overflow-hidden w-full">
      <div className="p-5 space-y-5">
        <div className="">
          <div className="font-bold text-xl mb-2 flex justify-between items-center">
            <p className="">{info.title}</p>
            <span className="text-gray-600 text-sm mt-auto">
              {formatCreatedAt(info.created_at)}
            </span>
          </div>
          <div className="text-gray-700 text-base line-clamp-1 mt-auto">
            {info.content}
          </div>
        </div>
        <div className="flex justify-between items-center gap-4">
          <button
            onClick={() => router.push(`/notes/get-one/${info.id}`)}
            className="bg-blue-500 w-full hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
          >
            Read Note
          </button>

          <button
            onClick={() => router.push(`/notes/edit-note/${info.id}`)}
            className="bg-amber-500 w-full hover:bg-amber-600 text-white font-bold py-2 px-4 rounded"
          >
            Keep Editing
          </button>

          <button
            onClick={() => setIsDeleteModalOpen((prev) => !prev)}
            className="bg-red-500 w-full hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
          >
            Delete Note
          </button>
          {isDeleteModalOpen && (
            <DeleteNoteModal
              noteId={info.id}
              closeDeleteModal={closeDeleteModal}
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default NotesCard;

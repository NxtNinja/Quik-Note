import { Spinner } from "@nextui-org/react";
import { useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useState } from "react";

const DeleteBtn = ({
  noteId,
  closeDeleteModal,
}: {
  noteId: string;
  closeDeleteModal: () => void;
}) => {
  const [load, setLoad] = useState(false);

  const queryClient = useQueryClient();

  const deleteNote = async () => {
    try {
      setLoad(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));
      await axios.delete(`http://localhost:4000/notes/delete/${noteId}`, {
        withCredentials: true,
      });
      setLoad(false);
      closeDeleteModal();
      queryClient.invalidateQueries({ queryKey: ["notes"] });
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <>
      <button
        onClick={deleteNote}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        {load ? <Spinner size="sm" color="current" /> : <p>Confirm & Delete</p>}
      </button>
    </>
  );
};

export default DeleteBtn;

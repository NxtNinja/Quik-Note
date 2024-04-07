import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { Note } from "@/utils/types/NoteType";
import { Spinner } from "@nextui-org/react";

const EditNote = ({
  collectionId,
  notesInfo,
}: {
  collectionId?: string;
  notesInfo?: Note;
}) => {
  const [content, setContent] = useState(notesInfo?.content);
  const [title, setTitle] = useState(notesInfo?.title);
  const [load, setLoad] = useState(false);
  const [inavlid, setInvalid] = useState("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const editNote = async () => {
    try {
      setLoad(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await axios.patch(
        `http://localhost:4000/notes/update/${notesInfo?.id}`,
        {
          collection_id: collectionId,
          title: title,
          content: content,
        },
        { withCredentials: true }
      );
      setLoad(false);
      queryClient.invalidateQueries({ queryKey: ["notes-update"] });
      router.push(`/notes/${collectionId}`);
    } catch (error: any) {
      console.log();
      if (error.response.status) {
        setInvalid("All fields are required!");
      }
    }
  };

  return (
    <Layout>
      <div className="p-4 grid md:block md:ml-64 place-items-start mt-32 md:mt-0">
        <div className="flex justify-between items-center mb-4">
          <p className="text-2xl font-bold">Edit Note</p>
          <div className="flex flex-col justify-end items-end">
            <button
              onClick={editNote}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-fit"
            >
              {load ? <Spinner size="sm" color="current" /> : <p>Update</p>}
            </button>
            <p className="text-red-500">{inavlid}</p>
          </div>
        </div>
        <input
          className="mb-3 appearance-none rounded w-full p-3 text-xl text-gray-700 leading-tight focus:outline-none border border-slate-300"
          type="text"
          value={title}
          onChange={(e: any) => setTitle(e.target.value)}
          placeholder="Enter Note Title"
        />
        <textarea
          className="mb-3 border border-gray-300 rounded w-full p-3 text-xl text-gray-700 leading-tight focus:outline-none"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Write your notes here"
          rows={20}
        />
      </div>
    </Layout>
  );
};

export default EditNote;

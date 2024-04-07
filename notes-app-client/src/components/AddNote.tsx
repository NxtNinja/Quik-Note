import React, { useState } from "react";
import Layout from "./Layout";
import axios from "axios";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";

const AddNote = ({ collectionId }: { collectionId: string }) => {
  const [content, setContent] = useState("");
  const [title, setTitle] = useState("");
  const [load, setLoad] = useState(false);
  const [inavlid, setInvalid] = useState("");

  const router = useRouter();

  const queryClient = useQueryClient();

  const addNote = async () => {
    try {
      setLoad(true);
      await new Promise((resolve) => setTimeout(resolve, 1500));

      await axios.post(
        "http://localhost:4000/notes/add",
        {
          collection_id: collectionId,
          title: title,
          content: content,
        },
        { withCredentials: true }
      );
      setLoad(false);
      queryClient.invalidateQueries({ queryKey: ["notes"] });
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
          <p className="text-2xl font-bold">Add Note</p>
          <div className="flex flex-col justify-end items-end">
            <button
              onClick={addNote}
              className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded w-fit"
            >
              Save Note
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
          rows={20} // Adjust the number of rows as needed
        />
      </div>
    </Layout>
  );
};

export default AddNote;

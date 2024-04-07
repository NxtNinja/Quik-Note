import { Note } from "@/utils/types/NoteType";
import Layout from "../Layout";
import NotesCard from "./NotesCard";
import { useAtom } from "jotai";
import { CollectionAtom } from "@/utils/atoms/CollectionAtom";
import { useEffect } from "react";
import Image from "next/image";
import NoDataToShow from "./NoDataToShow";

const DisplayNotes = ({
  noteInfo,
  collectionId,
}: {
  noteInfo: Note[];
  collectionId: string;
}) => {
  const [collection] = useAtom(CollectionAtom);

  let collectionName;

  noteInfo?.find((item) => {
    if (item.collection_id === collectionId) {
      collection.find((info) => {
        if (info.id === item.collection_id) {
          collectionName = info.coll_name;
        }
      });
    }
  });

  if (noteInfo.length === 0) {
    return <NoDataToShow />;
  }
  return (
    <>
      <Layout>
        <div className="md:ml-64 mt-32 md:mt-0 p-4 space-y-7">
          <p className="tracking-wider text-2xl">
            Notes under <span className="font-bold ">{collectionName}</span>
          </p>
          <div className="grid md:grid-cols-2 gap-5">
            {noteInfo.map((items) => {
              return <NotesCard key={items.id} info={items} />;
            })}
          </div>
        </div>
      </Layout>
    </>
  );
};

export default DisplayNotes;

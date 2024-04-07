import EditNote from "@/components/EditNote";
import { SingleNoteType } from "@/utils/types/SingleNoteType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const noteId = () => {
  const router = useRouter();
  const noteId = router.query.noteId as string;

  const { data } = useQuery({
    queryKey: ["notes-update", noteId],
    queryFn: async () => {
      try {
        const req = await axios.get(
          `http://localhost:4000/notes/get-one/${noteId}`,
          {
            withCredentials: true,
          }
        );
        const data = req.data as SingleNoteType;

        return data.data;
      } catch (error) {
        console.log(error);
      }
    },
    refetchOnWindowFocus: false,
  });

  if (data === undefined) {
    return;
  }

  console.log(data);
  return (
    <>
      <EditNote collectionId={data?.collection_id} notesInfo={data} />
    </>
  );
};

export default noteId;

import DisplayNotes from "@/components/reuseable/DisplayNotes";
import NoNotesToShow from "@/components/reuseable/NoDataToShow";
import ReadNote from "@/components/reuseable/ReadNote";
import { NoteType } from "@/utils/types/NoteType";
import { SingleNoteType } from "@/utils/types/SingleNoteType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const noteId = () => {
  const router = useRouter();

  const noteId = router.query.noteId as string;

  const { data } = useQuery({
    queryKey: ["notes", noteId],
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

  console.log(data);

  if (data === undefined) {
    return <NoNotesToShow />;
  }

  return (
    <>
      <ReadNote noteType={data} />
    </>
  );
};

export default noteId;

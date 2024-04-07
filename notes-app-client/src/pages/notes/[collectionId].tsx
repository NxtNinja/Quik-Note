import DisplayNotes from "@/components/reuseable/DisplayNotes";
import NoNotesToShow from "@/components/reuseable/NoDataToShow";
import { NoteType } from "@/utils/types/NoteType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/router";

const collectionId = () => {
  const router = useRouter();

  const collectionId = router.query.collectionId as string;

  const { data } = useQuery({
    queryKey: ["notes", collectionId],
    queryFn: async () => {
      try {
        const req = await axios.get(
          `http://localhost:4000/notes/get/${collectionId}`,
          {
            withCredentials: true,
          }
        );
        const data = req.data as NoteType;

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
      <DisplayNotes noteInfo={data} collectionId={collectionId} />
    </>
  );
};

export default collectionId;

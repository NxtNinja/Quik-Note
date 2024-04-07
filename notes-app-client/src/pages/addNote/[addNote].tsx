import AddNote from "@/components/AddNote";
import { useRouter } from "next/router";

const addNote = () => {
  const router = useRouter();
  const addNote = router.query.addNote as string;
  return (
    <>
      <AddNote collectionId={addNote} />
    </>
  );
};

export default addNote;

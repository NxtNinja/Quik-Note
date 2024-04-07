import { UserType } from "@/utils/types/UserType";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { ReactNode } from "react";
import Sidebar from "./Sidebar";
import { CollectionType } from "@/utils/types/CollectionType";
import { useRouter } from "next/router";
import { useAtom } from "jotai";
import { UserAtom } from "@/utils/atoms/UserAtom";
import { CollectionAtom } from "@/utils/atoms/CollectionAtom";

const Layout = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useAtom(UserAtom);
  const [collection, setCollection] = useAtom(CollectionAtom);
  const router = useRouter();
  const { data } = useQuery({
    queryKey: ["current-user"],
    queryFn: async () => {
      try {
        const req = await axios.get("http://localhost:4000/auth/currentUser", {
          withCredentials: true,
        });
        const data = req.data as UserType;
        setUser(data.data);
        return data.data;
      } catch (error: any) {
        console.log(error);
        if (error.response.status === 401) {
          router.push("/auth/login");
        }
      }
    },
    refetchOnWindowFocus: false,
    refetchInterval: 1000,
  });

  const { data: collectionData } = useQuery({
    queryKey: ["collection-data"],
    queryFn: async () => {
      const req = await axios.get("http://localhost:4000/collections/get", {
        withCredentials: true,
      });
      const data = req.data as CollectionType;
      setCollection(data.data);

      return data.data;
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <aside>
        <Sidebar userInfo={data} collectionInfo={collectionData} />
      </aside>
      <main>{children}</main>
    </>
  );
};

export default Layout;

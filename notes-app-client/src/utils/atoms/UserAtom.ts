import { atom } from "jotai";
import { User } from "../types/UserType";

export const UserAtom = atom<User>({
    id: "",
    name: "",
    email: ""
})
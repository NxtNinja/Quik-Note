import { atom } from "jotai";
import { Collection } from "../types/CollectionType";

export const CollectionAtom = atom<Collection[]>([])
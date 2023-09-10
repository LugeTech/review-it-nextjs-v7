import { atom } from "jotai";
import { iProduct } from "../util/Interfaces";
// import { ISong } from "../utils/interfaces";

export const allProductsStore = atom<iProduct[]>([]);

// export const lyricsAtom = atom<string>("");

// export const wordCountAtom = atom<number>(0);

// export const songAtom = atom<ISong | null>(null);

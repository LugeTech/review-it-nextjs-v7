import { atom } from "jotai";
import { iProduct } from "../util/Interfaces";

export const allProductsStore = atom<iProduct[]>([]);

export const allProductsAtom = atom<iProduct[] | null>(null);

import { atom } from "jotai";
import { iProduct } from "../util/Interfaces";

export const allProductsStore = atom<iProduct[]>([]);

export const currentProductAtom = atom<iProduct | null>(null);

import { atom } from "jotai";
import { iProduct, iReview } from "../util/Interfaces";

export const allProductsStore = atom<iProduct[]>([]);

export const allProductsAtom = atom<iProduct[] | null>(null);
export const currentReviewAtom = atom<iReview | null>(null);

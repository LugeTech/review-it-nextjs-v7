import { atom } from "jotai";
import { iProduct, iReview, iUser } from "../util/Interfaces";
import { getUser } from "../util/serverFunctions";

export const allProductsStore = atom<iProduct[]>([]);

export const allProductsAtom = atom<iProduct[] | null>(null);
export const currentReviewAtom = atom<iReview | null>(null);

export const currentUserAtom = atom(async () => {
  const res = await getUser();
  const user = res.data as iUser;
  return user;
});

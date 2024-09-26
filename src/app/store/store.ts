import { atom } from "jotai";
import { iProduct, iProductOwnerNotification, iReview, iUser, iUserNotification } from "../util/Interfaces";
import { getNotifications, getUser } from "../util/serverFunctions";
import { iNotification } from "../util/Interfaces";

export const notificationsAtom = atom<iNotification[]>([]);
export const userNotificationsAtom = atom<iUserNotification[]>([]);
export const ownerNotificationsAtom = atom<iProductOwnerNotification[]>([]);
export const allProductsStore = atom<iProduct[]>([]);

export const allProductsAtom = atom<iProduct[] | null>(null);
export const currentReviewAtom = atom<iReview | null>(null);

export const currentUserAtom = atom(async () => {
  const res = await getUser();
  const user = res.data as iUser;
  return user;
});

// export const AllNotificationsAtom = atom(async (get) => {
// const user = await get(currentUserAtom);
// const { userNotifications, ownerNotifications } = await getNotifications(user.id);
// return { userNotifications, ownerNotifications };
// })
export const badWordsAtom = atom<string[]>([]);


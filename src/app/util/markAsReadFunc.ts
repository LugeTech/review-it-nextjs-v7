import { useSetAtom } from "jotai";
import { iProductOwnerNotification, iUserNotification } from "./Interfaces";
import { markNotificationAsRead } from "./NotificationFunctions";
import { ownerNotificationsAtom, userNotificationsAtom } from "../store/store";

const handleMarkAsRead = async (
  notificationId: string,
  notificationType: "owner" | "user",
) => {
  const setONA = useSetAtom(ownerNotificationsAtom);
  const setUNA = useSetAtom(userNotificationsAtom);
  console.log("Attempting to mark notification as read", notificationType);
  try {
    const result = await markNotificationAsRead(
      notificationId,
      notificationType,
    );
    console.log("API call result:", result);

    if (notificationType === "owner") {
      setONA((prevNotifications: iProductOwnerNotification[]) => {
        const updatedNotifications = prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n,
        );
        console.log("Updated owner notifications:", updatedNotifications);
        return updatedNotifications;
      });
    } else {
      setUNA((prevNotifications: iUserNotification[]) => {
        const updatedNotifications = prevNotifications.map((n) =>
          n.id === notificationId ? { ...n, read: true } : n,
        );
        console.log("Updated user notifications:", updatedNotifications);
        return updatedNotifications;
      });
    }

    console.log("State update attempted");
  } catch (error) {
    console.error("Failed to mark notification as read:", error);
    alert("Failed to mark notification as read. Please try again.");
  }
};

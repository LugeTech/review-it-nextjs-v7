import { iReview, iUser, UserDATA } from "./Interfaces";

export function createUserForNotification(user: iUser) {
  console.log("creating user for notification", user);
  const notificationUrl = "https://reviewit-notifications.lugetech.com/users";
  fetch(notificationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: user.id,
      username: user.userName,
      full_name: `${user.firstName} ${user.lastName}`.trim(),
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Failed to send notification:",
          response.status,
          response.statusText,
        );
      } else {
        console.log("User notification sent successfully");
      }
    })
    .catch((error) => {
      console.error("Error sending notification:", error);
    });
}

// Function to create a business in the notification service
export function createBusinessForNotification(product: any) {
  const notificationUrl =
    "https://reviewit-notifications.lugetech.com/businesses";
  fetch(notificationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: product.id,
      user_id: product.ownerId || product.business?.ownerId,
      business_name: product.name,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Failed to create business notification:",
          response.status,
          response.statusText,
        );
      } else {
        console.log("Business notification created successfully");
      }
    })
    .catch((error) => {
      console.error("Error creating business notification:", error);
    });
}

export function createReviewNotification(review: iReview) {
  const notificationUrl =
    "https://reviewit-notifications.lugetech.com/notifications";
  fetch(notificationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      id: generateUniqueId(),
      user_id: review.product?.ownerId || review.product?.business?.ownerId,
      business_id: review.product?.id,
      review_title: review.title,
      from_name: review.createdBy,
      from_id: review.userId,
      read: false,
    }),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Failed to create review notification:",
          response.status,
          response.statusText,
        );
      } else {
        console.log("Review notification created successfully");
      }
    })
    .catch((error) => {
      console.error("Error creating review notification:", error);
    });
}

// Helper function to generate a unique ID (you may want to use a more robust method)
function generateUniqueId() {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

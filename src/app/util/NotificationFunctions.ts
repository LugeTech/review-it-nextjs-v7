import { iNotification, iUser, iProductOwnerNotification, iUserNotification } from "./Interfaces";

export function createProductOwnerNotification(review: any) {
  const notificationUrl = process.env.NEXT_PUBLIC_NOTIFICATION_SERVER_LOCAL + "/notifications/product-owner";
  const payload: iProductOwnerNotification = {
    id: generateUniqueId(),
    owner_id: review.product?.ownerId || review.product?.business?.ownerId,
    business_id: review.product?.businessId,
    review_title: review.title,
    from_name: review.createdBy,
    from_id: review.userId,
    read: false,
    product_id: review.product.id,
    product_name: review.product.name,
    review_id: review.id,
    comment_id: null,
    notification_type: "review"
  }
  console.log("Product Owner Notification payload:", payload);
  fetch(notificationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Failed to create product owner notification:",
          response.status,
          response.statusText,
        );
      } else {
        console.log("Product owner notification created successfully");
      }
    })
    .catch((error) => {
      console.error("Error creating product owner notification:", error);
    });
}

export function createUserNotification(notification: iUserNotification) {
  const notificationUrl = process.env.NEXT_PUBLIC_NOTIFICATION_SERVER_LOCAL + "/notifications/reply";

  // console.log("User Notification payload:", notification);
  fetch(notificationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(notification),
  })
    .then((response) => {
      if (!response.ok) {
        console.error(
          "Failed to create user notification:",
          response.status,
          response.statusText,
        );
      } else {
        console.log("User notification created successfully");
      }
    })
    .catch((error) => {
      console.error("Error creating user notification:", error);
    });
}

export function createUserForNotification(user: iUser) {
  console.log("creating user for notification", user);
  const notificationUrl = process.env.NEXT_PUBLIC_NOTIFICATION_SERVER_LOCAL + "/users";
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

export function createReviewNotification(review: any) {
  const notificationUrl = process.env.NEXT_PUBLIC_NOTIFICATION_SERVER_LOCAL + "/notifications";
  const payload: iNotification = {
    id: generateUniqueId(),
    receiver_id: review.product?.ownerId || review.product?.business?.ownerId,
    business_id: review.product?.businessId,
    review_title: review.title,
    from_name: review.createdBy,
    from_id: review.userId,
    read: false,
    product_id: review.product.id,
    product_name: review.product.name,
    review_id: "",
    comment_id: "",
  }
  console.log("this is the payload", payload)
  fetch(notificationUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload),
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
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

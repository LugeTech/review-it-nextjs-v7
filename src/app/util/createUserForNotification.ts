
export function createUserForNotification(user: any) {
  const notificationUrl = 'https://reviewit-notifications.lugetech.com/users';
  fetch(notificationUrl, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      id: user.id,
      username: user.userName,
      full_name: `${user.firstName} ${user.lastName}`.trim()
    })
  }).then(response => {
    if (!response.ok) {
      console.error('Failed to send notification:', response.status, response.statusText);
    } else {
      console.log('User notification sent successfully');
    }
  }).catch(error => {
    console.error('Error sending notification:', error);
  });
}

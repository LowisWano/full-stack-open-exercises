import { useNotifValue } from "../context/notificationContext";

const Notification = () => {
  const notification = useNotifValue()

  if (notification === null) {
    return null;
  }

  return <div className={notification.type}>{notification.message}</div>;
};

export default Notification;

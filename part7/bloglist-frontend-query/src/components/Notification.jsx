import { useNotifValue } from "../context/notificationContext";

const Notification = () => {
  const notification = useNotifValue();

  if (!notification) {
    return null;
  }

  const alertType = notification.type === 'success' ? 'alert-success' : 'alert-error';
  const iconPath = notification.type === 'success' 
    ? "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    : "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z";

  return (
    <div className="p-1">
      <div role="alert" className={`alert ${alertType}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-6 w-6 shrink-0 stroke-current"
          fill="none"
          viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d={iconPath} />
        </svg>
        <span>{notification.message}</span>
      </div>
    </div>
  );
};

export default Notification;

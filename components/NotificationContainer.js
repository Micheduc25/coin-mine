import React, { useState, forwardRef, useImperativeHandle } from "react";
import Notification from "./Notification";

const NotificationContainer = forwardRef((props, ref) => {
  const [notifications, setNotifications] = useState([]);

  useImperativeHandle(ref, () => ({
    addNotification: (message, type = "info", duration = 3000) => {
      const id = Date.now();
      setNotifications((prevNotifications) => [
        ...prevNotifications,
        { id, message, type, duration },
      ]);
    },
  }));

  const removeNotification = (id) => {
    setNotifications((prevNotifications) =>
      prevNotifications.filter((notification) => notification.id !== id)
    );
  };

  return (
    <div className="notification-container">
      {notifications.map(({ id, message, type, duration }) => (
        <Notification
          key={id}
          message={message}
          type={type}
          duration={duration}
          onClose={() => removeNotification(id)}
        />
      ))}
    </div>
  );
});

export default NotificationContainer;

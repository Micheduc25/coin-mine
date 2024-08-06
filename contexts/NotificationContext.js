import React, { createContext, useContext, useRef } from "react";
import NotificationContainer from "@/components/NotificationContainer";

const NotificationContext = createContext();

export const NotificationProvider = ({ children }) => {
  const notificationRef = useRef();

  const showNotification = (message, type, duration) => {
    notificationRef.current.addNotification(message, type, duration);
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
      <NotificationContainer ref={notificationRef} />
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);

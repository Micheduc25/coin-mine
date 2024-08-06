import React, { useState, useEffect } from "react";

const Notification = ({ message, type, duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    setIsVisible(true);
    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration - 300); // Start fading out 300ms before removal

    const removalTimer = setTimeout(() => {
      onClose();
    }, duration);

    return () => {
      clearTimeout(timer);
      clearTimeout(removalTimer);
    };
  }, [duration, onClose]);

  //   if (!isVisible) return null;

  return (
    <div className={`notification ${type} ${isVisible ? "show" : "hide"}`}>
      {message}
    </div>
  );
};

export default Notification;

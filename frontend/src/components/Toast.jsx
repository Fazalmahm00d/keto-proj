import { useState } from "react";
import { useEffect } from "react";

export const Toast = ({ message, type , onClose }) => {
  const alertClass = type === "success" ? "alert-success" : "alert-error";
  const [value,setValue]=useState("block")
  useEffect(() => {
    // Automatically close the toast after 3 seconds
    const timer = setTimeout(() => {
      if (onClose) setValue("hidden")
    }, 3000);

    // Cleanup timer if the component is unmounted before the timeout
    return () => clearTimeout(timer);
  }, [onClose]);

  return (
    <div className={`${value} toast toast-top toast-center sm:w-96 sm:h-32 w-full max-w-xs py-2 px-4 m-2`}>
      <div className={`alert ${alertClass} shadow-lg`}>
        <div className="flex gap-2 items-center text-white font-bold">
          {type === "success" ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-check-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0m-3.97-3.03a.75.75 0 0 0-1.08.022L7.477 9.417 5.384 7.323a.75.75 0 0 0-1.06 1.06L6.97 11.03a.75.75 0 0 0 1.079-.02l3.992-4.99a.75.75 0 0 0-.01-1.05z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="white"
              className="bi bi-x-circle-fill"
              viewBox="0 0 16 16"
            >
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z" />
            </svg>
          )}
          <span>{message}</span>
        </div>
        
      </div>
    </div>
  );
};

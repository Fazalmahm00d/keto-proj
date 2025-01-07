export const Toast = ({ message, type, onClose }) => {
    const alertClass = type === "success" ? "alert-success" : "alert-error";
  
    return (
      <div className={`toast toast-top toast-center w-96  h-32`}>
        <div className={`alert ${alertClass} shadow-lg`}>
          <div className="flex gap-2 items-center text-white font-bold">
            {type === "success" ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-8 w-8"
                fill="none"
                viewBox="-6 3 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m0 6a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="stroke-current flex-shrink-0 h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
            <span>{message}</span>
          </div>
          <button onClick={onClose} className="btn btn-sm btn-ghost">
            Close
          </button>
        </div>
      </div>
    );
  };

  
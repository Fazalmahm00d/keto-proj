import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteItem } from "../lib/cartapi";
import { useState } from "react";
import { useSelector } from "react-redux";

function DeleteBtnComponent(props) {
    const queryClient = useQueryClient();
    const isEmail = useSelector((state) => state.authReducer.isEmail);
    const [showToast, setShowToast] = useState(false);

    function deleteHandler(id) {
        const obj = {
            isEmail,
            id,
        };
        if (!deleteMutate.isPending) {
            deleteMutate.mutate(obj);
        }
    }

    const deleteMutate = useMutation({
        mutationFn: deleteItem,
        onSuccess: () => {
            queryClient.invalidateQueries(["get cart data", isEmail]);
            setShowToast(true);

            // Hide the toast after 3 seconds
            setTimeout(() => setShowToast(false), 3000);
        },
        onError: (error) => {
            console.error("Error:", error);
        },
    });

    return (
        <div className="flex flex-col items-center">
            {showToast && (
                <div className="fixed top-4 right-4 sm:top-6 sm:right-6 toast">
                    <div className="alert alert-success shadow-lg flex items-center gap-2 p-3 sm:p-4 rounded-lg">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-6 w-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                            />
                        </svg>
                        <span className="font-semibold text-white">
                            Item deleted successfully!
                        </span>
                        <button
                            className="btn btn-xs btn-circle btn-outline text-white hover:bg-green-100"
                            onClick={() => setShowToast(false)}
                        >
                            ✕
                        </button>
                    </div>
                </div>
            )}
            {deleteMutate.isPending ? (
                <div className="animate-spin rounded-full h-8 w-8 sm:h-10 sm:w-10 border-t-4 border-blue-500 border-solid border-gray-300"></div>
            ) : (
                <button
                    onClick={() => deleteHandler(props.item)}
                    className="flex items-center justify-center p-2 sm:p-3 bg-red-600 hover:bg-red-700 text-white rounded-full"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="22"
                        height="22"
                        fill="currentColor"
                        className="bi bi-trash3"
                        viewBox="0 0 16 16"
                    >
                        <path d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                    </svg>
                </button>
            )}
        </div>
    );
}

export default DeleteBtnComponent;

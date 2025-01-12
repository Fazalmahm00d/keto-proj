import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateCart } from "../lib/cartapi";
import { dataAction } from "../ReduxStore/dataCart";

function AddBtnComponent(props) {
  const dispatch = useDispatch();
  const isEmail = useSelector((state) => state.authReducer.isEmail);
  const [showToast, setShowToast] = useState(false);

  const queryClient = useQueryClient();
  const cartMutate = useMutation({
    mutationFn: updateCart,
    onSuccess: (response) => {
      // Invalidate to trigger a refetch
      queryClient.invalidateQueries(["get cart data"]);

      // If you have the cart data in the response
      if (response?.data?.user?.cart) {
        dispatch(dataAction.setCartArr(response.data.user.cart));
        console.log("calling on success");
        // Optionally update the query data immediately
        queryClient.setQueryData(["get cart data"], response.data.user.cart);
        setShowToast(true);

        // Hide the toast after 3 seconds
        setTimeout(() => setShowToast(false), 3000);
      }
    },
    onError: (error) => {
      console.error("Cart update error:", error);
    }
  });

  async function sendToFb(id) {
    console.log("send2fb called");
    const obj = {
      isEmail,
      newCartItem: {
        productId: id,
        quantity: 1
      }
    };
    cartMutate.mutate(obj);
  }

  return (
    <div className="relative">
      {showToast && (
        <div className="fixed top-0 right-0 m-4 z-50">
          <div className="alert alert-success shadow-lg flex items-center gap-2">
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
              Item added successfully!
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
      <button
        disabled={cartMutate.isPending}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          sendToFb(props.item);
        }}
        className="border-2 border-gray-900 rounded-3xl p-3 w-full my-2 sm:w-48 text-base md:absolute md:top-14   sm:transform-none"
      >
        {cartMutate.isPending ? (
          <span className="loading loading-dots loading-sm "></span>
        ) : (
          "Add to Order"
        )}
      </button>
    </div>
  );
}

export default AddBtnComponent;

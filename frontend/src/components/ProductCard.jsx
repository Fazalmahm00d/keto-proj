import React from "react";
import AddBtnComponent from "./AddBtn";
import { Link } from "react-router-dom";

function ProductCard(props) {
  return (
    <Link to={`/menu/${props.data._id}`}>
    <div className=" h-auto md:h-[18rem] p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-6">
      {/* Left Section */}
      <div className="flex-1 flex flex-col justify-between">
        <h3 className="text-2xl font-semibold text-gray-800">{props.data.name}</h3>
        <p className="text-xl text-gray-600 mt-2">{props.data.price}</p>
        {/* <button
          className="mt-4 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add to Order
        </button> */}
        <AddBtnComponent/>
      </div>

      {/* Right Section */}
      <div className="flex-1 max-w-[300px] md:max-w-[400px]">
        <img
         src={props.data.img}
          alt={props.data.name}
          className="w-full h-full object-cover rounded-lg border-2 border-gray-200"
        />
      </div>
    </div>
    </Link>
  );
}

export default ProductCard;

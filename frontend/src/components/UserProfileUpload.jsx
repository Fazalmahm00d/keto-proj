import { useMutation, useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { getUser, updateProfile } from "../lib/cartapi";
import { Toast } from "./Toast";
import { useSelector } from "react-redux";

const UserProfile = () => {
  const isEmail = useSelector((state)=>state.authReducer.isEmail)
  const [imageUrl, setImageUrl] = useState(null); // State for the uploaded image URL
  const [userName,setUserName]=useState(null);
  const [loading, setLoading] = useState(false); // State to show loading spinner
  const [showToast, setShowToast] = useState(false);
  const [errorToast, setErrorToast] = useState(false);
  const [isUpdate,setUpdate]=useState(false);
  const {
    data: userData,
    isLoading: userDataLoading,
    isError: userDataError,
  } = useQuery({
    queryKey: ["get user data"],
    queryFn: () => getUser(isEmail),
    enabled: !!isEmail,
  });
  const userMutation=useMutation({
    mutationFn:updateProfile,
    onSuccess:()=>{
        setShowToast(true);
    },
    onError:()=>{
        setErrorToast(true);
    }
  })
  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Get the selected file
    if (!file) return;
  
    setLoading(true); // Start loading spinner
  
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "ketodalia"); // Replace with your preset
  
    try {
      const response = await fetch(
        "https://api.cloudinary.com/v1_1/dfn1w6gts/image/upload", // Replace with your Cloudinary URL
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await response.json();
  
      // Validate the response
      if (data?.public_id && data?.secure_url) {
        console.log("Response Data:", data);
        console.log(isEmail,data.public_id)
        // Prepare the object for the mutation
        const obj = {
          isEmail, // Ensure isEmail is a valid email
          publicId: data.public_id,
        };
  
        // Trigger the mutation
        if (isEmail) {
          userMutation.mutate(obj);
        }
  
        // Update the image URL for display
        setImageUrl(data.secure_url);
        console.log("Uploaded Image URL:", data.secure_url);
      } else {
        throw new Error("Invalid Cloudinary response: Missing public_id or secure_url.");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
    } finally {
      setLoading(false); // Stop loading spinner
    }
  };
  
  useEffect(()=>{
    if(userData){
        const publicId=userData.user.profile
        setImageUrl(`https://res.cloudinary.com/dfn1w6gts/image/upload/${publicId}`)
        setUserName(userData.user.username)
    }
  },[userData])
  return (
    <div className="flex flex-col items-center justify-start  bg-gray-100 min-w-[300px] py-10">
        {showToast && (
            <div className="fixed toast toast-top toast-end">
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
                <span className="font-semibold text-white">Profile updated successfully!</span>
                <button
                  className="btn btn-xs btn-circle btn-outline text-white hover:bg-green-100"
                  onClick={() => setShowToast(false)} // Replace with your close logic
                >
                  ✕
                </button>
              </div>
            </div>
          )}
          {errorToast && (
  <div className="fixed top-0 right-0 m-4 z-50">
    <div className="alert alert-error shadow-lg flex items-center gap-2">
      
      <span className="font-semibold text-white">
      Profile update error
      </span>
      <button
        className="btn btn-xs btn-circle btn-outline text-white hover:bg-red-700"
        onClick={() => setErrorToast(false)}
        aria-label="Close notification"
      >
        ✕
      </button>
    </div>
  </div>
)}
  <h1 className="text-2xl font-bold mb-4 ">User Profile</h1>

  {imageUrl && (
    <div className="mt-4">
      <img
        src={imageUrl}
        alt="Uploaded Profile"
        className="w-32 h-32 rounded-full border-4 border-gray-300"
      />
    </div>
  )}
  {userName && (
    <div className="my-4 font-bold text-xl">
      {userName}
    </div>
  )}
  {isUpdate ? <input
    type="file"
    accept="image/*"
    onChange={handleFileChange}
    className="px-4 py-2 bg-white border border-gray-300 rounded hover:border-gray-400"
  />:<button onClick={()=>{
    setUpdate(true);
  }} className="bg-blue-600 text-white px-4 py-2 ">Update Profile Picture</button>}
  {loading && <p className="text-blue-500 mt-2">Uploading...</p>}
</div>

  );
};

export default UserProfile;

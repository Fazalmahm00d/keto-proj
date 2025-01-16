import { useNavigate } from "react-router-dom";

function LocBanner() {
  const navigate=useNavigate()
    return (
      <div className="relative">
        <div className="relative flex justify-center items-center">
          <img
            className="w-full h-[300px] md:h-[400px] lg:h-[560px] object-cover"
            src="//www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=1500"
            srcSet="//www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=375 375w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=550 550w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=750 750w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=1100 1100w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=1500 1500w"
            alt="Ketodelia Takeout Restaurant"
            sizes="100vw"
            loading="lazy"
          />
          <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-30 z-30">
            <div onClick={()=>{
              navigate('/location')
            }} className="bg-white cursor-pointer text-[#3d081b] text-xl md:text-3xl lg:text-5xl px-6 py-4 font-bold border-2 rounded-lg border-[rgba(61,8,27,0.75)] shadow-lg text-center">
              Our Locations & Hours
            </div>
          </div>
        </div>
      </div>
    );
  }
  
  export default LocBanner;
  
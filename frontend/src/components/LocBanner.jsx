function LocBanner(){
    return(
        <div className="relative">
            <div className="relative justify-center items-center"><img className="w-full h-[560px] "
            src="//www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=1500" srcset="//www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=375 375w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=550 550w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=750 750w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=1100 1100w, //www.ketodelia.ca/cdn/shop/files/Ketodelia_Takeout_Restaurant.jpg?v=1696295373&amp;width=1500 1500w" width="810" height="540.0" loading="lazy" sizes="100vw"></img>
            <div className="absolute top-0 right-0 left-0 w-100 h-full flex justify-center items-center border-2 z-30">
                <div className="absolute bg-white text-[#3d081b] text-5xl p-[20px] font-bold z-50 border-2 rounded-lg border-[rgba(61,8,27,0.75)] shadow-[rgba(61,8,27,0.75)_6px_15px_6px_0px]">
                    Our Locations & Hours 
                </div>
            </div>
            </div>
            
        </div>
    )
}
export default LocBanner;
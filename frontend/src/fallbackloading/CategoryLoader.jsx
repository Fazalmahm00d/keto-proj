function CategoriesLoadingFallback() {
    return (
      <div className="w-full min-h-[300px] md:h-[40rem] lg:h-[50rem] text-[rgba(61,8,27,0.75)] p-4 md:p-0 animate-pulse">
        {/* Image Placeholder */}
        <div
          className="overflow-hidden h-[200px] md:h-[50%] w-full 
            border-2 rounded-lg  bg-gray-300"
        ></div>
  
        {/* Text Content Placeholder */}
        <div className="relative h-auto md:h-[50%] mt-4 space-y-2 md:space-y-4">
          {/* Title Placeholder */}
          <div className="h-6 w-1/2 bg-gray-300 rounded"></div>
  
          {/* Description Placeholder */}
          <div className="space-y-2">
            <div className="h-5 w-full bg-gray-300 rounded"></div>
            <div className="h-5 w-5/6 bg-gray-300 rounded"></div>
            <div className="h-5 w-3/4 bg-gray-300 rounded"></div>
          </div>
  
          {/* Price Placeholder */}
          <div className="h-6 w-1/4 bg-gray-300 rounded mt-2"></div>
        </div>
      </div>
    );
  }
  
  export default CategoriesLoadingFallback;
  
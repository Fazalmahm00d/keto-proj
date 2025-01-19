
function LoadingFallback() {
    return (
        <div className="h-auto md:h-[18rem] p-4 md:p-6 bg-white shadow-lg rounded-lg flex flex-col md:flex-row gap-4 md:gap-6 animate-pulse">
          <div className="w-full md:flex-1 md:max-w-[400px]">
            <div className="w-full h-[250px] md:h-full bg-gray-300 rounded-lg"></div>
          </div>
          <div className="flex-1 flex flex-col justify-between py-2 md:py-0">
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-4"></div>
            <div className="h-5 w-1/2 bg-gray-300 rounded mb-2"></div>
            <div className="h-5 w-1/4 bg-gray-300 rounded mb-4"></div>
            <div className="mt-4 md:mt-0">
              <div className="h-10 w-20 bg-gray-300 rounded"></div>
            </div>
          </div>
        </div>
      );
}

export default LoadingFallback;

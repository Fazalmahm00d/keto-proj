function Banner() {
    return (
      <div className="flex justify-center items-center p-4">
        <div className="flex flex-col lg:flex-row w-full lg:w-[70%] h-auto lg:h-[450px] border-2 rounded-lg border-gray-900 shadow-[black_2px_8px_2px_0px] overflow-hidden">
          <div className="flex justify-start items-center w-full lg:w-[50%] p-6 lg:pl-10">
            <div className="text-center lg:text-left">
              <div className="text-lg md:text-xl font-medium">From Our Bakery</div>
              <div className="text-3xl md:text-5xl font-bold tracking-tight mt-3">
                Keto Red Velvet Cake 8”
              </div>
              <div className="text-sm md:text-lg font-light mt-5">
                Sugar-free low carb red velvet cake is naturally colored and
                sugar-free.
              </div>
            </div>
          </div>
          <div className="w-full lg:w-[50%] border-gray-900">
            <img
              className="h-full w-full object-cover object-top"
              src="https://www.ketodelia.ca/cdn/shop/files/Keto_Red_Velvet_Cake_1662917780.png?v=1668492270&width=750"
              alt="Keto Red Velvet Cake"
            />
          </div>
        </div>
      </div>
    );
  }
  export default Banner;
  
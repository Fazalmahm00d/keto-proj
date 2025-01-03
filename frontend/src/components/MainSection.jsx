function MainSection() {
    return (
      <div className="relative w-full">
        <div
          className="h-[560px] bg-[rgba(#000000)] bg-gradient-to-r from-[rgba(100,13,152,0.3)] to-[rgba(100,13,152,0.1)]"
        >
          <div className='absolute w-[40%] h-[100%] flex flex-col justify-center items-start text-[#3d081b] ml-[7rem]' >
            <h1 className='align-left text-5xl font-bold'>LESS CARBS,MORE DELICIOUS</h1>
            <h3 className='text-xl mt-3'>KETO FRIENDLY LOW CARB 100% GLUTEN FREE</h3>
            <div className='mt-5'><button className='text-white bg-[#94619a] rounded-3xl text-l p-3 px-[30px] w-[100%]'>Order Online</button></div>
          </div>
          <img
            src="//www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824"
            alt="Keto Burger"
            srcSet="//www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=375 375w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=550 550w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=750 750w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=1100 1100w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=1500 1500w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=1780 1780w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=2000 2000w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=3000 3000w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=3840 3840w"
            className="w-full h-full object-cover"
          />
          
  
        </div>
      </div>
    );
  }

  export default MainSection;
import React from 'react';

import { useNavigate } from "react-router-dom";


function MainSection() {
  const navigate=useNavigate();
  const handleClick=()=>{
    navigate('/menu')
  }
    return (
      <div className="relative w-full">
 <div className="min-h-[300px] md:h-[560px] bg-[rgba(#000000)] bg-gradient-to-r from-[rgba(100,13,152,0.3)] to-[rgba(100,13,152,0.1)]">
   
   <div className='absolute w-full md:w-[40%] h-full flex flex-col justify-center items-center md:items-start text-[#3d081b] px-4 md:ml-[7rem] text-center md:text-left z-10'>
     <h1 className='text-3xl md:text-5xl font-bold leading-tight'>
       LESS CARBS,
       <br className="md:hidden" /> 
       MORE DELICIOUS
     </h1>
     
     <p className='text-lg md:text-xl mt-3 px-2 md:px-0'>
       KETO FRIENDLY LOW CARB 100% GLUTEN FREE
     </p>
     
     <div className='mt-5 w-full md:w-auto'>
       <button aria-label="Order btn" onClick={handleClick} className='text-white bg-[#94619a] rounded-3xl text-l p-3 px-[30px] w-full md:w-auto min-w-[200px]'>
         Order Online
       </button>
     </div>
   </div>

   <img
     src="//www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824"
     alt="Keto Burger"
     srcSet="//www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=375 375w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=550 550w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=750 750w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=1100 1100w, //www.ketodelia.ca/cdn/shop/files/Keto_Burger_-_shifted.png?v=1664321824&amp;width=1500 1500w"
     className="w-full h-full object-cover absolute top-0 left-0"
     loading="eager"
   />
 </div>
</div>
    );
  }

  export default MainSection;
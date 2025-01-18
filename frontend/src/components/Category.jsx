import { Link } from "react-router-dom";

function Category(props) {
   return (
       <div data-testid="category-container" className="w-full  p-4 text-[rgba(61,8,27,0.75)]">
           <Link to={'/menu'}>
               <div className="overflow-hidden ">
                   <img 
                       className='w-full h-[12rem] sm:h-[16rem] lg:h-[20rem] object-cover
                           border-2 rounded-lg border-[rgba(61,8,27,0.75)] 
                           transition-transform duration-500 hover:scale-110 hover:shadow-none '
                       src={props.img} 
                       alt={props.data}
                   />
               </div>
               <div className="mt-2 md:mt-4 flex items-center font-bold text-base md:text-l px-2 md:ml-5 
                   after:content-['\2192'] after:ml-2 after:text-xl cursor-pointer">
                   <p className="decoration-none hover:underline">
                       {props.data}
                   </p>
               </div>
           </Link>
       </div>
   )
}

export default Category;
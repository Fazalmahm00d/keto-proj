import { Link } from "react-router-dom";

function Categories(props){
   return(
       <Link to={`/menu/${props.data._id}`}>
           <div className="w-full min-h-[300px] md:h-[40rem] lg:h-[50rem] text-[rgba(61,8,27,0.75)] p-4 md:p-0">
               <div className="overflow-hidden h-[200px] md:h-[50%] w-full 
                   border-2 rounded-lg border-[rgba(61,8,27,0.75)] 
                   shadow-[rgba(61,8,27,0.75)_1px_15px_1px_0px]">
                   <img 
                       className='h-full w-full object-cover
                           transition-transform duration-500 hover:scale-110'
                       src={props.data.img} 
                       alt={props.data.name}
                   />
               </div>

               <div className="relative h-auto md:h-[50%] mt-4 space-y-2 md:space-y-4">
                   <div className="text-sm md:text-base font-bold">
                       <p>{props.data.name}</p>
                   </div>
                   <div className="text-sm md:text-base font-light line-clamp-3 md:line-clamp-none">
                       {props.data.description}
                   </div>
                   <div className="text-lg md:text-xl font-medium mt-2">
                       {props.data.price}
                   </div>
               </div>
           </div>
       </Link>
   )
}

export default Categories;
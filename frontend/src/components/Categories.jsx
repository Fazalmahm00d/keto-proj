import { Link } from "react-router-dom";

function Categories(props){
   return(
       <Link to={`/menu/${props.data._id}`}>
           <div className="w-full min-h-[300px] md:h-[40rem] lg:h-[50rem] text-[rgba(61,8,27,0.75)] p-4 md:p-0">
               <div className="overflow-hidden h-[200px] md:h-[50%] w-full 
                   border-2 rounded-lg border-[rgba(61,8,27,0.75)] 
                   shadow-[rgba(61,8,27,0.75)_1px_8px_1px_0px]">
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
                   <div className="text-lg md:text-xl font-medium mt-2 flex gap-2 items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-currency-dollar" viewBox="0 0 16 16">
                <path d="M4 10.781c.148 1.667 1.513 2.85 3.591 3.003V15h1.043v-1.216c2.27-.179 3.678-1.438 3.678-3.3 0-1.59-.947-2.51-2.956-3.028l-.722-.187V3.467c1.122.11 1.879.714 2.07 1.616h1.47c-.166-1.6-1.54-2.748-3.54-2.875V1H7.591v1.233c-1.939.23-3.27 1.472-3.27 3.156 0 1.454.966 2.483 2.661 2.917l.61.162v4.031c-1.149-.17-1.94-.8-2.131-1.718zm3.391-3.836c-1.043-.263-1.6-.825-1.6-1.616 0-.944.704-1.641 1.8-1.828v3.495l-.2-.05zm1.591 1.872c1.287.323 1.852.859 1.852 1.769 0 1.097-.826 1.828-2.2 1.939V8.73z"/>
                </svg> {props.data.price}
                   </div>
               </div>
           </div>
       </Link>
   )
}

export default Categories;
import { Link } from "react-router-dom";

function Categories(props){

    return(
        <Link to={`/menu/${props.data._id}`}>
        <div className="w-full h-[60rem] text-[rgba(61,8,27,0.75)] ">
            <div className="overflow-hidden h-[50%] w-[100%] border-2 rounded-lg border-[rgba(61,8,27,0.75)] shadow-[rgba(61,8,27,0.75)_1px_15px_1px_0px] ">
            <img className='h-full w-full hover:transition-transform hover:duration-500 hover:scale-110 'src={props.data.img} alt=""></img></div> 
            <div className="relative h-[50%] mt-4">
                <div className=" text-base font-bold"><a href="">{props.data.name}</a></div>
                <div className="text-base font-light mt-2">{props.data.description}</div>
                <div className="text-xl font-medium ">{props.data.price}
                </div>
            </div>
        </div>
        </Link>
    )
}
export default Categories;

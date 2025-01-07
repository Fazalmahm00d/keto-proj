import { Link } from "react-router-dom";

function Category(props){
    return(
        <div className=" w-[20%] h-[70%] text-[rgba(61,8,27,0.75)] ">
            <Link to={'/menu'}>
            <img className='h-[20rem] border-2 rounded-lg border-[rgba(61,8,27,0.75)] shadow-[rgba(61,8,27,0.75)_6px_15px_6px_0px]  hover:transition-transform hover:duration-500 hover:scale-110 hover:shadow-none 'src={props.img} alt=""></img>
            <div className="mt-4 font-bold text-l ml-5 after:content-['\2192'] after:ml-2 after:text-xl cursor-pointer "><a className="decoration-none hover:underline">{props.data}</a></div>
            </Link>
        </div>
    )
}
export default Category;
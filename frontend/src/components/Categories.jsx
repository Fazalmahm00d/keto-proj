function Categories(props){

    return(
        <div className="w-[25%] h-[80%] text-[rgba(61,8,27,0.75)] ">
            <div className="overflow-hidden h-[50%] w-[100%] border-2 rounded-lg border-[rgba(61,8,27,0.75)] shadow-[rgba(61,8,27,0.75)_1px_15px_1px_0px] ">
            <img className='h-full w-full hover:transition-transform hover:duration-500 hover:scale-110 'src={props.data.img} alt=""></img></div> 
            <div className="relative h-[50%] mt-4">
                <div className=" text-base font-bold"><a href="">{props.data.head}</a></div>
                <div className="text-base font-light mt-2">{props.data.descr}</div>
                <div className="text-xl font-medium absolute bottom-10">{props.data.price}
                </div>
            </div>
        </div>
    )
}
export default Categories;

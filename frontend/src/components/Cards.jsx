function Cards(props){
    return(
        <div className="flex gap-[10px] w-[80%]">
        <div className="mx-5 border-2 bg-[#3d081b] w-[100%] h-[6.5rem] bg-opacity-5 border-[rgba(61,8,27,0.75)]  shadow-[rgba(61,8,27,0.75)_6px_15px_6px_0px] rounded-lg ">
            <div className="px-[10px] py-[20px] text-xl  font-bold text-[#3d081b]">
             ${props.data}
            </div>
        </div>
        </div>
    )
}
export default Cards;
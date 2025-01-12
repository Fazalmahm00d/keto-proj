function Cards(props) {
    return (
        <div className="flex gap-[10px] w-full md:w-[80%] px-4 md:px-0">
            <div className="w-full h-auto min-h-[6.5rem] mx-2 md:mx-5 p-4 md:p-5
                border-2 bg-[#3d081b] bg-opacity-5 
                border-[rgba(61,8,27,0.75)] 
                shadow-[rgba(61,8,27,0.75)_6px_15px_6px_0px] 
                rounded-lg">
                <div className="text-base md:text-xl font-bold text-[#3d081b]">
                    {props.data}
                </div>
            </div>
        </div>
    )
 }
 
 export default Cards;
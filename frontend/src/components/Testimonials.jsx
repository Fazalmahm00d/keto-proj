function Testimonials(props) {
    return (
        <div className="h-[35rem] w-full text-[rgba(61,8,27,0.75)] md:mx-auto">
            <div className="relative flex justify-center h-[200px] md:h-[60%] w-full">
                <img 
                    className='w-full h-full object-center'
                    src={props.data.img} 
                    alt={props.data.name}
                />
                <div className="border-2 w-[60px] md:w-[20%] absolute bottom-[-20px] md:bottom-[-30px] 
                    text-center rounded-full p-3 md:p-5 bg-gray-200 
                    text-sm md:text-xl z-50">
                    {props.data.avtext}
                </div>
            </div>
 
            <div className="relative bg-[#f5eff5] min-h-[200px] md:h-[50%] 
                flex flex-col items-center justify-center 
                py-[20px] px-4 md:px-[30px]">
                <div className="text-base md:text-l font-bold mt-5">
                    {props.data.name}
                </div>
                <div className="text-[10px] md:text-[12px] font-medium">
                    {props.data.date}
                </div>
                <div className="text-sm md:text-base font-light mt-3 md:mt-5 
                    text-center max-h-[120px] md:h-[50%] overflow-y-auto">
                    {props.data.testimonial}
                </div>
            </div>
        </div>
    )
 }
 
 export default Testimonials;
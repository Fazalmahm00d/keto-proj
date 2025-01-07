function Testimonials(props){
    return(
        
            <div className="h-[400px] text-[rgba(61,8,27,0.75)] ">
            <div className="relative flex justify-center h-[50%] w-[100%]  ">
            <img className='w-full'src={props.data.img} alt=""></img>
            <div className="border-2 w-[20%]  absolute bottom-[-30px] text-center rounded-full p-5 bg-gray-200 text-xl z-50">{props.data.avtext}</div>
            </div>
            <div className="relative bg-[#f5eff5] h-[50%]  flex flex-col items-center justify-center py-[20px] px-[30px] ">
                <div className=" text-l font-bold mt-5">{props.data.name}</div>
                <div className="text-[12px] font-medium ">{props.data.date}</div>
                <div className="text-base font-light mt-5 text-center h-[50%]">{props.data.testimonial}
                </div>
            </div>
        </div>
    
    )
}

export default Testimonials
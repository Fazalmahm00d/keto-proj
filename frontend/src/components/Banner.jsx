function Banner(){
    return(
        <div className="h-[450px] flex justify-center items-center">
            <div className="flex  w-[70%] h-[80%] border-2 rounded-lg border-gray-900 shadow-[black_6px_15px_6px_0px] overflow-hidden">
                <div className="w-[50%] w-[50%] flex justify-start items-center ">
                    <div className="w-[70%] pl-10">
                    <div className="text-xl font-medium">From Our Bakery</div>
                    <div className="text-5xl font-bold tracking-tightest mt-3">Keto Red Velvet Cake 8”</div>
                    <div className="text-l font-light mt-5">Sugar-free low carb red velvet cake is naturally colored and sugar-free.</div></div>
                </div>
                <div className="w-[50%] border-gray-900 overflow-hidden">
                    <img className="h-full w-full"src="https://www.ketodelia.ca/cdn/shop/files/Keto_Red_Velvet_Cake_1662917780.png?v=1668492270&width=750" alt="" />
                </div>
            </div>
        </div>
    )
}
export default Banner
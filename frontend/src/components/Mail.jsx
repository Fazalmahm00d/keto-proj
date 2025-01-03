function Mail(){
    return(
        <div className="h-[265px] bg-[#f5eff5] text-[#3d091bbf] border-2 border-[rgba(61,8,27,0.75)] shadow-[rgba(61,8,27,0.75)_6px_15px_6px_0px] flex flex-col justify-center items-center">
            <h2 className="text-4xl font-bold">Stay in the Loop</h2>
            <p className="mt-5 text-xl font-light">Be the first to know about new collections and exclusive offers.</p>
            <input className="p-3 mt-10 w-[25%] text-xl border-4 rounded-lg border-[rgba(61,8,27,0.75)] " type="text" placeholder="Email" />
             
        </div>
    )
}

export default Mail;
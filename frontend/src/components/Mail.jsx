function Mail() {
    return (
      <div className="h-auto py-8 bg-[#f5eff5] text-[#3d091bbf] border-2 border-[rgba(61,8,27,0.75)] shadow-[rgba(61,8,27,0.75)_3px_8px_3px_0px] flex flex-col justify-center items-center">
        <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-center">
          Stay in the Loop
        </h2>
        <p className="mt-5 text-sm md:text-lg lg:text-xl font-light text-center px-4">
          Be the first to know about new collections and exclusive offers.
        </p>
        <input
          className="p-3 mt-6 w-[90%] md:w-[60%] lg:w-[30%] text-base md:text-lg lg:text-xl border-4 rounded-lg border-[rgba(61,8,27,0.75)] focus:outline-none"
          type="text"
          placeholder="Email"
        />
      </div>
    );
  }
  
  export default Mail;
  
function ContactForm() {
    return (
        <form className="flex flex-col w-full max-w-2xl gap-4 sm:m-10" action="">
            <h1 className="text-2xl font-bold mb-2">Contact Form</h1>
            
            <div className="w-full flex flex-col sm:flex-row gap-6">
                <input 
                    className="w-full sm:w-[50%] text-[#3d081bbf] text-xl h-12 placeholder:text-[#3d081bbf] placeholder:text-lg border-[#3d081b] border-[0.1rem] px-5 border-b-[0.25rem] rounded-2xl focus:outline-none" 
                    type="text" 
                    placeholder="Name" 
                />
                <input 
                    className="w-full sm:w-[50%] text-[#3d081bbf] text-xl h-12 placeholder:text-[#3d081bbf] placeholder:text-lg border-[#3d081b] border-[0.1rem] px-5 border-b-[0.25rem] rounded-2xl focus:outline-none" 
                    type="email" 
                    placeholder="Email *" 
                />
            </div>
            
            <input 
                className="w-full text-[#3d081bbf] text-xl placeholder:text-[#3d081bbf] placeholder:text-lg h-12 border-b-[0.25rem] border-[#3d081b] border-[0.1rem] px-5 rounded-2xl focus:outline-none" 
                type="text" 
                placeholder="Phone number" 
            />
            
            <textarea 
                className="h-40 border-[#3d081b] border-[0.1rem] px-5 py-4 border-b-[0.25rem] rounded-2xl placeholder:text-[#3d081bbf] placeholder:text-lg text-xl text-[#3d081bbf] focus:outline-none" 
                placeholder="Comment"
            ></textarea>
            
            <button 
                className="bg-[#94619a] text-white px-16 py-4 uppercase font-medium text-base rounded-full mt-2 hover:bg-[#815287] transition-colors duration-300 w-fit"
            >
                Send
            </button>
        </form>
    );
}

export default ContactForm;
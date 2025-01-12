function ContactForm() {
    return (
        <form className="flex flex-col w-full max-w-2xl gap-5 m-5 sm:m-10" action="">
            <div className="w-full flex flex-col sm:flex-row gap-2">
                <input className="w-full sm:w-[50%] text-[#3d081bbf] text-xl h-[3rem] placeholder:text-[#3d081bbf] placeholder:text-lg border-[#3d081b] border-[0.2rem] px-5 border-b-[0.4rem] rounded-2xl" type="text" placeholder="Name" />
                <input className="w-full sm:w-[50%] text-[#3d081bbf] text-xl h-[3rem] placeholder:text-[#3d081bbf] placeholder:text-lg border-[#3d081b] border-[0.2rem] px-5 border-b-[0.4rem] rounded-2xl" type="email" placeholder="Email *" />
            </div>
            <input className="w-full text-[#3d081bbf] text-xl placeholder:text-[#3d081bbf] placeholder:text-lg h-[3rem] border-b-[0.4rem] border-[#3d081b] border-[0.2rem] px-5 rounded-2xl" type="text" placeholder="Phone number" />
            <input type="text" className="h-[10rem] border-[#3d081b] border-[0.2rem] px-5 border-b-[0.4rem] rounded-2xl placeholder:text-[#3d081bbf] placeholder:text-xl" placeholder="Comment"></input>
            <div>
                <button className="bg-[#94619a] text-white px-8 py-2 uppercase font-medium text-base rounded-full">Send</button>
            </div>
        </form>
    );
}
export default ContactForm;

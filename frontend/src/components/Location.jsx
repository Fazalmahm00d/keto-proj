import Footer from "./Footer"
import Header from "./Header"

function Location(){
    return (
        <div>
            <Header/>
            <iframe className="border-2 border-gray-300 rounded-md w-full md:h-[45rem]" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d39073.02019815009!2d-79.41440892812653!3d43.72441349697871!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x882b2d3f97b799fb%3A0xf01f4d1d14e8a314!2sKetodelia%20Keto%20Restaurant!5e0!3m2!1sen!2sin!4v1736749382215!5m2!1sen!2sin" width="600" height="450"  allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>
            <Footer/>
        </div>
    )
}

export default  Location
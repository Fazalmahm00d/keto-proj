import Header from "./Header";
import Footer from "./Footer";
import Description3 from "./Description3";
import ContactForm from "./ContactForm";
import { Helmet } from "react-helmet";

function Contact() {
    return (
        <div>
            <Helmet>
            <title>Contact Us | My Awesome Website</title>
            <meta name="description" content="Welcome to My Awesome Website!" />
            </Helmet>
            <Header/>
            <div className="container max-w-7xl lg:mx-auto lg:px-10 flex flex-col items-center justify-center ">
                <div className="hidden sm:block w-full ">
                    <Description3></Description3>
                </div>
                <div className="w-full  ">
                    <ContactForm></ContactForm>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Contact;

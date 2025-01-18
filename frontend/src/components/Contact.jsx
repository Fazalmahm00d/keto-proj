import Header from "./Header";
import Footer from "./Footer";
import Description3 from "./Description3";
import ContactForm from "./ContactForm";

function Contact(props) {
    return (
        <div>
            <Header Authenticator={props.isAuthenticate} setIsAuthenticate={props.setIsAuthenticate}></Header>
            <div className="flex flex-col items-center justify-center px-5 md:px-10 lg:px-16">
                <div className="hidden sm:block w-full max-w-4xl">
                    <Description3></Description3>
                </div>
                <div className="w-full max-w-4xl mt-8">
                    <ContactForm></ContactForm>
                </div>
            </div>
            <Footer></Footer>
        </div>
    );
}

export default Contact;

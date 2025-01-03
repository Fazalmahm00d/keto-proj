import Header from "./Header";
import Footer from "./Footer";
import Description3 from "./Description3";
import ContactForm from "./ContactForm";


function Contact(props){

    return(
        <div>
            <Header Authenticator={props.isAuthenticate} setIsAuthenticate={props.setIsAuthenticate}></Header>
            <div className="flex flex-col items-center">
                <Description3></Description3>
                <ContactForm></ContactForm>
            </div>

            <Footer></Footer>

        </div>
    )
}

export default Contact;
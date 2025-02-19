import Header from "./Header";
import Description from "./Description";
import Footer from "./Footer";
import { Helmet } from "react-helmet";
import Description2 from "./Description2";

function AboutUs() {
    return (
        <div>
            <Helmet>
            <title>About Us | My Awesome Website</title>
            <meta name="description" content="Welcome to My Awesome Website!" />
            </Helmet>
            <Header/>
            <div className="container max-w-7xl lg:mx-auto lg:px-0 flex flex-col items-center justify-center">
                <div className="flex flex-col md:flex-row md:container m-5 md:m-10 border-[#3d081b] border-2 rounded-lg shadow-[black_2px_6px_2px_0px] overflow-hidden">
                    <div className="w-full md:w-[40%]">
                        <img className="h-auto md:h-full w-full" src="https://www.ketodelia.ca/cdn/shop/files/316326066_6318662482886_6362087473845255281_n.png?v=1674936588&width=750" alt="" />
                    </div>
                    <div className="w-full md:w-[60%] py-5 px-5 md:py-10 md:px-10">
                        <Description></Description>
                    </div>
                </div>
                <Description2></Description2>
            </div>
            <div className="border-[#3d081b] border-t">
                <Footer></Footer>
            </div>
        </div>
    );
}

export default AboutUs;

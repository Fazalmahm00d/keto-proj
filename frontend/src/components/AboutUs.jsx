import Header from "./Header";
import Description from "./Description";
import Footer from "./Footer";
import Description2 from "./Description2";
function AboutUs(props){
    return(
        <div>
            <Header Authenticator={props.isAuthenticate} setIsAuthenticate={props.setIsAuthenticate}></Header>
            <div className="flex flex-col items-center justify-center">
                <div className="flex w-[80%] m-20 border-[#3d081b] border-2 rounded-lg  shadow-[black_6px_15px_6px_0px] overflow-hidden">
                    <div className="w-[40%] border-red">
                        <img className="h-[100%] w-full" src="https://www.ketodelia.ca/cdn/shop/files/316326066_6318662482886_6362087473845255281_n.png?v=1674936588&width=750" alt="" />
                    </div>
                    <div className="w-[60%] py-10 px-10 ">
                        <Description></Description>
                    </div>
                </div>
                <Description2></Description2>
            </div>
            <div className="border-[#3d081b] border-t">
            <Footer></Footer>
            </div>
           
        </div>
    )
}

export default AboutUs;
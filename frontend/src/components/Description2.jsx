import { useNavigate } from "react-router-dom";

function Description2() {
    const navigate=useNavigate()
    const handleClick=()=>{
        navigate('/menu')
    }
    return (
        <div className="flex flex-col items-center justify-center m-5 p-10 sm:m-10 lg:m-20 w-full md:max-w-6xl text-center font-light text-[#3d081bbf] text-base sm:text-lg lg:text-xl">
            <p className="mt-6 tracking-wide">
                At Ketodelia, we're passionate about providing <span className="font-medium">delicious, keto-friendly</span> meals that are not only good for you, but also taste amazing. Our restaurant, based in Toronto, offers <span className="font-medium">100% gluten-free</span>, low-carb cuisine that is carefully crafted using only the highest quality ingredients.
            </p>
            <p className="mt-6 tracking-wide">
                Our menu is designed to satisfy all your cravings, from our almond crust pizzas to our creamy pasta dishes, burgers, and even <span className="font-medium">sugar-free</span> desserts. All of our meals are <span className="font-medium">homemade</span> and prepared to order, ensuring that you're getting the freshest and most flavorful food possible.
            </p>
            <p className="mt-6 tracking-wide">
                We take great care in sourcing our ingredients, using only the <span className="font-medium">finest quality</span> meat from local farms and the <span className="font-medium">highest quality olive, coconut, and avocado oils</span>, as well as the healthiest ghee butter and grass-fed butter. We believe that a healthy diet doesn't have to sacrifice taste and pleasure, and that's why we've created a menu that appeals to everyone, regardless of their dietary restrictions.
            </p>
            <p className="mt-6 tracking-wide">
                Our team is highly professional and <span className="font-medium">specialized in keto low-carb diet</span>, ensuring that you're getting expert advice and guidance when it comes to your meal choices. We are <span className="font-medium">strict on our ingredients</span> and no preservatives, artificial food coloring, and restricted products are used in our food.
            </p>
            <p className="mt-6 tracking-wide">
                We're proud to offer <span className="font-medium">pickup and same-day or next-day delivery</span> in Toronto and nearby cities, making it easy for you to enjoy our delicious keto-friendly meals whenever and wherever you choose. Visit us today and discover the taste of healthy eating at its finest!
            </p>
            <div className="mt-6">
                <button onClick={handleClick} className="bg-[#94619a] text-white px-6 py-3 uppercase font-medium text-sm sm:text-base rounded-full border-[#3d081b] border-0.5 shadow-[black_2px_4px_2px_0px]">
                    Explore Our Menu
                </button>
            </div>
        </div>
    );
}

export default Description2;

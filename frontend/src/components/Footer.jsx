function Footer() {
    return (
      <div className="bg-[#f5eff5] text-[#3d091bbf] text-l">
        <div className="pt-[80px] px-4 md:px-8">
          <div className="flex flex-wrap justify-evenly items-start gap-6 md:gap-10">
            <div className="w-full sm:w-[40%] md:w-[25%] lg:w-[20%]">
              <h2 className="font-bold text-xl">Contact us</h2>
              <p className="mt-5">
                Ketodelia
                <br />
                3187 Yonge St.
                <br />
                TORONTO, Ontario M4N2K9
                <br />
                (416) 623-0317
              </p>
            </div>
            <div className="w-full sm:w-[40%] md:w-[25%] lg:w-[20%]">
              <h2 className="font-bold text-xl">Quick Links</h2>
              <ul className="mt-5 space-y-2">
                <li>About Us</li>
                <li>Keto Bakery</li>
                <li>FAQs</li>
                <li>Gift Cards</li>
                <li>Contact</li>
                <li>Keto Blog</li>
              </ul>
            </div>
            <div className="w-full sm:w-[40%] md:w-[25%] lg:w-[20%]">
              <h2 className="font-bold text-xl">Information</h2>
              <ul className="mt-5 space-y-2">
                <li>What Our Guests Are Saying</li>
                <li>Locations</li>
                <li>Return Policy</li>
                <li>Privacy Policy</li>
                <li>Shipping Policy</li>
                <li>Terms of Service</li>
              </ul>
            </div>
          </div>
  
          <div className="flex justify-center items-center gap-4 mt-8">
            <svg className="w-6 h-6 text-[#3d091bbf]" fill="currentColor" viewBox="0 0 16 16"> {/* Facebook Icon */}</svg>
            <svg className="w-6 h-6 text-[#3d091bbf]" fill="currentColor" viewBox="0 0 16 16"> {/* Pinterest Icon */}</svg>
            <svg className="w-6 h-6 text-[#3d091bbf]" fill="currentColor" viewBox="0 0 16 16"> {/* Instagram Icon */}</svg>
            <svg className="w-6 h-6 text-[#3d091bbf]" fill="currentColor" viewBox="0 0 16 16"> {/* TikTok Icon */}</svg>
            <svg className="w-6 h-6 text-[#3d091bbf]" fill="currentColor" viewBox="0 0 16 16"> {/* YouTube Icon */}</svg>
          </div>
        </div>
  
        <div className="mt-6 border-t border-gray-300 pt-4 flex justify-center items-center flex-wrap gap-4">
          <svg className="w-10 h-6" viewBox="0 0 38 24">{/* American Express */}</svg>
          <svg className="w-10 h-6" viewBox="0 0 165.521 105.965">{/* Apple Pay */}</svg>
        </div>
      </div>
    );
  }
  
  export default Footer;
  
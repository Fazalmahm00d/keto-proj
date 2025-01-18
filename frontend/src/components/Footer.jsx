import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

function Footer() {
  const { pathname } = useLocation();

  // Ensure the page scrolls to the top when the route changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

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
              <li><Link to="/aboutus">About Us</Link></li>
              <li><Link to="/faq">FAQs</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>
          <div className="hidden w-full md:block md:w-[25%] lg:w-[20%]">
            <h2 className="font-bold text-xl">Information</h2>
            <ul className="mt-5 space-y-2">
              <li><Link to="/#testimonials">What Our Guests Are Saying</Link></li>
              <li><Link to="/location">Locations</Link></li>
              <li>Return Policy</li>
              <li>Privacy Policy</li>
              <li>Shipping Policy</li>
              <li>Terms of Service</li>
            </ul>
          </div>
        </div>

        <div className="flex justify-center items-center gap-4 mt-8">
          {/* Social icons (Facebook, Instagram, etc.) */}
        </div>
      </div>

      <div className="mt-6 border-t border-gray-300 pt-4 flex justify-center items-center flex-wrap gap-4">
        {/* Brand Logos */}
      </div>
    </div>
  );
}

export default Footer;

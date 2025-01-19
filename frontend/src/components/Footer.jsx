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
      <div className="py-10 px-4 md:px-8">
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
        <a
    href="https://www.facebook.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-blue-600 transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M22.675 0h-21.35C.599 0 0 .599 0 1.326v21.348C0 23.402.599 24 1.326 24H12.82v-9.293H9.692v-3.62h3.128V8.413c0-3.1 1.894-4.788 4.659-4.788 1.325 0 2.464.099 2.796.143v3.24l-1.917.001c-1.503 0-1.795.715-1.795 1.764v2.31h3.587l-.467 3.62h-3.12V24h6.116c.728 0 1.326-.599 1.326-1.326V1.326C24 .599 23.401 0 22.675 0z" />
    </svg>
  </a>

  <a
    href="https://www.instagram.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-pink-500 transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M7.5 0h9a7.5 7.5 0 017.5 7.5v9a7.5 7.5 0 01-7.5 7.5h-9A7.5 7.5 0 010 16.5v-9A7.5 7.5 0 017.5 0zm4.5 5a5.5 5.5 0 105.5 5.5A5.51 5.51 0 0012 5zm0 2a3.5 3.5 0 11-3.5 3.5A3.5 3.5 0 0112 7zm6.5-.5a1.5 1.5 0 111.5 1.5 1.5 1.5 0 01-1.5-1.5z" />
    </svg>
  </a>

  <a
    href="https://www.twitter.com"
    target="_blank"
    rel="noopener noreferrer"
    className="text-gray-600 hover:text-blue-400 transition duration-300"
  >
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="currentColor"
      className="w-6 h-6"
    >
      <path d="M23.643 4.937c-.835.37-1.732.62-2.675.73a4.724 4.724 0 002.052-2.607 9.304 9.304 0 01-2.954 1.13 4.674 4.674 0 00-7.974 4.264 13.226 13.226 0 01-9.582-4.85 4.674 4.674 0 001.447 6.226 4.602 4.602 0 01-2.12-.588v.06a4.674 4.674 0 003.745 4.58 4.66 4.66 0 01-2.114.08 4.684 4.684 0 004.37 3.256 9.387 9.387 0 01-5.803 2.003c-.376 0-.749-.021-1.12-.063a13.231 13.231 0 007.151 2.1c8.582 0 13.27-7.109 13.27-13.27 0-.2-.005-.399-.014-.597A9.457 9.457 0 0024 4.557a9.341 9.341 0 01-2.357.647z" />
    </svg>
  </a>
</div>

      </div>

    
    </div>
  );
}

export default Footer;

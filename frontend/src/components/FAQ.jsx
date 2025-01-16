import { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";

function FAQ() {
    const [activeIndex, setActiveIndex] = useState(null);

    const toggleAccordion = (index) => {
        setActiveIndex(activeIndex === index ? null : index);
    };

    return (
        <div className="">
            <Header/>
            <h2 className="text-xl md:text-3xl font-semibold text-left container mx-auto text-gray-800 my-8 px-4">
                Frequently Asked Questions
            </h2>
            <div className="space-y-6 p-6 md:min-h-[40rem] md:container md:mx-auto ">
                {/* FAQ Item 1 */}
                <div className="bg-white shadow-md rounded-lg ">
                    <button
                        onClick={() => toggleAccordion(0)}
                        className="w-full text-left px-6 py-4 text-l md:text-xl font-medium text-gray-800 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
                    >
                        <span>What is your return policy?</span>
                        <svg
                            className={`w-6 h-6 transition-transform ${
                                activeIndex === 0 ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {activeIndex === 0 && (
                        <div className="px-6 py-4 text-gray-600">
                            We offer a 30-day return policy for unused and undamaged products.
                        </div>
                    )}
                </div>

                {/* FAQ Item 2 */}
                <div className="bg-white shadow-md rounded-lg">
                    <button
                        onClick={() => toggleAccordion(1)}
                        className="w-full text-left px-6 py-4 text-l md:text-xl font-medium text-gray-800 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
                    >
                        <span>Do you offer international shipping?</span>
                        <svg
                            className={`w-6 h-6 transition-transform ${
                                activeIndex === 1 ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {activeIndex === 1 && (
                        <div className="px-6 py-4 text-gray-600">
                            Yes, we ship internationally. Shipping rates and times vary by location.
                        </div>
                    )}
                </div>

                {/* FAQ Item 3 */}
                <div className="bg-white shadow-md rounded-lg">
                    <button
                        onClick={() => toggleAccordion(2)}
                        className="w-full text-left px-6 py-4 text-l md:text-xl font-medium text-gray-800 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
                    >
                        <span>How do I track my order?</span>
                        <svg
                            className={`w-6 h-6 transition-transform ${
                                activeIndex === 2 ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {activeIndex === 2 && (
                        <div className="px-6 py-4 text-gray-600">
                            Once your order ships, you'll receive an email with a tracking number and a link to track it.
                        </div>
                    )}
                </div>

                {/* FAQ Item 4 */}
                <div className="bg-white shadow-md rounded-lg">
                    <button
                        onClick={() => toggleAccordion(3)}
                        className="w-full text-left px-6 py-4 text-l md:text-xl font-medium text-gray-800 hover:bg-gray-100 focus:outline-none flex justify-between items-center"
                    >
                        <span>Can I change or cancel my order?</span>
                        <svg
                            className={`w-6 h-6 transition-transform ${
                                activeIndex === 3 ? "rotate-180" : ""
                            }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M19 9l-7 7-7-7"
                            />
                        </svg>
                    </button>
                    {activeIndex === 3 && (
                        <div className="px-6 py-4 text-gray-600">
                            You can change or cancel your order within 24 hours of placing it. Please contact us as soon as possible.
                        </div>
                    )}
                </div>
            </div>
            <Footer/>
        </div>
    );
}

export default FAQ;

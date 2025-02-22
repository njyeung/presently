import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient-to-br from-purple-600 to-blue-500 text-white p-8 pt-16">
                <div className="max-w-3xl mx-auto bg-white text-gray-900 p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-extrabold text-center mb-6">🎁 About Presently</h1>

                    <p className="text-lg mb-4 text-gray-800">
                        Welcome to <span className="font-semibold">Presently</span>—an intelligent gift recommendation platform designed to simplify the process of finding the perfect gift.
                        Using advanced data analysis and machine learning, Presently delivers personalized gift suggestions based on recipient preferences and market trends.
                    </p>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900">🚀 Our Mission</h2>
                    <p className="text-lg mb-4 text-gray-700">
                        Selecting the right gift can be challenging. Presently aims to eliminate guesswork by offering data-driven recommendations tailored to individual preferences.
                        By leveraging a carefully curated database of best-selling products, our platform ensures that every gift suggestion is relevant, thoughtful, and well-suited to the recipient.
                    </p>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900">🧠 How It Works</h2>
                    <p className="text-lg mb-4 text-gray-700">
                        Presently utilizes a **machine learning model** that analyzes key attributes such as:
                    </p>
                    <ul className="list-disc pl-6 text-lg text-gray-700 mb-4">
                        <li><span className="font-semibold">Gender</span></li>
                        <li><span className="font-semibold">Age</span></li>
                        <li><span className="font-semibold">Price Range</span></li>
                        <li><span className="font-semibold">Interests & Preferences</span></li>
                    </ul>
                    <p className="text-lg mb-4 text-gray-700">
                        The system cross-references this information with real-time market data to recommend the most suitable products.
                        Each recommendation is optimized based on **trending products, consumer behavior, and past purchasing patterns**.
                    </p>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900">🌟 Why Choose Presently?</h2>
                    <p className="text-lg mb-4 text-gray-700">
                        - **AI-Powered Recommendations** – Get smart, data-driven gift suggestions. <br />
                        - **Efficiency** – Save time by letting our system find the best options. <br />
                        - **Personalization** – Every suggestion is tailored to fit the recipient's profile. <br />
                        - **Market-Driven Insights** – Recommendations are based on real-time trends and best-selling products. <br />
                    </p>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-gray-900">💡 Get Started</h2>
                    <p className="text-lg mb-4 text-gray-700">
                        Click on the **Search** button in the navigation bar to begin your gift-finding journey.
                        Simply enter the recipient's details, and Presently will generate a list of curated gift ideas that align with their preferences.
                    </p>

                    <div className="flex justify-center mt-8">
                        <Link href="/" passHref>
                            <button className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-6 py-3 rounded-full shadow-md transition-all duration-300">
                                🔙 Return to Homepage
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
import Link from "next/link";
import Navbar from "@/components/Navbar";
import { buttonVariants } from "@/components/ui/button"
import { twMerge } from "tailwind-merge";
import ArrowRight from "@/assets/arrow-right";

export default function About() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gradient p-8 pt-16">
                <div className="max-w-3xl mx-auto bg-white text-gray-900 p-8 rounded-lg shadow-lg">
                    <h1 className="text-4xl font-extrabold text-center mb-6">🎁 About Presently</h1>

                    <p className="text-lg mb-4 text-black">
                        Welcome to <span className="font-semibold">Presently</span>—your AI-powered gift recommendation assistant! Finding the perfect gift can be overwhelming,
                        but with Presently, you get data-driven suggestions tailored to the recipient's preferences.
                    </p>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-black">🚀 What is Presently?</h2>
                    <p className="text-lg mb-4 text-black">
                        Presently is a **hackathon project** built to leverage **machine learning** and a **curated dataset** of best-selling products
                        to suggest the perfect gift. Whether it's a birthday, holiday, or a special occasion, we analyze key details such as:
                    </p>
                    <ul className="list-disc pl-6 text-lg text-black mb-4">
                        <li><span className="font-semibold">Gender</span></li>
                        <li><span className="font-semibold">Age</span></li>
                        <li><span className="font-semibold">Price Range</span></li>
                        <li><span className="font-semibold">Interests & Preferences</span></li>
                    </ul>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-black">🧠 How It Works</h2>
                    <p className="text-lg mb-4 text-black">
                        Using a **machine learning model**, Presently analyzes data from a database of trending products and best-selling gifts.
                        The system finds the most suitable gift ideas that match the user's input criteria, ensuring **personalized** and **thoughtful** suggestions.
                    </p>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-black">🌟 Why Use Presently?</h2>
                    <p className="text-lg mb-4 text-black">
                        - **AI-Powered Recommendations** – Get smart suggestions based on real-world data. <br />
                        - **Time-Saving** – No more endless searching for the right gift. <br />
                        - **Personalized Results** – Every suggestion is tailored to fit the recipient. <br />
                        - **Hackathon Innovation** – A project built with cutting-edge web technologies.
                    </p>

                    <h2 className="text-2xl font-bold mt-6 mb-3 text-black">💡 Get Started</h2>
                    <p className="text-lg mb-4 text-black">
                        Click on the **Search** button in the navigation bar to begin your gift-finding journey.
                        Simply enter the recipient's details, and Presently will generate a list of curated gift ideas that match their profile.
                    </p>

                    <div className="flex justify-center mt-8">
                        <Link href ="/" 
                            className={twMerge(buttonVariants({ variant: "default" }), "text-lg px-6 py-3 rounded-full shadow-md transition-all duration-300")}>
                            Return to Homepage
                            <ArrowRight></ArrowRight>
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
}
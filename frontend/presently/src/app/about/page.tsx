import Link from "next/link";
import Navbar from "@/components/Navbar";

export default function About() {
    return (
        <>
            <Navbar />
            <div className="min-h-screen bg-gray-100 text-gray-900 p-8 pt-16">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-3xl font-bold mb-4">About Presently</h1>
                    <p className="text-lg mb-4">
                        Welcome to Presently! This app helps you find the perfect gift based on user preferences and information.
                    </p>
                    <p className="text-lg mb-4">
                        This is the About page.
                    </p>
                    <p className="text-lg mb-4">
                        Click on the search button in the navbar to start searching for gift suggestions. More details on how to use the app will be added soon!
                    </p>
                    <Link href="/" className="text-blue-500 hover:underline">
                        Go back to Home
                    </Link>
                </div>
            </div>
        </>
    );
}
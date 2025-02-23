import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full backdrop-blur-sm h-[60px] bg-black text-white px-6 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md z-50">
            <div className="">
                <Link href="/" className="text-3xl font-bold">
                    PresentLy
                </Link>
            </div> 
            <div className="flex space-x-6">
                <Link href="/about" className="hover:text-gray-400">
                    About
                </Link>
                <Link href="/browse" className="hover:text-gray-400">
                    Browse
                </Link>
                <Link href="/saved" className="hover:text-gray-400">
                    Saved
                </Link>
            </div>
            
        </nav>
    );
}
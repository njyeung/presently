import Link from "next/link";

export default function Navbar() {
    return (
        <nav className="w-full h-12 bg-gray-900 text-white px-6 flex justify-between items-center fixed top-0 left-0 right-0 shadow-md z-50">
            {/* Left Side: Page & Search */}
            <div className="flex space-x-6">
                <Link href="/about" className="hover:text-gray-400">
                    About
                </Link>
                <Link href="/search" className="hover:text-gray-400">
                    Search
                </Link>
            </div>

            {/* Center: Presently (Bold) */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" className="text-3xl font-bold">
                    Presently
                </Link>
            </div>
        </nav>
    );
}
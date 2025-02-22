import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"

export default function Hero() {
    return <section>
        <div className="container">
            <div className="md:flex items-center">
                <div>
                    <h1 className="text-5xl md:text-7xl font-bold black bg-clip-text mt-6">
                        Presently
                    </h1>
                    <p className="text-xl text-[#010D3E] tracking-tight mt-6">
                        Your ultimate destination for personalized gift recommendations.
                    </p>
                    <Link href="#" className={buttonVariants({ variant: "outline" })}>
                        Find your perfect gift
                    </Link>
                </div>
                <div>
                    {/* <Image src="https://picsum.photos/id/237/200/300" alt="picture" height={200} width={200}></Image> */}
                </div>
            </div>
        </div>
        
    </section>
}
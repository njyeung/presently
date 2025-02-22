import Link from "next/link"
import Image from "next/image"
import { buttonVariants } from "@/components/ui/button"

export default function Hero() {
    return <section className="pt-8 pb-20 md:pt-5 md:pb-10 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] ">
        <div className="container pt-10 px-4">
            <div className="md:flex items-center">
                <div className="">
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
                <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
                    {/* <Image src="https://picsum.photos/id/237/200/300" alt="picture" height={200} width={200}></Image> */}
                </div>
            </div>
        </div>
        
    </section>
}
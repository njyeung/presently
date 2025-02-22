import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import { buttonVariants } from "@/components/ui/button"

export default function Hero() {
    return <section className="pt-10 pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] ">
        <div className="contain">
            <div className="md:flex items-center">
                <div className="max-w-[700px]">
                    <h1 className="text-4xl md:text-7xl font-bold black bg-clip-text mt-6">
                        Presently Perfect for Every Occasion
                    </h1>
                    <p className="text-xl tracking-tight mt-4">
                        Whether it's a birthday, anniversary, or a spontaneous surprise, Presently makes gift-giving effortless.
                        Explore personalized recommendations that guarantee a smile.
                    </p>
                    <Link href="#" className={twMerge(buttonVariants({ variant: "default" }), "mt-4 p-5 text-lg")}>
                        Try it now
                    </Link>
                </div>
                <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
                    {/* <Image src="https://picsum.photos/id/237/200/300" alt="picture" height={200} width={200}></Image> */}
                </div>
            </div>
        </div>
        
    </section>
}
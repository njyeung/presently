"use-client"

import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import ArrowRight from "@/assets/arrow-right";
import PresentBox from "@/assets/PresentBox.png"
import { buttonVariants } from "@/components/ui/button"

export default function Hero() {

    return <section className="pt-10 pb-20 bg-white">
        <div className="contain">
            <div className="flex md:flex-row flex-col items-center">
                <div className="max-w-[500px] gap-5">
                    <h1 className="text-4xl md:text-7xl font-bold black bg-clip-text mt-6">
                        Presently Perfect for Every Occasion
                    </h1>
                    <p className="text-xl tracking-tight mt-4">
                        Whether it's a birthday, anniversary, or a spontaneous surprise, Presently makes gift-giving effortless.
                        Explore personalized recommendations that guarantee a smile.
                    </p>
                    <Link href="#" className={twMerge(buttonVariants({ variant: "default" }), "mt-4 p-5 text-lg")}>
                        Try it now
                        <ArrowRight></ArrowRight>
                    </Link>
                </div>
                <div className="mt-20 md:mt-0 md:h-[648px] md:flex-1 relative">
                    <div className="block md:absolute h-[400px] w-[400px]">
                        <Image
                        src={PresentBox} alt="present box" 
                        width={500} height={500}
                        />
                    </div>
                    
                </div>
            </div>
        </div>
        
    </section>
}
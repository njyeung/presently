"use client"

import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import ArrowRight from "@/assets/arrow-right";
import PresentBox from "@/assets/PresentBox.png"
import { buttonVariants } from "@/components/ui/button"
import {motion} from "framer-motion"

export default function Hero() {
    return <section className="md:pt-10 pt-20 pb-20 bg-gradient">
        <div className="contain">
            <div className="flex md:flex-row flex-col items-center gap-5">
                <div className="max-w-[500px]">
                    <h1 className="text-4xl md:text-7xl font-bold black bg-clip-text mt-6">
                        PresentLy Perfect for Every Occasion
                    </h1>
                    <p className="text-xl tracking-tight mt-4">
                        Whether it's a birthday, anniversary, or a spontaneous surprise, PresentLy makes gift giving effortless.
                        Explore personalized recommendations that guarantee a smile.
                    </p>
                    <Link href="#ocassions" className={twMerge(buttonVariants({ variant: "default" }), "mt-4 p-5 text-lg")}>
                        Try it now
                        <ArrowRight></ArrowRight>
                    </Link>
                </div>
                <div className="mt-10 md:h-[648px] h-[400px] relative flex items-center justify-center">
                    <div className="w-[320px] md:w-[500px]">
                        <motion.img
                        src={PresentBox.src} alt="present box" 
                        width={500} height={500}
                        animate={{
                            translateY: [-30, 30],
                            rotate: [-5,2]
                          }}
                        transition={{
                        repeat: Infinity,
                        repeatType: "mirror",
                        duration: 3,
                        ease: "easeInOut",
                        }}
                        />
                    </div>
                </div>
            </div>
        </div>
    </section>
}
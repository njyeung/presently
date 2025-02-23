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
            <div className="flex md:flex-row flex-col items-center gap-5 justify-center">
                <div className="max-w-[500px]">
                    <motion.div 
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                        variants={{
                            visible: { opacity: 1, transform: "translateY(0px)"},
                            hidden: { opacity: 0,  transform: "translateY(12px)"}
                        }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold black bg-clip-text mt-6">
                            PresentLy Perfect for Every Occasion
                        </h1>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                        
                        variants={{
                            visible: { opacity: 1, transform: "translateY(0px)"},
                            hidden: { opacity: 0,  transform: "translateY(8px)"}
                        }}
                    >
                        <p className="text-xl tracking-tight mt-4">
                            Whether it's a birthday, anniversary, or a spontaneous surprise, PresentLy makes gift giving effortless.
                            Explore personalized recommendations that guarantee a smile.
                        </p>
                    </motion.div>
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.6 }}
                        
                        variants={{
                            visible: { opacity: 1, transform: "translateY(0px)"},
                            hidden: { opacity: 0,  transform: "translateY(5px)"}
                        }}
                    >
                        <div className="flex flex-row gap-2"> 
                            <Link href="/about" className={twMerge(buttonVariants({ variant: "ghost" }), "mt-4 p-5 text-lg")}>
                                Learn More
                            </Link>
                            <Link href="#ocassions" className={twMerge(buttonVariants({ variant: "default" }), "mt-4 p-5 text-lg")}>
                                Try it now
                                <ArrowRight></ArrowRight>
                            </Link>
                        </div>
                    </motion.div>
                    
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
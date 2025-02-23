"use client"

import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import ArrowRight from "@/assets/arrow-right";
import PresentBox from "@/assets/PresentBox.png"
import GraduationCap from "@/assets/graduation-cap.png"
import { buttonVariants } from "@/components/ui/button"
import { motion, useScroll, useTransform, useMotionValueEvent} from "framer-motion"
import { useRef } from "react";
import Cake from "@/assets/cake.png"
export default function Hero() {
    const heroRef = useRef(null);

    const scroll = useScroll({
    target: heroRef,
    offset: ["start end", "end start"]
    });
    const translateY = useTransform(scroll.scrollYProgress, [0,1], [150, -150])

    return <section id="hero" className="md:pt-10 pt-20 pb-20 bg-gradient">
        <div className="contain">
            <div className="flex md:flex-row flex-col items-center gap-5 justify-center">
                <div className="max-w-[500px] z-40">
                    <motion.div 
                        initial={{opacity: 0,  transform: "translateY(12px)"}}
                        animate={{opacity: 1, transform: "translateY(0px)"}}
                        transition={{ duration: 0.5 }}
                    >
                        <h1 className="text-4xl md:text-7xl font-bold black bg-clip-text mt-6">
                            PresentLy Perfect for Every Occasion
                        </h1>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0,  transform: "translateY(8px)"}}
                        animate={{opacity: 1, transform: "translateY(0px)"}}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <p className="text-xl tracking-tight mt-4">
                            Whether it's a birthday, anniversary, or a spontaneous surprise, PresentLy makes gift giving effortless.
                            Explore personalized recommendations that guarantee a smile.
                        </p>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0,  transform: "translateY(5px)"}}
                        animate={{opacity: 1, transform: "translateY(0px)"}}
                        transition={{ duration: 0.5, delay: 0.6 }}
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
                <motion.div
                    initial= {{opacity: 0}}
                    animate = {{opacity: 1}}
                    transition={{ duration: 0.7, delay: 0.2 }}
                >
                    <div className="mt-10 md:h-[648px] h-[400px] relative flex items-center justify-center">
                        <div className="w-[320px] md:w-[500px] z-30 flex justify-center items-center">
                            <motion.img
                            src={PresentBox.src} alt="present box" 
                            width={400} height={400}
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
                        <div className="hidden md:block md:absolute h-[150px] w-[150px] -top-[50px] -left-[60px]">
                        <motion.img
                            src={Cake.src} alt="cake" 
                            width={200} height={200}
                            style={{
                                translateY: translateY,
                            }}
                        />
                        </div>
                        <div className="hidden md:block md:absolute h-[350px] w-[350px] top-[580px] -right-[120px]">
                            <motion.img 
                                src={GraduationCap.src} alt="graduation cap" 
                                width={350} height={350}

                                style={{
                                    rotate: -30,
                                    translateY: translateY
                                }}
                            />
                        </div>
                    </div>
                </motion.div>
                
                
            </div>
        </div>
    </section>
}
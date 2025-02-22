import Link from "next/link"
import Image from "next/image"
import { twMerge } from "tailwind-merge"
import ArrowRight from "@/assets/arrow-right";
import PresentBox from "@/assets/PresentBox.png"
import { buttonVariants } from "@/components/ui/button"
import { motion } from "framer-motion";

export default function Hero() {
    return <section className="pt-10 pb-20 bg-[radial-gradient(ellipse_200%_100%_at_bottom_left,#183EC2,#EAEEFE_100%)] ">
        <div className="contain">
            <div className="md:flex items-center">
                <div className="max-w-[500px]">
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
                <div className="mt-20 relative">
                    <motion.img 
                        src={PresentBox.src} 
                        alt="picture" 
                        height={500} width={500} 
                        animate={{
                            translateY: [-30, 30],
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
        
    </section>
}
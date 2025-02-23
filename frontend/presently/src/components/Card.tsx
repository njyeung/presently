"use client"
import Image from "next/image";
import Link from "next/link";
import ArrowRight from "@/assets/arrow-right";
import { twMerge } from "tailwind-merge";
import { buttonVariants } from "@/components/ui/button"
import GoldStar from "@/assets/gold-star"
import {
    Carousel,
    CarouselContent,
    CarouselItem,
  } from "@/components/ui/carousel"

interface Recommendation {
    name: string;
    description: string;
    price: string;
    amazonUrl: string;
    imageUrl: string[];
}

export default function Card({recommendation, isGold, refresh} : {recommendation: Recommendation, isGold: boolean, refresh:any}) {

    function handleClick() {
        console.log("HANDLE CLICK")
        const stored = localStorage.getItem("listings");
        
        console.log(`WHATS STORED BEFORE ADDING ${stored}`)
        if(stored == null || stored == "") {
            localStorage.setItem("listings", JSON.stringify([recommendation]))
        }
        else {
            let listings = JSON.parse(stored);
            const index = listings.findIndex((item:Recommendation) => item.amazonUrl === recommendation.amazonUrl);
          
                if (index !== -1) {
                    listings.splice(index, 1);
                } else {
                    listings.push(recommendation);
                }
            localStorage.setItem("listings", JSON.stringify(listings))
        }
        refresh()
    }
    
    return <div className="bg-white shadow-md rounded-lg overflow-hidden max-h-[200px]">
        <div className="flex flex-row md:gap-5 gap-2 justify-between">
            <div className="p-5 flex-1">
                <div className="flex flex-col h-full">
                    <span className="flex flex-row items-center  mt-2 gap-4">
                        <GoldStar className="cursor-pointer" handleClick={handleClick} isGold={isGold}></GoldStar>
                        <h2 className="md:text-3xl text-xl font-semibold">{recommendation.name}</h2>
                    </span>
                
                    <div className="flex flex-row items-center h-full md:gap-5 gap-2">
                        <p className="text-gray-600 description">
                            {recommendation.description}
                        </p>
                        <h2 className="text-4xl bg-gradient text-transparent bg-clip-text font-bold">
                            {recommendation.price}
                        </h2>
                    </div>
                    <Link href={recommendation.amazonUrl} className={twMerge(buttonVariants({ variant: "default" }), " p-3 text-lg max-w-[200px]")}>
                        Purchase Now
                        <ArrowRight></ArrowRight>
                    </Link>
                </div>
            </div>
            <Carousel>
                <CarouselContent className="h-[200px] w-[200px]">
                    { recommendation.imageUrl.map((imageUrl)=>
                        <CarouselItem key={imageUrl}>
                            <img className="h-[200px] w-[200px] object-cover" src={imageUrl} alt={"Image of product"}></img>
                        </CarouselItem>
                    )}
                </CarouselContent>
            </Carousel>
        </div>
    </div>
}
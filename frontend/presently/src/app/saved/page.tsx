"use client"
import Listings from "@/components/Listings";
import { useState, useEffect } from "react";
import GoldStar from "@/assets/gold-star";
import { Footer } from "@/components/Footer";
export default function Saved() {

    const [savedListings, setSavedListings] = useState([]);

    useEffect(() => {
        getStarred()
    }, []);

    function getStarred() {
        const listings = localStorage.getItem("listings");
        if (listings) {
            setSavedListings(JSON.parse(listings));
        }
    }
    return <>
        {savedListings.length != 0 ? <div>
        <div className="pt-20 bg-gray-50 min-h-screen pb-10">
            <Listings refresh={getStarred} recommendations={savedListings} />
        </div>
        <Footer />
        </div> : <div>
            <div className="contain py-20 bg-gray-50 min-h-screen">
                <div className="flex justify-center">
                    <span className="flex flex-row items-center mt-2 gap-5">
                        <GoldStar isGold={true}></GoldStar>
                        <p className="text-gray-500 text-lg">No saved listings yet. Start adding some!</p>
                    </span>
                </div>
            </div>
            <Footer />    
        </div>
        }
    </>
    
}
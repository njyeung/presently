"use client"

import Card from "@/components/Card"
import { useState, useEffect } from "react";
import {motion} from "framer-motion"
interface Recommendation {
  name: string;
  description: string;
  price: string;
  amazonUrl: string;
  imageUrl: string[];
}

export default function Listings({ recommendations, refresh }: { recommendations: Recommendation[], refresh:any }) {
    const [goldNames, setGoldNames] = useState<string[]>([]);

    useEffect(() => {
        getStarred();
    }, []);
    
    function getStarred() {
        const stored = localStorage.getItem("listings");
        console.log(`STORED ${stored}`)
        if (stored != null) {
          const listings: Recommendation[] = JSON.parse(stored);
          const names = listings.map((rec) => rec.name);
          setGoldNames(names);
        }
        if(refresh != null) {
            refresh();
        }
        
    }

    return (
        <section className="contain">
            <div className="flex flex-col gap-5">
                { recommendations.map((recommendation: Recommendation, index) => 
                    <div key={index}>
                        <motion.div
                            initial={{opacity: 0,  transform: "translateY(12px)"}}
                            animate={{opacity: 1, transform: "translateY(0px)"}}
                            transition={{ duration: 0.5, delay: index*0.2}}
                        >
                        <Card recommendation={recommendation} isGold={goldNames.includes(recommendation.name)} refresh={getStarred} />
                        </motion.div>
                    </div>
                )}
            </div>
        </section>
        
  );
}
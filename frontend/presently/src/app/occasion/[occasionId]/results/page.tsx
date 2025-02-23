

import { redirect } from 'next/navigation';
import Listings from "@/components/Listings"
import { Footer } from '@/components/Footer';
import GoldStar from "@/assets/gold-star"
import { describe } from 'node:test';
function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
}
interface Recommendation {
    name: string;
    description: string;
    price: string;
    amazonUrl: string;
    imageUrl: string[];
}
export default async function Results({ searchParams }: {searchParams:any}) {
    const { info } = await searchParams;

    // If there's no info query parameter, redirect to a default page.
    if (!info) {
        redirect('/');
    }

    const formData = JSON.parse(info);

    const occasionId = formData.occasion
    const params = formData.params
    
    const occasions = ["Birthday", "Graduation", "Anniversary", "Christmas"];
    const occasionName = occasions[occasionId-1];

    const queryParams = [
            params.interests,
            `Age ${params.age}`,
            params.gender,
            params.relationship,
            params.personality,   // Birthday
            params.fieldOfStudy,  // Graduation
            params.futurePlans,   // Graduation
            params.traditions,    // Christmas
            params.loveLanguage,  // Anniversary
        ].filter((param)=> {
            if(param== "" || param == null) return false;
            return true;
        })

    const recommendations: Recommendation[] = await fetch("https://6nf46p3uf7.execute-api.us-west-1.amazonaws.com/presently", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            title: occasionName,
            query: queryParams.join(','),
            price: parseInt(params.budget)
        })
    }).then((res)=>res.json()).then((data: any[])=>{
        return data.map((entry:any) => {
            
            const [name, description] = entry.name.split(/[,|-]/, 2);
            const salePriceString = `$${entry.salePrice.toFixed(2)}`

            return {
                name: name,
                description: description,
                price: salePriceString,
                amazonUrl: entry.url,
                imageUrl: entry.imageUrls
            };
        })
    })

    return <div>
        <div className="pt-20 bg-gray-50 min-h-screen pb-10">
            { recommendations.length == 0 ? 
                <div className="flex justify-center">
                    <span className="flex flex-row items-center mt-2 gap-5">
                        <GoldStar isGold={true}></GoldStar>
                        <p className="text-gray-500 text-lg">No results! Try a different query!</p>
                    </span>
                </div>
                :
                <Listings refresh={null} recommendations={recommendations} />
            }
        </div>
        <Footer />
    </div>
}
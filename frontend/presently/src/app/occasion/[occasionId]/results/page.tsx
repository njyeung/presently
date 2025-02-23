import { redirect } from 'next/navigation';
import Listings from "@/components/Listings"
import { Footer } from '@/components/Footer';

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
export default async function Results({searchParams}: {
  searchParams: { info?: string };
}) {
    const { info } = await searchParams;
    // If there's no info query parameter, redirect to a default page.
    if (!info) {
        redirect('/');
    }

    function refresh() {}

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

    console.log(params.budget)
    
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
    }).then((res)=>res.json()).then((data)=> {
        console.log(data)
        return data
    }).then((data: any[])=>{
        console.log(data)
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
            <Listings refresh={null} recommendations={recommendations} />
        </div>
        <Footer />
    </div>
}
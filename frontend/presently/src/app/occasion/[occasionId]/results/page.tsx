import { redirect } from 'next/navigation';
import Listings from "@/components/Listings"
import { Footer } from '@/components/Footer';

function delay(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

export default async function Results({searchParams}: {
  searchParams: { info?: string };
}) {
    const { info } = await searchParams;
    // If there's no info query parameter, redirect to a default page.
    if (!info) {
        redirect('/');
    }

    function refresh() {

    }
    // Parse the info parameter from the URL query string.
    // Make sure your info is properly encoded/decoded.
    const formData = JSON.parse(info);

    console.log(formData)
    const dummyRecommendations = [
        {
          name: "Smartphone X",
          description:
            "The latest smartphone with cutting-edge features and impressive battery life.",
          price: "$999",
          amazonUrl: "https://amazon.com/smartphone-x",
          imageUrl: [
            "https://dummyimage.com/400x300/000/fff&text=Smartphone+X",
            "https://dummyimage.com/400x300/000/fff&text=Alternate+View"
          ]
        },
        {
          name: "Wireless Headphones",
          description:
            "Experience immersive sound with advanced noise cancellation technology.",
          price: "$199",
          amazonUrl: "https://amazon.com/wireless-headphones",
          imageUrl: [
            "https://dummyimage.com/400x300/000/fff&text=Headphones"
          ]
        },
        {
          name: "Fitness Tracker",
          description:
            "Monitor your health and activity levels with this sleek, user-friendly tracker.",
          price: "$89",
          amazonUrl: "https://amazon.com/fitness-tracker",
          imageUrl: [
            "https://dummyimage.com/400x300/000/fff&text=Fitness+Tracker"
          ]
        },
        {
            name: "Fitness Tracker",
            description:
              "Monitor your health and activity levels with this sleek, user-friendly tracker.",
            price: "$89",
            amazonUrl: "https://amazon.com/fitness-tracker",
            imageUrl: [
              "https://dummyimage.com/400x300/000/fff&text=Fitness+Tracker"
            ]
        },
        {
            name: "Fitness Tracker",
            description:
              "Monitor your health and activity levels with this sleek, user-friendly tracker. Monitor your health and activity levels with this sleek, user-friendly tracker.",
            price: "$89",
            amazonUrl: "https://amazon.com/fitness-tracker",
            imageUrl: [
              "https://dummyimage.com/400x300/000/fff&text=Fitness+Tracker"
            ]
        }
      ];

    // Optionally, perform additional asynchronous fetching here if needed.
    // e.g., const additionalData = await fetch(...).then(res => res.json());
    await delay(5000);


    return <div>
        <div className="pt-20 bg-gray-50 min-h-screen pb-10">
            <Listings refresh={null} recommendations={dummyRecommendations} />
        </div>
        <Footer />
    </div>
}
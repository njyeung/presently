"use client"
import Image from "next/image";
import DateNight from "@/assets/datenight.jpg"
import Birthday from "@/assets/birthday.png"
import Graduation from "@/assets/graduation.jpg"
import Christmas from "@/assets/christmas.jpg"
import Valentine from "@/assets/valentines.jpg"
import MothersDay from "@/assets/mothers-day.jpg"
import FathersDay from "@/assets/fathers-day.jpg"
import ComingSoon from "@/assets/coming-soon.jpg"
import { useRouter } from 'next/navigation'
import { motion } from "framer-motion"
const occasions = [
    {
        id: 1,
        title: "Birthday",
        description: "Celebrate with personalized gifts for every age.",
        image: Birthday,
    },
    {
        id: 2,
        title: "Graduation",
        description: "Celebrate your graduate’s achievements and mark the start of an exciting new chapter.",
        image: Graduation,
    },
    {
        id: 3,
        title: "Anniversary",
        description: "Celebrate your journey of love with timeless keepsakes.",
        image: DateNight,
    },
    {
        id: 4,
        title: "Christmas",
        description: "Make the holidays magical with our curated picks.",
        image: Christmas,
    },
    {
        id: 5,
        title: "Valentine's Day",
        description: "Show your love with thoughtful and romantic gifts.",
        image: Valentine
    },
    {
        id: 6,
        title: "Mother's Day",
        description: "Express gratitude with gifts as special as mom.",
        image: MothersDay
    },
    {
        id: 7,
        title: "Father's Day",
        description: "Find the perfect gift to celebrate dad’s special day.",
        image: FathersDay
    },
    {
        id: 8,
        title: "Coming Soon!",
        description: "Stay tuned! We’re adding more occasions and personalized recommendations.",
        image: ComingSoon
    }
];

export default function Browse() {
    const router = useRouter()
    return <section id="ocassions" className="pt-10 pb-12 bg-gray-50">
      <div className="contain mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Browse All Occasions</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {occasions.map((occasion, index) => (
            <motion.div
              key={occasion.id} 
              initial = {{ opacity: 0, scale: 0.8 }}
              animate = {{ opacity: 1, scale: 1 }}
              transition = {{duration: 0.3, delay: 0.1*index}}
            >
              <div 
              className="bg-white rounded-xl shadow p-4 hover:cursor-pointer hover:scale-110 transition-all"
              onClick={() => router.push(`/occasion/${occasion.id}`)}
              >
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={occasion.image}
                  alt={occasion.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-lg"
                />
              </div>
              <h3 className="text-xl font-semibold">{occasion.title}</h3>
              <p className="mt-2">{occasion.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
}



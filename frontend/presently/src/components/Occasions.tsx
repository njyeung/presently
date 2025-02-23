"use client"
import Image from "next/image";
import DateNight from "@/assets/datenight.jpg"
import Birthday from "@/assets/birthday.png"
import Graduation from "@/assets/graduation.jpg"
import Christmas from "@/assets/christmas.jpg"

import { useRouter } from 'next/navigation'

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
  }
];

export default function Occasions() {
    const router = useRouter()

    return <section id="ocassions" className="pt-10 pb-12 bg-gray-50">
      <div className="contain mx-auto px-4">
        <h2 className="text-3xl font-bold mb-2">Explore Occasions</h2>
        <div className="flex flex-row space-x-8 overflow-x-auto pb-4 pl-5 scrollbar fade-mask pt-5">
          {occasions.map((occasion) => (
            <div key={occasion.id} 
            className="bg-white w-[350px] flex-shrink-0 rounded-xl shadow p-4 hover:cursor-pointer hover:scale-105 transition-all"
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
          ))}
        </div>
      </div>
    </section>
}
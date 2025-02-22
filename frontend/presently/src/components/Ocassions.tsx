"use client";
import Image from "next/image";

const occasions = [
  {
    id: 1,
    title: "Birthday",
    description: "Celebrate with personalized gifts for every age.",
    image: "/images/birthday.png",
  },
  {
    id: 2,
    title: "Anniversary",
    description: "Timeless gifts to mark your love and memories.",
    image: "/images/anniversary.png",
  },
  {
    id: 3,
    title: "Graduation",
    description: "Inspire with thoughtful gifts for a new beginning.",
    image: "/images/graduation.png",
  },
  {
    id: 4,
    title: "Christmas",
    description: "Make the holidays magical with our curated picks.",
    image: "/images/christmas.png",
  }
];

export default function Ocassions() {
  return (
    <section id="ocassions" className="py-10 bg-gray-50">
      <div className="contain mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8">Explore Occasions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {occasions.map((occasion) => (
            <div key={occasion.id} className="bg-white rounded-lg shadow p-4 hover:cursor-pointer">
              <div className="relative w-full h-40 mb-4">
                <Image
                  src={occasion.image}
                  alt={occasion.title}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-t-lg"
                />
              </div>
              <h3 className="text-xl font-semibold">{occasion.title}</h3>
              <p className="mt-2">{occasion.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
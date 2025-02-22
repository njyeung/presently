import Hero from "@/components/Hero";
import Image from "next/image";
import Navbar from "@/components/Navbar"
import Ocassions from "@/components/Ocassions";
import { Footer } from "@/components/Footer";
export default function Home() {
  return <>
    <Navbar />
    <Hero />
    <Ocassions />
    <Footer />
  </>
}

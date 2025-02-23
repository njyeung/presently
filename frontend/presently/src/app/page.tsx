import Hero from "@/components/Hero";
import Image from "next/image";
import Navbar from "@/components/Navbar"
import Occasions from "@/components/Occasions";
import { Footer } from "@/components/Footer";
export default function Home() {
  return <>
    <Hero />
    <Occasions />
    <Footer />
  </>
}

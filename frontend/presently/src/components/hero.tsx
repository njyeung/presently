import Link from "next/link"
import Image from "next/image"

export default function Hero() {
    return <section>
        <div>
        <h1>Welcome to Giftopia!</h1>
        <p>Your ultimate destination for personalized gift recommendations.</p>
        <Link href="#"> 
        {/* TODO: link to ocassion component */}
          Find Your Perfect Gift
        </Link>
      </div>
      <div >
      </div>
    </section>
}
import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 text-center">
      <div className="container">
        <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-gradient before:absolute">
          <p className="text-white">PresentLy &copy;</p>
        </div>
        <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
          <a href="/about">About</a>
          {/* <a href="#">Customers</a>
          <a href="#">Pricing</a>
          <a href="#">Help</a>
          <a href="#">Careers</a> */}
        </nav>
        <div className="mt-6 inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-gradient before:absolute">
          <p className="text-white">Brought to you by</p>
        </div>
        <div className="flex justify-center gap-6 mt-6">
            <a href="#">Slava</a>
            <a href="#">Will</a>
            <a href="#">Nick</a>
            <a href="#">Vishnu</a>
            <a href="#">Andrew</a>
        </div>
        
      </div>
    </footer>
  );
};
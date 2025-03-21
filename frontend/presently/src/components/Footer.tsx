import SocialX from "@/assets/social-x.svg";
import SocialInsta from "@/assets/social-insta.svg";
import SocialLinkedIn from "@/assets/social-linkedin.svg";
import SocialPin from "@/assets/social-pin.svg";
import SocialYoutube from "@/assets/social-youtube.svg";

export const Footer = () => {
  return (
    <footer className="bg-black text-[#BCBCBC] text-sm py-10 flex justify-center">
      <div className="container text-center ">
        <div>
          <div className="inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-gradient before:absolute">
            <p className="text-white">PresentLy &copy;</p>
          </div>
          <nav className="flex flex-col md:flex-row md:justify-center gap-6 mt-6">
            <a href="/about">About</a>
            <a href="/browse">Browse</a>
            <a href="/saved">Saved</a>
          </nav>
          <div className="mt-6 inline-flex relative before:content-[''] before:top-2 before:bottom-0 before:w-full before:blur before:bg-gradient before:absolute">
            <p className="text-white">Brought to you by</p>
          </div>
          <div className="flex justify-center gap-6 mt-6">
              <a href="https://github.com/Slava-code">Slava</a>
              <a href="https://github.com/IIXIIII">Will</a>
              <a href="https://github.com/njyeung">Nick</a>
              <a href="https://github.com/ach968">Andrew</a>
              <a href="https://github.com/VishnuR121">Vishnu</a>
              <a href="https://github.com/jamesbrcr">James</a>
          </div>
        </div>
      </div>
    </footer>
  );
};
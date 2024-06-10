import HeroBanner from "./landingpage/HeroBanner";
import Companies from "./landingpage/Companies";
import Services from "./landingpage/Services";
import Everything from "./landingpage/Everything";
import PopulaireService from "./landingpage/PopulaireService";
import LandingPageNavbar from "./landingpage/landingpagenavbar";

export default function Home() {
  return (
    <div>
      <LandingPageNavbar />

      <HeroBanner />

      <PopulaireService />
      <Everything />
      <Services />
    </div>
  );
}

import AboutSection from "@/features/home/components/AboutSection";
import FeaturesSection from "../features/home/components/FeaturesSection";
import HeroSection from "../features/home/components/HeroSection";
import StatsSection from "@/features/home/components/StatsSection";

export default function HomePage() {

    return (
        <section>
            <HeroSection />
            <FeaturesSection />
            <AboutSection />
            <StatsSection />
        </section>
    );
}

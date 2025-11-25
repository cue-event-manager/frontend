import AboutSection from "@/features/home/components/AboutSection";
import FeaturesSection from "../features/home/components/FeaturesSection";
import HeroSection from "../features/home/components/HeroSection";
import StatsSection from "@/features/home/components/StatsSection";
import { UpcomingEventsCarousel } from "@/features/home/components/UpcomingEventsCarousel";

export default function HomePage() {

    return (
        <section>
            <HeroSection />
            <UpcomingEventsCarousel />
            <FeaturesSection />
            <AboutSection />
            <StatsSection />
        </section>
    );
}

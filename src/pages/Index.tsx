import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import SystemOverview from "@/components/SystemOverview";
import DemoVideos from "@/components/DemoVideos";
import TechStack from "@/components/TechStack";
import PerformanceMetrics from "@/components/PerformanceMetrics";
import UseCases from "@/components/UseCases";
import ComparisonTable from "@/components/ComparisonTable";
import DecisionEngine from "@/components/DecisionEngine";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <FeaturesGrid />
      <HowItWorks />
      <SystemOverview />
      <DemoVideos />
      <TechStack />
      <PerformanceMetrics />
      <UseCases />
      <ComparisonTable />
      <DecisionEngine />
      <Footer />
    </div>
  );
};

export default Index;

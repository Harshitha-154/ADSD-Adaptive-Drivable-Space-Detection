import { motion } from "framer-motion";
import { Shield, Zap, Brain } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img src={heroBg} alt="" className="w-full h-full object-cover opacity-40" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/40 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-xs tracking-[0.3em] text-primary mb-6 uppercase"
        >
          AI-Powered Autonomous Safety
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="font-heading text-4xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight mb-6"
        >
          Adaptive Drivable Space{" "}
          <span className="text-primary text-glow-primary">Detection</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12"
        >
          Self-Learning Road Memory System with Real-Time Confidence-Based
          Driving Zones & Context-Aware Guidance
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-6"
        >
          {[
            { icon: Shield, label: "Real-Time Safety", color: "text-accent" },
            { icon: Zap, label: "High-Speed Processing", color: "text-warning" },
            { icon: Brain, label: "Self-Learning AI", color: "text-primary" },
          ].map((item, i) => (
            <div key={i} className="flex items-center gap-2 bg-secondary/50 backdrop-blur-sm rounded-full px-5 py-2.5 border border-border">
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

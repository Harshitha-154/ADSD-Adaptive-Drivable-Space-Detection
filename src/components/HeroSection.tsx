import { motion } from "framer-motion";
import { Shield, Zap, Brain, ChevronDown } from "lucide-react";
import heroBg from "@/assets/hero-bg.jpg";
import ParticleField from "./ParticleField";
import GlitchText from "./GlitchText";
import { playSuccessChime } from "@/lib/sound";
import { useEffect } from "react";

const HeroSection = () => {
  useEffect(() => {
    const timer = setTimeout(() => playSuccessChime(), 1200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0">
        <motion.img
          src={heroBg}
          alt=""
          className="w-full h-full object-cover"
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 0.2 }}
          transition={{ duration: 2, ease: "easeOut" }}
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/50 to-background" />
      </div>

      {/* Particle field */}
      <ParticleField className="z-[1] opacity-60" />

      {/* Animated grid overlay */}
      <div className="absolute inset-0 z-[2] opacity-[0.03]" style={{
        backgroundImage: 'linear-gradient(hsl(190 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 100% 50%) 1px, transparent 1px)',
        backgroundSize: '80px 80px'
      }} />

      {/* Scan line */}
      <motion.div
        className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-primary/30 to-transparent z-[3]"
        animate={{ top: ["0%", "100%"] }}
        transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
      />

      <div className="relative z-10 container mx-auto px-4 text-center py-32">
        {/* Status badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
          className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-8"
        >
          <motion.div
            className="w-2 h-2 rounded-full bg-success"
            animate={{ opacity: [1, 0.3, 1] }}
            transition={{ duration: 1.5, repeat: Infinity }}
          />
          <span className="font-display text-[10px] tracking-[0.2em] text-primary">SYSTEM ONLINE</span>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="font-display text-xs tracking-[0.3em] text-primary mb-6 uppercase"
        >
          AI-Powered Autonomous Safety
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          <h1 className="font-heading text-4xl md:text-6xl lg:text-8xl font-bold text-foreground leading-tight mb-2">
            Adaptive Drivable Space
          </h1>
          <div className="relative inline-block">
            <GlitchText
              text="Detection"
              as="h1"
              className="text-4xl md:text-6xl lg:text-8xl font-bold text-primary text-glow-primary"
            />
            {/* Reflection effect */}
            <div className="absolute -bottom-8 left-0 right-0 h-8 bg-gradient-to-b from-primary/10 to-transparent blur-sm" />
          </div>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7 }}
          className="text-muted-foreground text-lg md:text-xl max-w-3xl mx-auto mb-12 mt-8"
        >
          Self-Learning Road Memory System with Real-Time Confidence-Based
          Driving Zones & Context-Aware Guidance
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9 }}
          className="flex flex-wrap justify-center gap-4"
        >
          {[
            { icon: Shield, label: "Real-Time Safety", color: "text-accent", borderColor: "border-accent/30", glow: "shadow-accent/20" },
            { icon: Zap, label: "High-Speed Processing", color: "text-warning", borderColor: "border-warning/30", glow: "shadow-warning/20" },
            { icon: Brain, label: "Self-Learning AI", color: "text-primary", borderColor: "border-primary/30", glow: "shadow-primary/20" },
          ].map((item, i) => (
            <motion.div
              key={i}
              whileHover={{ scale: 1.08, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2.5 bg-card/60 backdrop-blur-md rounded-full px-5 py-3 border ${item.borderColor} shadow-lg ${item.glow} cursor-pointer transition-shadow hover:shadow-xl`}
            >
              <item.icon className={`w-4 h-4 ${item.color}`} />
              <span className="text-sm font-medium text-foreground">{item.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-[10px] font-display tracking-[0.2em] text-muted-foreground">SCROLL</span>
            <ChevronDown className="w-4 h-4 text-primary/60" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;

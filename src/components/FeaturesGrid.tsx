import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Play, Pause } from "lucide-react";
import { playClickSound, playHoverSound } from "@/lib/sound";
import FeatureDetailModal from "./FeatureDetailModal";

const features = [
  {
    title: "Drivable Space Detection",
    description: "Real-time segmentation of safe driving zones with precise road boundary identification. Works on unmarked roads, mud, sand, and degraded surfaces.",
    video: "/videos/feature-drivable-space.mp4",
    badges: [
      { label: "Safe Zone", color: "bg-success text-success-foreground" },
      { label: "Caution: Road Edge", color: "bg-warning text-warning-foreground" },
    ],
  },
  {
    title: "Self-Learning Road Memory",
    description: "Stores previously encountered unsafe zones and improves future predictions. Simulates human driving experience through adaptive learning.",
    video: "/videos/feature-road-memory.mp4",
    badges: [
      { label: "⚠ Alert", color: "bg-warning text-warning-foreground" },
      { label: "Hazardous Zone", color: "bg-destructive text-destructive-foreground" },
    ],
  },
  {
    title: "Confidence-Based Zones",
    description: "Visualizes AI confidence levels across the driving surface. Green for high confidence, yellow for moderate, red for low — enabling proactive decisions.",
    video: "/videos/feature-confidence-zones.mp4",
    badges: [
      { label: "High Confidence", color: "bg-success text-success-foreground" },
      { label: "Moderate", color: "bg-warning text-warning-foreground" },
      { label: "Low", color: "bg-destructive text-destructive-foreground" },
    ],
  },
  {
    title: "Traffic Signal Detection",
    description: "Automatic detection and classification of traffic lights. Instantly identifies red, green, and yellow signals for driving decisions.",
    video: "/videos/feature-traffic-signal.mp4",
    badges: [
      { label: "🔴 Stop — Red Light", color: "bg-destructive text-destructive-foreground" },
    ],
  },
  {
    title: "Brake Alert System",
    description: "Detects brake lights on vehicles ahead and issues real-time warnings. Prevents rear-end collisions through early alert notifications.",
    video: "/videos/feature-brake-alert.mp4",
    badges: [
      { label: "⚠ Slow Down", color: "bg-warning text-warning-foreground" },
    ],
  },
  {
    title: "Context-Aware Driving Guidance",
    description: "Combines all sensor inputs into a final driving decision: Safe to Move, Proceed with Caution, Slow Down, or Stop.",
    video: "/videos/feature-driving-guidance.mp4",
    badges: [
      { label: "✅ Safe to Proceed", color: "bg-success text-success-foreground" },
    ],
  },
];

const FeaturesGrid = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  return (
    <>
      <section id="features" className="py-24 relative">
        <div className="container mx-auto px-4">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-display text-xs tracking-[0.3em] text-primary text-center mb-4"
          >
            CORE MODULES
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
          >
            Core Features
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
          >
            Click any feature to explore detailed explanations, demo videos, and the technologies behind it
          </motion.p>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                onClick={() => { playClickSound(); setSelectedFeature(feature.title); }}
                onHoverStart={() => {
                  playHoverSound();
                  const v = videoRefs.current[index];
                  if (v) v.play().catch(() => {});
                }}
                onHoverEnd={() => {
                  const v = videoRefs.current[index];
                  if (v) { v.pause(); v.currentTime = 0; }
                }}
                className="group relative rounded-xl overflow-hidden bg-card border border-border hover:border-primary/50 transition-all duration-300 cursor-pointer"
              >
                {/* Video area */}
                <div className="relative aspect-video overflow-hidden">
                  <video
                    ref={(el) => { videoRefs.current[index] = el; }}
                    src={feature.video}
                    muted
                    loop
                    playsInline
                    preload="metadata"
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-background/20 group-hover:bg-transparent transition-all duration-300" />

                  {/* Play icon overlay */}
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="w-12 h-12 rounded-full bg-primary/80 flex items-center justify-center">
                      <Play className="w-5 h-5 text-primary-foreground ml-0.5" />
                    </div>
                  </div>

                  {/* Scan line on hover */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity pointer-events-none">
                    <div className="absolute w-full h-px bg-primary animate-scan-line" />
                  </div>

                  {/* Badges */}
                  <div className="absolute bottom-3 left-3 flex flex-wrap gap-2">
                    {feature.badges.map((badge) => (
                      <span key={badge.label} className={`text-xs font-semibold px-2.5 py-1 rounded-full ${badge.color}`}>
                        {badge.label}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
                </div>

                {/* Hover glow */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none rounded-xl" style={{ boxShadow: 'inset 0 0 60px hsl(190 100% 50% / 0.05)' }} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <FeatureDetailModal featureTitle={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </>
  );
};

export default FeaturesGrid;

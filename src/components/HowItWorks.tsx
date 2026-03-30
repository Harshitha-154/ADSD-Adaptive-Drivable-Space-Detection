import { motion } from "framer-motion";
import { Camera, Cpu, Brain, Shield, ArrowRight } from "lucide-react";
import bgNightDriving from "@/assets/bg-night-driving.jpg";

const steps = [
  {
    icon: Camera,
    step: "01",
    title: "Sensor Input",
    subtitle: "Data Acquisition",
    desc: "Front-mounted dashcam captures 1080p video at 30 FPS. GPS module provides real-time coordinates. Environmental sensors detect rain, fog, and lighting conditions. All data streams are time-synchronized.",
    details: ["1080p @ 30 FPS dashcam", "RTK GPS (2cm accuracy)", "IMU accelerometer", "Ambient light sensor"],
  },
  {
    icon: Cpu,
    step: "02",
    title: "AI Processing",
    subtitle: "Deep Learning Pipeline",
    desc: "Frames are processed through multiple neural networks in parallel: DeepLabV3+ for road segmentation, YOLOv8 for object detection, and custom CNNs for traffic signal classification — all running on NVIDIA Jetson.",
    details: ["DeepLabV3+ segmentation", "YOLOv8 object detection", "CNN signal classifier", "Parallel GPU inference"],
  },
  {
    icon: Brain,
    step: "03",
    title: "Decision Fusion",
    subtitle: "Context-Aware Intelligence",
    desc: "The Decision Engine fuses all module outputs with road memory data. A weighted priority matrix and fuzzy logic engine process conflicting signals. Environmental context adjusts confidence thresholds dynamically.",
    details: ["Weighted decision matrix", "Fuzzy logic engine", "Road memory recall", "Temporal smoothing"],
  },
  {
    icon: Shield,
    step: "04",
    title: "Output & Action",
    subtitle: "Real-Time Response",
    desc: "Final driving instruction is generated in under 50ms total pipeline latency. HUD overlay displays drivable zones, confidence heatmap, and alerts. Audio warnings are triggered for critical situations.",
    details: ["<50ms end-to-end latency", "HUD visual overlay", "Audio alert system", "CAN bus integration"],
  },
];

const HowItWorks = () => {
  return (
    <section id="how-it-works" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgNightDriving} alt="" className="w-full h-full object-cover opacity-20" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/80 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.3em] text-primary text-center mb-4"
        >
          SYSTEM ARCHITECTURE
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          How It Works
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          From camera input to driving decision — a complete end-to-end AI pipeline in under 50 milliseconds
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="relative"
            >
              {i < steps.length - 1 && (
                <div className="hidden lg:block absolute top-12 -right-3 z-10">
                  <ArrowRight className="w-6 h-6 text-primary/50" />
                </div>
              )}

              <div className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 h-full hover:border-primary/30 transition-colors">
                <div className="flex items-center gap-3 mb-4">
                  <step.icon className="w-8 h-8 text-primary" />
                  <span className="font-display text-xs text-primary/60">STEP {step.step}</span>
                </div>
                <h3 className="font-heading text-xl font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-primary/70 font-medium mb-3">{step.subtitle}</p>
                <p className="text-sm text-muted-foreground mb-4">{step.desc}</p>
                <div className="space-y-2">
                  {step.details.map((d) => (
                    <div key={d} className="flex items-center gap-2 text-xs text-muted-foreground">
                      <div className="w-1.5 h-1.5 rounded-full bg-primary/60" />
                      {d}
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;

import { motion } from "framer-motion";
import { Eye, Brain, CloudLightning, AlertTriangle, TrafficCone, Car, Monitor, Bell } from "lucide-react";

const capabilities = [
  { icon: Eye, title: "Drivable Road Detection", desc: "Precise segmentation of safe driving surfaces in real-time" },
  { icon: AlertTriangle, title: "Risk Area Identification", desc: "Highlights road edges, obstacles, and unclear surfaces" },
  { icon: TrafficCone, title: "Confidence Level Mapping", desc: "Color-coded zones showing AI certainty for each road region" },
  { icon: CloudLightning, title: "Environment Adaptation", desc: "Adjusts to rain, low light, glare, and adverse weather" },
  { icon: Brain, title: "Self-Learning Memory", desc: "Learns from past unsafe zones to improve future predictions" },
  { icon: Car, title: "Vehicle Behavior Detection", desc: "Monitors brake lights and behavior of vehicles ahead" },
  { icon: Monitor, title: "Traffic Signal Recognition", desc: "Detects red, green, yellow signals for automated decisions" },
  { icon: Bell, title: "Real-Time Alert System", desc: "Instant notifications for hazards, signals, and unsafe zones" },
];

const SystemOverview = () => {
  return (
    <section id="overview" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          System Capabilities
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          A comprehensive AI pipeline delivering end-to-end autonomous driving intelligence
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {capabilities.map((cap, i) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <cap.icon className="w-8 h-8 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{cap.title}</h3>
              <p className="text-sm text-muted-foreground">{cap.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SystemOverview;

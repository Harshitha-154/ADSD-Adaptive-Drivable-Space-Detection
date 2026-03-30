import { motion } from "framer-motion";
import { Car, Truck, Construction, Cloud, MoonStar, Mountain } from "lucide-react";
import bgAerial from "@/assets/bg-aerial-road.jpg";

const useCases = [
  {
    icon: Car,
    title: "Highway Autonomous Driving",
    desc: "Full-speed highway operation with lane-free drivable space detection, automatic brake response to vehicles ahead, and signal recognition at exit ramps.",
    tags: ["Highway", "High-Speed", "Lane-Free"],
  },
  {
    icon: Construction,
    title: "Construction Zone Navigation",
    desc: "Handles temporary road changes, absent lane markings, detour signs, and cones. Self-Learning Memory stores construction zones for improved predictions.",
    tags: ["Construction", "Dynamic", "Memory"],
  },
  {
    icon: MoonStar,
    title: "Night Driving & Low Visibility",
    desc: "Condition-adaptive detection adjusts contrast and sensitivity for nighttime operation. Brake light detection operates with enhanced HDR processing.",
    tags: ["Night", "Low-Light", "HDR"],
  },
  {
    icon: Cloud,
    title: "Adverse Weather Operation",
    desc: "Rain, fog, and glare adaptation through real-time image enhancement preprocessing. The system reduces speed recommendations when weather degrades confidence.",
    tags: ["Rain", "Fog", "Glare"],
  },
  {
    icon: Mountain,
    title: "Rural & Unmarked Roads",
    desc: "Excels where traditional systems fail — unpaved roads, missing lane markings, and ambiguous road boundaries using texture and elevation cues.",
    tags: ["Rural", "Unpaved", "No-Lane"],
  },
  {
    icon: Truck,
    title: "Commercial Fleet Integration",
    desc: "Scalable architecture for truck fleets with centralized Road Memory sharing. When one vehicle encounters a hazard, all fleet vehicles receive the update.",
    tags: ["Fleet", "Scalable", "Cloud-Sync"],
  },
];

const UseCases = () => {
  return (
    <section id="use-cases" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgAerial} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.3em] text-primary text-center mb-4"
        >
          APPLICATIONS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          Real-World Use Cases
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Designed for the toughest driving scenarios where traditional ADAS systems fail
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {useCases.map((uc, i) => (
            <motion.div
              key={uc.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/30 transition-all"
            >
              <uc.icon className="w-8 h-8 text-primary mb-4" />
              <h3 className="font-heading text-xl font-bold text-foreground mb-3">{uc.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{uc.desc}</p>
              <div className="flex flex-wrap gap-2">
                {uc.tags.map((tag) => (
                  <span key={tag} className="text-xs px-2.5 py-1 rounded-full bg-secondary text-secondary-foreground">
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default UseCases;

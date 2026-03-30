import { motion } from "framer-motion";
import { Check, X, Minus } from "lucide-react";

const features = [
  "Drivable Space Segmentation",
  "Works on Unmarked Roads",
  "Self-Learning Road Memory",
  "Confidence-Based Zones",
  "Traffic Signal Detection",
  "Brake Light Detection",
  "Weather Adaptation",
  "Context-Aware Decision",
  "Real-Time (<50ms)",
  "Edge Device Deployment",
];

const systems = [
  { name: "Traditional ADAS", values: [false, false, false, false, "partial", false, false, false, true, true] },
  { name: "Tesla Autopilot", values: [true, "partial", false, false, true, true, "partial", "partial", true, true] },
  { name: "Mobileye", values: [true, "partial", false, false, true, false, "partial", false, true, true] },
  { name: "Our ADSD System", values: [true, true, true, true, true, true, true, true, true, true] },
];

const CellIcon = ({ value }: { value: boolean | string }) => {
  if (value === true) return <Check className="w-5 h-5 text-success" />;
  if (value === false) return <X className="w-5 h-5 text-destructive" />;
  return <Minus className="w-5 h-5 text-warning" />;
};

const ComparisonTable = () => {
  return (
    <section className="py-24">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.3em] text-primary text-center mb-4"
        >
          COMPARISON
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          How We Compare
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Feature-by-feature comparison against existing autonomous driving systems
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="overflow-x-auto"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-4 text-sm font-heading font-bold text-foreground">Feature</th>
                {systems.map((s) => (
                  <th key={s.name} className={`p-4 text-sm font-heading font-bold text-center ${s.name === "Our ADSD System" ? "text-primary" : "text-foreground"}`}>
                    {s.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => (
                <tr key={feature} className="border-b border-border/50 hover:bg-secondary/30 transition-colors">
                  <td className="p-4 text-sm text-muted-foreground">{feature}</td>
                  {systems.map((s) => (
                    <td key={s.name} className="p-4 text-center">
                      <div className="flex justify-center">
                        <CellIcon value={s.values[i]} />
                      </div>
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>
      </div>
    </section>
  );
};

export default ComparisonTable;

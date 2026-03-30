import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, OctagonIcon, ChevronDown } from "lucide-react";

const decisions = [
  {
    icon: CheckCircle,
    label: "Safe to Move",
    desc: "Clear road, green signal, no obstacles detected",
    color: "text-success",
    borderColor: "border-success/30",
    bgColor: "bg-success/5",
  },
  {
    icon: AlertTriangle,
    label: "Proceed with Caution",
    desc: "Moderate confidence zone or uncertain road conditions",
    color: "text-warning",
    borderColor: "border-warning/30",
    bgColor: "bg-warning/5",
  },
  {
    icon: ChevronDown,
    label: "Slow Down",
    desc: "Vehicle braking ahead or yellow signal detected",
    color: "text-warning",
    borderColor: "border-warning/30",
    bgColor: "bg-warning/5",
  },
  {
    icon: OctagonIcon,
    label: "Stop",
    desc: "Red signal, obstacle, or unsafe zone ahead",
    color: "text-destructive",
    borderColor: "border-destructive/30",
    bgColor: "bg-destructive/5",
  },
];

const DecisionEngine = () => {
  return (
    <section id="decisions" className="py-24">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          Decision Engine
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Combined analysis from all modules produces a single, clear driving instruction
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {decisions.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`${d.bgColor} border ${d.borderColor} rounded-xl p-6 text-center`}
            >
              <d.icon className={`w-10 h-10 ${d.color} mx-auto mb-4`} />
              <h3 className={`font-heading text-xl font-bold ${d.color} mb-2`}>{d.label}</h3>
              <p className="text-sm text-muted-foreground">{d.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DecisionEngine;

import { motion } from "framer-motion";
import { CheckCircle, AlertTriangle, OctagonIcon, ChevronDown, Brain, Activity } from "lucide-react";
import { useState } from "react";
import { playClickSound, playSwooshSound } from "@/lib/sound";

const decisions = [
  {
    icon: CheckCircle,
    label: "Safe to Move",
    desc: "Clear road, green signal, no obstacles detected",
    color: "text-success",
    borderColor: "border-success/40",
    bgColor: "bg-success/5",
    glowColor: "hsl(145 72% 45%)",
    pulseRing: "ring-success/20",
  },
  {
    icon: AlertTriangle,
    label: "Proceed with Caution",
    desc: "Moderate confidence zone or uncertain road conditions",
    color: "text-warning",
    borderColor: "border-warning/40",
    bgColor: "bg-warning/5",
    glowColor: "hsl(45 100% 55%)",
    pulseRing: "ring-warning/20",
  },
  {
    icon: ChevronDown,
    label: "Slow Down",
    desc: "Vehicle braking ahead or yellow signal detected",
    color: "text-warning",
    borderColor: "border-warning/40",
    bgColor: "bg-warning/5",
    glowColor: "hsl(45 100% 55%)",
    pulseRing: "ring-warning/20",
  },
  {
    icon: OctagonIcon,
    label: "Stop",
    desc: "Red signal, obstacle, or unsafe zone ahead",
    color: "text-destructive",
    borderColor: "border-destructive/40",
    bgColor: "bg-destructive/5",
    glowColor: "hsl(0 72% 55%)",
    pulseRing: "ring-destructive/20",
  },
];

const DecisionEngine = () => {
  const [activeCard, setActiveCard] = useState<number | null>(null);

  return (
    <section id="decisions" className="py-24 relative overflow-hidden">
      {/* Neural network background lines */}
      <svg className="absolute inset-0 w-full h-full opacity-[0.03]" xmlns="http://www.w3.org/2000/svg">
        {Array.from({ length: 20 }).map((_, i) => (
          <motion.line
            key={i}
            x1={`${Math.random() * 100}%`}
            y1={`${Math.random() * 100}%`}
            x2={`${Math.random() * 100}%`}
            y2={`${Math.random() * 100}%`}
            stroke="hsl(190 100% 50%)"
            strokeWidth="1"
            initial={{ pathLength: 0, opacity: 0 }}
            whileInView={{ pathLength: 1, opacity: 0.5 }}
            viewport={{ once: true }}
            transition={{ duration: 2, delay: i * 0.1 }}
          />
        ))}
      </svg>

      <div className="container mx-auto px-4 relative z-10">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6"
            animate={{ boxShadow: ["0 0 15px hsl(190 100% 50%/0.1)", "0 0 30px hsl(190 100% 50%/0.25)", "0 0 15px hsl(190 100% 50%/0.1)"] }}
            transition={{ duration: 2.5, repeat: Infinity }}
          >
            <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
              <Brain className="w-4 h-4 text-primary" />
            </motion.div>
            <span className="font-display text-[10px] tracking-[0.2em] text-primary">AI DECISION SYSTEM</span>
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          Decision <span className="text-primary text-glow-primary">Engine</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-6"
        >
          Combined analysis from all modules produces a single, clear driving instruction
        </motion.p>

        {/* Data flow visualization */}
        <motion.div
          className="flex justify-center items-center gap-2 mb-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <Activity className="w-4 h-4 text-primary/60" />
          <div className="flex gap-1">
            {Array.from({ length: 20 }).map((_, i) => (
              <motion.div
                key={i}
                className="w-1.5 h-4 rounded-full bg-primary/30"
                animate={{
                  scaleY: [0.3, 1, 0.3],
                  opacity: [0.3, 1, 0.3],
                }}
                transition={{
                  duration: 1.5,
                  repeat: Infinity,
                  delay: i * 0.08,
                }}
              />
            ))}
          </div>
          <Activity className="w-4 h-4 text-primary/60" />
        </motion.div>

        {/* Decision cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {decisions.map((d, i) => (
            <motion.div
              key={d.label}
              initial={{ opacity: 0, y: 50, rotateX: 15 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, type: "spring", stiffness: 100 }}
              whileHover={{
                scale: 1.05,
                y: -8,
                transition: { duration: 0.3 },
              }}
              whileTap={{ scale: 0.97 }}
              onMouseEnter={() => { setActiveCard(i); playSwooshSound(); }}
              onMouseLeave={() => setActiveCard(null)}
              onClick={() => playClickSound()}
              className={`relative ${d.bgColor} border ${d.borderColor} rounded-2xl p-8 text-center cursor-pointer group overflow-hidden`}
              style={{
                boxShadow: activeCard === i ? `0 0 40px ${d.glowColor.replace(")", "/0.3)")}` : "none",
                transition: "box-shadow 0.3s ease",
              }}
            >
              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-4 h-4 border-l border-t border-current opacity-20 rounded-tl" style={{ color: d.glowColor }} />
              <div className="absolute top-2 right-2 w-4 h-4 border-r border-t border-current opacity-20 rounded-tr" style={{ color: d.glowColor }} />
              <div className="absolute bottom-2 left-2 w-4 h-4 border-l border-b border-current opacity-20 rounded-bl" style={{ color: d.glowColor }} />
              <div className="absolute bottom-2 right-2 w-4 h-4 border-r border-b border-current opacity-20 rounded-br" style={{ color: d.glowColor }} />

              {/* Pulse ring */}
              <motion.div
                className={`absolute inset-0 rounded-2xl ring-2 ${d.pulseRing}`}
                animate={{ opacity: [0, 0.5, 0] }}
                transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
              />

              {/* Icon with glow */}
              <div className="relative inline-block mb-5">
                <motion.div
                  animate={activeCard === i ? { scale: [1, 1.2, 1] } : {}}
                  transition={{ duration: 0.6, repeat: activeCard === i ? Infinity : 0 }}
                >
                  <d.icon className={`w-12 h-12 ${d.color} mx-auto`} style={{ filter: `drop-shadow(0 0 12px ${d.glowColor.replace(")", "/0.5)")})` }} />
                </motion.div>
                <motion.div
                  className="absolute inset-0 rounded-full"
                  style={{ background: `radial-gradient(circle, ${d.glowColor.replace(")", "/0.15)")}, transparent 70%)` }}
                  animate={{ scale: [1, 1.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                />
              </div>

              <h3 className={`font-heading text-xl font-bold ${d.color} mb-3`}>{d.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>

              {/* Scan line on hover */}
              {activeCard === i && (
                <motion.div
                  className="absolute left-0 right-0 h-px"
                  style={{ background: `linear-gradient(90deg, transparent, ${d.glowColor.replace(")", "/0.4)")}, transparent)` }}
                  initial={{ top: 0 }}
                  animate={{ top: "100%" }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                />
              )}
            </motion.div>
          ))}
        </div>

        {/* Bottom connector line */}
        <motion.div
          className="mt-12 flex justify-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <motion.div
            className="h-1 rounded-full bg-gradient-to-r from-success via-warning to-destructive"
            initial={{ width: 0 }}
            whileInView={{ width: "60%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        </motion.div>
      </div>
    </section>
  );
};

export default DecisionEngine;

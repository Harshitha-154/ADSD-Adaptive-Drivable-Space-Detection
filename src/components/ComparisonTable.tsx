import { motion } from "framer-motion";
import { Check, X, Minus, Sparkles, Trophy, Zap } from "lucide-react";
import { useState, useEffect } from "react";

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

const CellIcon = ({ value, isADSD, revealed }: { value: boolean | string; isADSD: boolean; revealed: boolean }) => {
  if (!revealed) return <div className="w-5 h-5" />;

  if (value === true && isADSD) {
    return (
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={{ scale: 1, rotate: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 15 }}
      >
        <div className="relative">
          <Check className="w-5 h-5 text-success drop-shadow-[0_0_8px_hsl(145_72%_45%/0.8)]" />
          <motion.div
            className="absolute inset-0"
            animate={{ scale: [1, 1.8, 1], opacity: [0.5, 0, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Check className="w-5 h-5 text-success/30" />
          </motion.div>
        </div>
      </motion.div>
    );
  }

  if (value === true) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
        <Check className="w-5 h-5 text-success" />
      </motion.div>
    );
  }

  if (value === false) {
    return (
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
        <X className="w-5 h-5 text-destructive" />
      </motion.div>
    );
  }

  return (
    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring" }}>
      <Minus className="w-5 h-5 text-warning" />
    </motion.div>
  );
};

const ComparisonTable = () => {
  const [revealedRows, setRevealedRows] = useState<number[]>([]);
  const [hoveredRow, setHoveredRow] = useState<number | null>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          features.forEach((_, i) => {
            setTimeout(() => {
              setRevealedRows((prev) => [...prev, i]);
            }, i * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    const el = document.getElementById("comparison-table");
    if (el) observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="comparison-table" className="py-24 relative overflow-hidden">
      {/* Animated corner brackets */}
      <div className="absolute top-8 left-8 w-16 h-16 border-l-2 border-t-2 border-primary/20 rounded-tl-lg" />
      <div className="absolute top-8 right-8 w-16 h-16 border-r-2 border-t-2 border-primary/20 rounded-tr-lg" />
      <div className="absolute bottom-8 left-8 w-16 h-16 border-l-2 border-b-2 border-primary/20 rounded-bl-lg" />
      <div className="absolute bottom-8 right-8 w-16 h-16 border-r-2 border-b-2 border-primary/20 rounded-br-lg" />

      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-4"
        >
          <motion.div
            className="inline-flex items-center gap-2 bg-primary/10 border border-primary/30 rounded-full px-4 py-1.5 mb-6"
            animate={{ boxShadow: ["0 0 20px hsl(190 100% 50%/0.1)", "0 0 40px hsl(190 100% 50%/0.3)", "0 0 20px hsl(190 100% 50%/0.1)"] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Sparkles className="w-4 h-4 text-primary" />
            <span className="font-display text-[10px] tracking-[0.2em] text-primary">COMPETITIVE ANALYSIS</span>
          </motion.div>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          How We <span className="text-primary text-glow-primary">Compare</span>
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
          className="overflow-x-auto rounded-2xl border border-border/50 bg-card/30 backdrop-blur-sm"
        >
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left p-5 text-sm font-heading font-bold text-foreground">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-primary" />
                    Feature
                  </div>
                </th>
                {systems.map((s, i) => (
                  <th key={s.name} className="p-5 text-sm font-heading font-bold text-center relative">
                    <motion.div
                      initial={{ opacity: 0, y: -20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }}
                      className={s.name === "Our ADSD System" ? "text-primary" : "text-foreground"}
                    >
                      {s.name}
                      {s.name === "Our ADSD System" && (
                        <motion.div
                          className="absolute -top-1 left-1/2 -translate-x-1/2"
                          animate={{ y: [0, -5, 0] }}
                          transition={{ duration: 2, repeat: Infinity }}
                        >
                          <Trophy className="w-4 h-4 text-warning" />
                        </motion.div>
                      )}
                    </motion.div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature, i) => {
                const isRevealed = revealedRows.includes(i);
                return (
                  <motion.tr
                    key={feature}
                    className={`border-b border-border/30 transition-all duration-300 cursor-pointer ${
                      hoveredRow === i ? "bg-primary/5" : "hover:bg-secondary/20"
                    }`}
                    onMouseEnter={() => setHoveredRow(i)}
                    onMouseLeave={() => setHoveredRow(null)}
                    initial={{ opacity: 0, x: -30 }}
                    animate={isRevealed ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  >
                    <td className="p-5 text-sm text-muted-foreground font-medium">
                      <div className="flex items-center gap-3">
                        <motion.div
                          className="w-1.5 h-1.5 rounded-full bg-primary"
                          animate={isRevealed ? { scale: [0, 1.5, 1] } : {}}
                          transition={{ duration: 0.3 }}
                        />
                        {feature}
                      </div>
                    </td>
                    {systems.map((s) => (
                      <td key={s.name} className={`p-5 text-center ${s.name === "Our ADSD System" ? "bg-primary/[0.03]" : ""}`}>
                        <div className="flex justify-center">
                          <CellIcon value={s.values[i]} isADSD={s.name === "Our ADSD System"} revealed={isRevealed} />
                        </div>
                      </td>
                    ))}
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </motion.div>

        {/* Winner banner */}
        <AnimatePresence>
          {showWinner && (
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.9 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              className="mt-8 mx-auto max-w-lg text-center"
            >
              <motion.div
                className="inline-flex items-center gap-3 bg-primary/10 border border-primary/40 rounded-2xl px-8 py-4"
                animate={{
                  boxShadow: [
                    "0 0 20px hsl(190 100% 50%/0.1), 0 0 60px hsl(190 100% 50%/0.05)",
                    "0 0 40px hsl(190 100% 50%/0.3), 0 0 80px hsl(190 100% 50%/0.1)",
                    "0 0 20px hsl(190 100% 50%/0.1), 0 0 60px hsl(190 100% 50%/0.05)",
                  ],
                }}
                transition={{ duration: 3, repeat: Infinity }}
              >
                <motion.div animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 1, repeat: Infinity, repeatDelay: 2 }}>
                  <Trophy className="w-6 h-6 text-warning" />
                </motion.div>
                <span className="font-heading text-lg font-bold text-primary">
                  ADSD: 10/10 Features — <span className="text-success">Industry Leading</span>
                </span>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ComparisonTable;

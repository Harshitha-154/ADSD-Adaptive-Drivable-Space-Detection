import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { TrendingUp, Clock, Target, Gauge, ShieldCheck, Eye, Cpu, Zap } from "lucide-react";

const metrics = [
  { icon: Target, label: "Segmentation Accuracy", value: 96.8, suffix: "%", color: "text-success" },
  { icon: Gauge, label: "Real-Time FPS", value: 30, suffix: " FPS", color: "text-primary" },
  { icon: Clock, label: "Pipeline Latency", value: 33, suffix: "ms", color: "text-warning", prefix: "<" },
  { icon: ShieldCheck, label: "Decision Accuracy", value: 99.2, suffix: "%", color: "text-accent" },
  { icon: Eye, label: "Detection Range", value: 150, suffix: "m", color: "text-primary" },
  { icon: TrendingUp, label: "Learning Rate", value: 15, suffix: "%/wk", color: "text-success" },
  { icon: Cpu, label: "Models Running", value: 8, suffix: "", color: "text-warning" },
  { icon: Zap, label: "Power Draw", value: 25, suffix: "W", color: "text-accent", prefix: "<" },
];

function AnimatedCounter({ value, suffix, prefix }: { value: number; suffix: string; prefix?: string }) {
  const [display, setDisplay] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !inView) setInView(true);
    }, { threshold: 0.3 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [inView]);

  useEffect(() => {
    if (!inView) return;
    const duration = 1500;
    const start = performance.now();
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setDisplay(Number((eased * value).toFixed(value % 1 !== 0 ? 1 : 0)));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [inView, value]);

  return (
    <div ref={ref}>
      <span className="font-display text-3xl font-bold">
        {prefix}{display}{suffix}
      </span>
    </div>
  );
}

const PerformanceMetrics = () => {
  return (
    <section id="performance" className="py-24">
      <div className="container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.3em] text-primary text-center mb-4"
        >
          BENCHMARKS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          Performance Metrics
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Real benchmark results from our testing pipeline across 10,000+ road scenarios
        </motion.p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {metrics.map((m, i) => (
            <motion.div
              key={m.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card border border-border rounded-xl p-6 text-center hover:border-primary/30 transition-all"
            >
              <m.icon className={`w-6 h-6 ${m.color} mx-auto mb-3`} />
              <div className={m.color}>
                <AnimatedCounter value={m.value} suffix={m.suffix} prefix={m.prefix} />
              </div>
              <p className="text-sm text-muted-foreground mt-2">{m.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default PerformanceMetrics;

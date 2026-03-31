import { motion } from "framer-motion";
import { Radar, Wifi, Radio, Crosshair, Scan, Signal, Binary, CircuitBoard } from "lucide-react";

const symbols = [
  { Icon: Radar, x: "5%", y: "15%", delay: 0, duration: 18 },
  { Icon: Wifi, x: "92%", y: "25%", delay: 2, duration: 22 },
  { Icon: Radio, x: "15%", y: "70%", delay: 4, duration: 16 },
  { Icon: Crosshair, x: "85%", y: "60%", delay: 1, duration: 20 },
  { Icon: Scan, x: "50%", y: "10%", delay: 3, duration: 24 },
  { Icon: Signal, x: "75%", y: "80%", delay: 5, duration: 19 },
  { Icon: Binary, x: "30%", y: "85%", delay: 2.5, duration: 21 },
  { Icon: CircuitBoard, x: "60%", y: "40%", delay: 1.5, duration: 17 },
];

const FloatingSymbols = () => (
  <div className="fixed inset-0 pointer-events-none z-[1] overflow-hidden">
    {symbols.map(({ Icon, x, y, delay, duration }, i) => (
      <motion.div
        key={i}
        className="absolute"
        style={{ left: x, top: y }}
        initial={{ opacity: 0 }}
        animate={{
          opacity: [0, 0.12, 0.06, 0.15, 0],
          y: [0, -30, -10, -40, 0],
          x: [0, 10, -5, 15, 0],
          rotate: [0, 90, 180, 270, 360],
          scale: [0.8, 1.1, 0.9, 1.2, 0.8],
        }}
        transition={{
          duration,
          repeat: Infinity,
          delay,
          ease: "easeInOut",
        }}
      >
        <Icon className="w-6 h-6 text-primary/20" />
      </motion.div>
    ))}
  </div>
);

export default FloatingSymbols;

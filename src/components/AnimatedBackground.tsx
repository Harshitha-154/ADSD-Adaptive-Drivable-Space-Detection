import { motion } from "framer-motion";

const AnimatedBackground = () => (
  <div className="fixed inset-0 z-0 overflow-hidden">
    {/* Base dark background */}
    <div className="absolute inset-0 bg-background" />

    {/* Shifting color orbs */}
    <motion.div
      className="absolute w-[800px] h-[800px] rounded-full blur-[200px] opacity-[0.07]"
      style={{ background: "radial-gradient(circle, hsl(190 100% 50%), transparent 70%)" }}
      animate={{
        x: [-200, 300, -100, 200, -200],
        y: [-100, 200, 400, 100, -100],
      }}
      transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute right-0 w-[600px] h-[600px] rounded-full blur-[180px] opacity-[0.05]"
      style={{ background: "radial-gradient(circle, hsl(160 100% 45%), transparent 70%)" }}
      animate={{
        x: [100, -200, 150, -300, 100],
        y: [200, -100, 300, 0, 200],
      }}
      transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
    />
    <motion.div
      className="absolute bottom-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[150px] opacity-[0.04]"
      style={{ background: "radial-gradient(circle, hsl(45 100% 55%), transparent 70%)" }}
      animate={{
        x: [0, 200, -150, 100, 0],
        y: [0, -200, -100, -300, 0],
      }}
      transition={{ duration: 35, repeat: Infinity, ease: "easeInOut" }}
    />

    {/* Grid pattern */}
    <div
      className="absolute inset-0 opacity-[0.02]"
      style={{
        backgroundImage:
          "linear-gradient(hsl(190 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 100% 50%) 1px, transparent 1px)",
        backgroundSize: "100px 100px",
      }}
    />

    {/* Moving scan line */}
    <motion.div
      className="absolute left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent"
      animate={{ top: ["-5%", "105%"] }}
      transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
    />
  </div>
);

export default AnimatedBackground;

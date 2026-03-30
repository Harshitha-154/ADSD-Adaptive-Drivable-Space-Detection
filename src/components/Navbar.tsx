import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Radar, Menu, X } from "lucide-react";
import { playClickSound, playSwooshSound } from "@/lib/sound";

const navLinks = [
  { label: "Features", href: "#features" },
  { label: "How It Works", href: "#how-it-works" },
  { label: "Capabilities", href: "#overview" },
  { label: "Demos", href: "#demos" },
  { label: "Technology", href: "#tech" },
  { label: "Performance", href: "#performance" },
  { label: "Use Cases", href: "#use-cases" },
  { label: "Decisions", href: "#decisions" },
];

const Navbar = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-background/90 backdrop-blur-xl border-b border-border shadow-lg shadow-background/50'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="container mx-auto flex items-center justify-between h-16 px-4">
        <motion.a
          href="#"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 font-display text-xl font-bold text-primary"
          onClick={() => playClickSound()}
        >
          <motion.div
            animate={{ rotate: [0, 360] }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            <Radar className="w-7 h-7" />
          </motion.div>
          ADSD
        </motion.a>

        {/* Desktop */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link, i) => (
            <motion.a
              key={link.label}
              href={link.href}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 + i * 0.05 }}
              className="relative text-sm font-medium text-muted-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-primary/5 group"
              onClick={() => { playClickSound(); }}
            >
              {link.label}
              <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-primary group-hover:w-3/4 transition-all duration-300 rounded-full" />
            </motion.a>
          ))}
        </div>

        {/* Mobile toggle */}
        <motion.button
          whileTap={{ scale: 0.9, rotate: 90 }}
          className="md:hidden text-foreground p-2"
          onClick={() => { setOpen(!open); playSwooshSound(); }}
        >
          {open ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </motion.button>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3 }}
            className="md:hidden bg-background/95 backdrop-blur-xl border-b border-border overflow-hidden"
          >
            <div className="flex flex-col p-4 gap-1">
              {navLinks.map((link, i) => (
                <motion.a
                  key={link.label}
                  href={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                  className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors py-3 px-3 rounded-lg hover:bg-primary/5"
                  onClick={() => { setOpen(false); playClickSound(); }}
                >
                  {link.label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;

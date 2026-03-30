import { Radar } from "lucide-react";

const Footer = () => (
  <footer className="border-t border-border py-12">
    <div className="container mx-auto px-4 text-center">
      <div className="flex items-center justify-center gap-2 mb-4">
        <Radar className="w-6 h-6 text-primary" />
        <span className="font-display text-lg font-bold text-primary">ADSD</span>
      </div>
      <p className="text-sm text-muted-foreground">
        Adaptive Drivable Space Detection — AI-Powered Autonomous Safety System
      </p>
      <p className="text-xs text-muted-foreground/60 mt-4">
        © {new Date().getFullYear()} ADSD Research Project. All rights reserved.
      </p>
    </div>
  </footer>
);

export default Footer;

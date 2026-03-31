import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, X, Eye } from "lucide-react";
import { playClickSound, playHoverSound, playVideoStartSound, playVideoStopSound, playSwooshSound } from "@/lib/sound";
import FeatureDetailModal from "./FeatureDetailModal";

const features = [
  {
    title: "Drivable Space Detection",
    description: "Real-time segmentation of safe driving zones with precise road boundary identification. Works on unmarked roads, mud, sand, and degraded surfaces.",
    video: "/videos/feature-drivable-space.mp4",
    badges: [
      { label: "Safe Zone", color: "bg-success text-success-foreground" },
      { label: "Caution: Road Edge", color: "bg-warning text-warning-foreground" },
    ],
    accent: "from-success/20 to-warning/10",
  },
  {
    title: "Self-Learning Road Memory",
    description: "Stores previously encountered unsafe zones and improves future predictions. Simulates human driving experience through adaptive learning.",
    video: "/videos/feature-road-memory.mp4",
    badges: [
      { label: "⚠ Alert", color: "bg-warning text-warning-foreground" },
      { label: "Hazardous Zone", color: "bg-destructive text-destructive-foreground" },
    ],
    accent: "from-warning/20 to-destructive/10",
  },
  {
    title: "Confidence-Based Zones",
    description: "Visualizes AI confidence levels across the driving surface. Green for high confidence, yellow for moderate, red for low — enabling proactive decisions.",
    video: "/videos/feature-confidence-zones.mp4",
    badges: [
      { label: "High Confidence", color: "bg-success text-success-foreground" },
      { label: "Moderate", color: "bg-warning text-warning-foreground" },
      { label: "Low", color: "bg-destructive text-destructive-foreground" },
    ],
    accent: "from-success/20 to-destructive/10",
  },
  {
    title: "Traffic Signal Detection",
    description: "Automatic detection and classification of traffic lights. Instantly identifies red, green, and yellow signals for driving decisions.",
    video: "/videos/feature-traffic-signal.mp4",
    badges: [
      { label: "🔴 Stop — Red Light", color: "bg-destructive text-destructive-foreground" },
    ],
    accent: "from-destructive/20 to-primary/10",
  },
  {
    title: "Brake Alert System",
    description: "Detects brake lights on vehicles ahead and issues real-time warnings. Prevents rear-end collisions through early alert notifications.",
    video: "/videos/feature-brake-alert.mp4",
    badges: [
      { label: "⚠ Slow Down", color: "bg-warning text-warning-foreground" },
    ],
    accent: "from-warning/20 to-primary/10",
  },
  {
    title: "Context-Aware Driving Guidance",
    description: "Combines all sensor inputs into a final driving decision: Safe to Move, Proceed with Caution, Slow Down, or Stop.",
    video: "/videos/feature-driving-guidance.mp4",
    badges: [
      { label: "✅ Safe to Proceed", color: "bg-success text-success-foreground" },
    ],
    accent: "from-primary/20 to-accent/10",
  },
];

const FeaturesGrid = () => {
  const [selectedFeature, setSelectedFeature] = useState<string | null>(null);
  const [playingCard, setPlayingCard] = useState<number | null>(null);
  const [mutedCards, setMutedCards] = useState<boolean[]>(features.map(() => true));
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([]);

  const handleCardVideoToggle = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingCard === index) {
      video.pause();
      setPlayingCard(null);
      playVideoStopSound();
    } else {
      // Pause any other playing video
      if (playingCard !== null && videoRefs.current[playingCard]) {
        videoRefs.current[playingCard]!.pause();
      }
      video.play().catch(() => {});
      setPlayingCard(index);
      playVideoStartSound();
    }
  };

  const toggleMute = (index: number, e: React.MouseEvent) => {
    e.stopPropagation();
    const newMuted = [...mutedCards];
    newMuted[index] = !newMuted[index];
    setMutedCards(newMuted);
    playClickSound();
  };

  return (
    <>
      <section id="features" className="py-24 relative overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: 'linear-gradient(hsl(190 100% 50%) 1px, transparent 1px), linear-gradient(90deg, hsl(190 100% 50%) 1px, transparent 1px)',
          backgroundSize: '60px 60px'
        }} />

        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >
            <motion.div
              initial={{ scaleX: 0 }}
              whileInView={{ scaleX: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="w-20 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-6"
            />
            <p className="font-display text-xs tracking-[0.3em] text-primary mb-4">CORE MODULES</p>
            <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">
              Core Features
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Click the play button to watch demos inline, or click the card to explore detailed explanations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const isPlaying = playingCard === index;

              return (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 60, rotateX: 15 }}
                  whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.7, ease: [0.25, 0.46, 0.45, 0.94] }}
                  whileHover={{ y: -8, transition: { duration: 0.3 } }}
                  onHoverStart={() => playSwooshSound()}
                  className="group relative rounded-2xl overflow-hidden bg-card border border-border hover:border-primary/60 transition-all duration-500 cursor-pointer"
                  style={{ perspective: '1000px' }}
                >
                  {/* Gradient border glow on hover */}
                  <div className="absolute -inset-[1px] rounded-2xl bg-gradient-to-r from-primary/0 via-primary/0 to-accent/0 group-hover:from-primary/40 group-hover:via-accent/30 group-hover:to-primary/40 transition-all duration-700 -z-10 blur-sm" />

                  {/* Video area */}
                  <div className="relative aspect-video overflow-hidden">
                    <video
                      ref={(el) => { videoRefs.current[index] = el; }}
                      src={feature.video}
                      muted={mutedCards[index]}
                      loop
                      playsInline
                      preload="metadata"
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />

                    {/* Overlay gradient */}
                    <div className={`absolute inset-0 bg-gradient-to-t ${feature.accent} transition-opacity duration-500 ${isPlaying ? 'opacity-0' : 'opacity-100'}`} />
                    <div className={`absolute inset-0 bg-background/30 transition-opacity duration-300 ${isPlaying ? 'opacity-0' : 'group-hover:opacity-10 opacity-30'}`} />

                    {/* Scan line effect */}
                    <div className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity duration-500 pointer-events-none overflow-hidden">
                      <div className="absolute w-full h-[2px] bg-gradient-to-r from-transparent via-primary to-transparent animate-scan-line" />
                    </div>

                    {/* HUD corners */}
                    <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500" />
                    <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500" />
                    <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500" />
                    <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-primary/0 group-hover:border-primary/60 transition-all duration-500" />

                    {/* Play/Pause button */}
                    <button
                      onClick={(e) => handleCardVideoToggle(index, e)}
                      className="absolute inset-0 flex items-center justify-center z-10"
                    >
                      <motion.div
                        whileHover={{ scale: 1.15 }}
                        whileTap={{ scale: 0.9 }}
                        className={`w-14 h-14 rounded-full flex items-center justify-center backdrop-blur-md transition-all duration-300 ${
                          isPlaying
                            ? 'bg-background/50 opacity-0 hover:opacity-100'
                            : 'bg-primary/80 shadow-lg shadow-primary/30'
                        }`}
                      >
                        {isPlaying ? (
                          <Pause className="w-6 h-6 text-foreground" />
                        ) : (
                          <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                        )}
                      </motion.div>
                    </button>

                    {/* Mute toggle */}
                    <AnimatePresence>
                      {isPlaying && (
                        <motion.button
                          initial={{ opacity: 0, scale: 0.5 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.5 }}
                          onClick={(e) => toggleMute(index, e)}
                          className="absolute bottom-3 left-3 z-20 w-8 h-8 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors"
                        >
                          {mutedCards[index] ? <VolumeX className="w-3.5 h-3.5" /> : <Volume2 className="w-3.5 h-3.5" />}
                        </motion.button>
                      )}
                    </AnimatePresence>

                    {/* Playing indicator */}
                    <AnimatePresence>
                      {isPlaying && (
                        <motion.div
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: 20 }}
                          className="absolute bottom-3 right-3 z-10 flex items-center gap-1.5"
                        >
                          <div className="flex gap-0.5">
                            {[0, 1, 2].map(i => (
                              <motion.div
                                key={i}
                                animate={{ height: [4, 12, 4] }}
                                transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }}
                                className="w-1 bg-primary rounded-full"
                              />
                            ))}
                          </div>
                          <span className="text-[10px] font-display text-primary tracking-wider">LIVE</span>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Badges */}
                    <div className="absolute bottom-3 left-3 flex flex-wrap gap-1.5" style={{ display: isPlaying ? 'none' : 'flex' }}>
                      {feature.badges.map((badge) => (
                        <span key={badge.label} className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${badge.color} shadow-lg`}>
                          {badge.label}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Content */}
                  <div
                    className="p-5"
                    onClick={() => { playClickSound(); setSelectedFeature(feature.title); }}
                  >
                    <h3 className="font-heading text-lg font-bold text-foreground group-hover:text-primary transition-colors duration-300 mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>

                    {/* Animated underline */}
                    <motion.div
                      className="h-px bg-gradient-to-r from-primary via-accent to-transparent mt-4"
                      initial={{ scaleX: 0, originX: 0 }}
                      whileInView={{ scaleX: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.5 + index * 0.1, duration: 0.8 }}
                    />

                    {/* Click to view more */}
                    <motion.div
                      whileHover={{ x: 4 }}
                      className="mt-3 flex items-center gap-2 text-xs font-display tracking-wider text-primary hover:text-accent transition-colors cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      CLICK TO VIEW MORE
                      <motion.span
                        animate={{ x: [0, 4, 0] }}
                        transition={{ duration: 1.5, repeat: Infinity }}
                      >→</motion.span>
                    </motion.div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      <FeatureDetailModal featureTitle={selectedFeature} onClose={() => setSelectedFeature(null)} />
    </>
  );
};

export default FeaturesGrid;

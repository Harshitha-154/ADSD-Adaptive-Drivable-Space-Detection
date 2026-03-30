import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Film, Sparkles } from "lucide-react";
import { playClickSound } from "@/lib/sound";
import bgTechHud from "@/assets/bg-tech-hud.jpg";

const demos = [
  {
    title: "Complete System Demo",
    desc: "Watch the full ADSD pipeline in action — from sensor input through AI processing to real-time driving decisions on a live highway.",
    duration: "3:45",
    tag: "Full Demo",
    tagColor: "bg-primary text-primary-foreground",
    gradient: "from-primary/20 via-transparent to-accent/10",
    video: "/videos/feature-driving-guidance.mp4",
  },
  {
    title: "Road Segmentation Output",
    desc: "See how DeepLabV3+ segments drivable vs non-drivable areas with pixel-level precision in diverse road conditions.",
    duration: "2:30",
    tag: "Segmentation",
    tagColor: "bg-accent text-accent-foreground",
    gradient: "from-accent/20 via-transparent to-primary/10",
    video: "/videos/feature-drivable-space.mp4",
  },
  {
    title: "Night & Weather Testing",
    desc: "Testing the condition-adaptive detection system under rain, fog, nighttime, and glare scenarios with real dashcam footage.",
    duration: "4:15",
    tag: "Stress Test",
    tagColor: "bg-warning text-warning-foreground",
    gradient: "from-warning/20 via-transparent to-destructive/10",
    video: "/videos/feature-confidence-zones.mp4",
  },
];

const DemoVideos = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [mutedStates, setMutedStates] = useState([true, true, true]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);

  const handlePlay = (index: number) => {
    playClickSound();
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      video.pause();
      setPlayingIndex(null);
    } else {
      if (playingIndex !== null && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex]!.pause();
      }
      video.play();
      setPlayingIndex(index);
    }
  };

  const toggleMute = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newMuted = [...mutedStates];
    newMuted[index] = !newMuted[index];
    setMutedStates(newMuted);
  };

  return (
    <section id="demos" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgTechHud} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.3em] text-primary text-center mb-4"
        >
          DEMONSTRATIONS
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          See It In Action
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Real-world demonstration videos showing every module working in live driving conditions
        </motion.p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {demos.map((demo, i) => {
            const isPlaying = playingIndex === i;
            return (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="group relative bg-card border border-border rounded-xl overflow-hidden hover:border-primary/40 transition-all"
              >
                {/* Video area */}
                <div className="relative aspect-video cursor-pointer" onClick={() => handlePlay(i)}>
                  <video
                    ref={(el) => { videoRefs.current[i] = el; }}
                    src={demo.video}
                    muted={mutedStates[i]}
                    loop
                    playsInline
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                    onEnded={() => setPlayingIndex(null)}
                  />

                  {!isPlaying && (
                    <div className="absolute inset-0 bg-background/40" />
                  )}

                  {/* Play/Pause */}
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center transition-all ${isPlaying ? 'bg-background/60 backdrop-blur-sm' : 'bg-primary/80'}`}>
                      {!isPlaying ? (
                        <Play className="w-6 h-6 text-primary-foreground ml-0.5" />
                      ) : (
                        <Pause className="w-6 h-6 text-foreground" />
                      )}
                    </div>
                  </div>

                  {/* Tag */}
                  <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${demo.tagColor}`}>
                    {demo.tag}
                  </span>

                  {/* Duration */}
                  <span className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-background/70 backdrop-blur-sm text-foreground">
                    {demo.duration}
                  </span>

                  {/* Mute toggle */}
                  {isPlaying && (
                    <button
                      onClick={(e) => toggleMute(e, i)}
                      className="absolute bottom-3 left-3 z-10 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/90 transition-colors"
                    >
                      {mutedStates[i] ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  )}

                  {isPlaying && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5 text-xs text-primary font-display">
                      <Sparkles className="w-3 h-3 animate-pulse-glow" />
                      PLAYING
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2">{demo.title}</h3>
                  <p className="text-sm text-muted-foreground">{demo.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default DemoVideos;

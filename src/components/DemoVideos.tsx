import { motion } from "framer-motion";
import { useState, useRef } from "react";
import { Play, Pause, Volume2, VolumeX, Sparkles } from "lucide-react";
import { playVideoStartSound, playVideoStopSound, playClickSound } from "@/lib/sound";
import bgTechHud from "@/assets/bg-tech-hud.jpg";
import ParticleField from "./ParticleField";

const demos = [
  {
    title: "Complete System Demo",
    desc: "Watch the full ADSD pipeline in action — from sensor input through AI processing to real-time driving decisions on a live highway.",
    duration: "3:45",
    tag: "Full Demo",
    tagColor: "bg-primary text-primary-foreground",
    video: "/videos/feature-driving-guidance.mp4",
    borderGlow: "hover:shadow-[0_0_30px_hsl(190_100%_50%/0.15)]",
  },
  {
    title: "Road Segmentation Output",
    desc: "See how DeepLabV3+ segments drivable vs non-drivable areas with pixel-level precision in diverse road conditions.",
    duration: "2:30",
    tag: "Segmentation",
    tagColor: "bg-accent text-accent-foreground",
    video: "/videos/feature-drivable-space.mp4",
    borderGlow: "hover:shadow-[0_0_30px_hsl(160_100%_45%/0.15)]",
  },
  {
    title: "Night & Weather Testing",
    desc: "Testing the condition-adaptive detection system under rain, fog, nighttime, and glare scenarios with real dashcam footage.",
    duration: "4:15",
    tag: "Stress Test",
    tagColor: "bg-warning text-warning-foreground",
    video: "/videos/night-weather-testing.mp4",
    borderGlow: "hover:shadow-[0_0_30px_hsl(45_100%_55%/0.15)]",
  },
];

const DemoVideos = () => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);
  const [mutedStates, setMutedStates] = useState([true, true, true]);
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([null, null, null]);

  const handlePlay = (index: number) => {
    const video = videoRefs.current[index];
    if (!video) return;

    if (playingIndex === index) {
      video.pause();
      setPlayingIndex(null);
      playVideoStopSound();
    } else {
      if (playingIndex !== null && videoRefs.current[playingIndex]) {
        videoRefs.current[playingIndex]!.pause();
      }
      video.play();
      setPlayingIndex(index);
      playVideoStartSound();
    }
  };

  const toggleMute = (e: React.MouseEvent, index: number) => {
    e.stopPropagation();
    const newMuted = [...mutedStates];
    newMuted[index] = !newMuted[index];
    setMutedStates(newMuted);
    playClickSound();
  };

  return (
    <section id="demos" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgTechHud} alt="" className="w-full h-full object-cover opacity-10" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>
      <ParticleField className="opacity-30" />

      <div className="relative z-10 container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-20 h-0.5 bg-gradient-to-r from-primary to-accent mx-auto mb-6"
          />
          <p className="font-display text-xs tracking-[0.3em] text-primary mb-4">DEMONSTRATIONS</p>
          <h2 className="font-heading text-3xl md:text-5xl font-bold text-foreground mb-4">See It In Action</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Real-world demonstration videos showing every module working in live driving conditions
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demos.map((demo, i) => {
            const isPlaying = playingIndex === i;
            return (
              <motion.div
                key={demo.title}
                initial={{ opacity: 0, y: 60, rotateX: 10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.7 }}
                whileHover={{ y: -6 }}
                className={`group relative bg-card border border-border rounded-2xl overflow-hidden hover:border-primary/40 transition-all duration-500 ${demo.borderGlow}`}
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
                    <div className="absolute inset-0 bg-background/30" />
                  )}

                  {/* Play/Pause */}
                  <div className={`absolute inset-0 flex items-center justify-center ${isPlaying ? 'opacity-0 hover:opacity-100' : ''} transition-opacity`}>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                      className={`w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-md ${isPlaying ? 'bg-background/50' : 'bg-primary/80 shadow-xl shadow-primary/30'}`}
                    >
                      {!isPlaying ? (
                        <Play className="w-7 h-7 text-primary-foreground ml-0.5" />
                      ) : (
                        <Pause className="w-7 h-7 text-foreground" />
                      )}
                    </motion.div>
                  </div>

                  <span className={`absolute top-3 left-3 text-xs font-bold px-3 py-1 rounded-full ${demo.tagColor}`}>
                    {demo.tag}
                  </span>

                  <span className="absolute top-3 right-3 text-xs font-medium px-2 py-1 rounded-full bg-background/70 backdrop-blur-sm text-foreground">
                    {demo.duration}
                  </span>

                  {isPlaying && (
                    <button
                      onClick={(e) => toggleMute(e, i)}
                      className="absolute bottom-3 left-3 z-10 w-8 h-8 rounded-full bg-background/70 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/90 transition-colors"
                    >
                      {mutedStates[i] ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                    </button>
                  )}

                  {isPlaying && (
                    <div className="absolute bottom-3 right-3 flex items-center gap-1.5">
                      <div className="flex gap-0.5">
                        {[0, 1, 2].map(j => (
                          <motion.div
                            key={j}
                            animate={{ height: [3, 10, 3] }}
                            transition={{ duration: 0.5, repeat: Infinity, delay: j * 0.12 }}
                            className="w-0.5 bg-primary rounded-full"
                          />
                        ))}
                      </div>
                      <span className="text-[10px] font-display text-primary tracking-wider">PLAYING</span>
                    </div>
                  )}
                </div>

                <div className="p-5">
                  <h3 className="font-heading text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">{demo.title}</h3>
                  <p className="text-sm text-muted-foreground">{demo.desc}</p>
                  <div className="h-px bg-gradient-to-r from-primary/30 via-accent/20 to-transparent mt-4" />
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

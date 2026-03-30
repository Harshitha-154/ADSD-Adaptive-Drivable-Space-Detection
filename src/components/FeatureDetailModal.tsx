import { motion, AnimatePresence } from "framer-motion";
import { X, Cpu, Layers, Zap, Code2, Database, BarChart3, Play, Pause, Volume2, VolumeX } from "lucide-react";
import { playCloseSound, playOpenSound, playVideoStartSound, playVideoStopSound, playClickSound } from "@/lib/sound";
import { useEffect, useRef, useState } from "react";

interface FeatureDetail {
  title: string;
  description: string;
  howItWorks: string[];
  technologies: { name: string; icon: React.ElementType; desc: string }[];
  metrics: { label: string; value: string }[];
  outputExample: string;
  video: string;
}

const featureDetails: Record<string, FeatureDetail> = {
  "Drivable Space Detection": {
    title: "Drivable Space Detection",
    description: "Our real-time drivable space detection module uses advanced semantic segmentation powered by DeepLabV3+ and custom U-Net architectures to identify every pixel of the road surface.",
    video: "/videos/feature-drivable-space.mp4",
    howItWorks: [
      "Camera captures 30 FPS video feed from front-mounted dashcam",
      "Each frame is preprocessed: resized to 512×512, normalized, and augmented",
      "DeepLabV3+ encoder extracts multi-scale features using atrous convolution",
      "Decoder produces pixel-level segmentation mask with 3 classes",
      "Post-processing applies CRF refinement for sharp boundary detection",
      "Final overlay is rendered on the original frame in real-time at 25+ FPS",
    ],
    technologies: [
      { name: "DeepLabV3+", icon: Cpu, desc: "Atrous spatial pyramid pooling for multi-scale road features" },
      { name: "PyTorch", icon: Code2, desc: "Deep learning framework for model training & inference" },
      { name: "OpenCV", icon: Layers, desc: "Real-time video processing and frame manipulation" },
      { name: "TensorRT", icon: Zap, desc: "NVIDIA optimization for 10x faster inference on GPU" },
    ],
    metrics: [
      { label: "Accuracy", value: "96.8%" },
      { label: "FPS", value: "30+" },
      { label: "Latency", value: "<33ms" },
      { label: "mIoU", value: "0.94" },
    ],
    outputExample: "🟢 Green overlay = Safe drivable area | 🟡 Yellow = Road edge/caution | 🔴 Red = Non-drivable zone",
  },
  "Self-Learning Road Memory": {
    title: "Self-Learning Road Memory",
    description: "The Self-Learning Road Memory module creates a persistent spatial memory database of previously encountered road conditions, hazards, and unsafe zones.",
    video: "/videos/feature-road-memory.mp4",
    howItWorks: [
      "GPS coordinates are captured alongside every road analysis frame",
      "Unsafe zones, potholes, and hazardous areas are tagged with geo-coordinates",
      "A spatial hash map stores road memory entries with confidence scores",
      "When approaching a stored location, memory entries are retrieved within 50m radius",
      "Past hazard data is fused with current perception for enhanced predictions",
      "Memory database is periodically retrained using reinforcement learning",
    ],
    technologies: [
      { name: "Spatial DB", icon: Database, desc: "PostGIS-powered geospatial storage for road memory" },
      { name: "LSTM Network", icon: Cpu, desc: "Long Short-Term Memory for temporal pattern learning" },
      { name: "Reinforcement Learning", icon: BarChart3, desc: "Self-improvement through driving experience feedback" },
      { name: "GPS Fusion", icon: Layers, desc: "High-precision coordinate mapping with RTK correction" },
    ],
    metrics: [
      { label: "Memory Entries", value: "50K+" },
      { label: "Recall Accuracy", value: "98.2%" },
      { label: "Learning Rate", value: "15%/week" },
      { label: "Coverage", value: "500km²" },
    ],
    outputExample: "⚠ Previously unsafe zone detected 200m ahead — reducing confidence score by 30%",
  },
  "Confidence-Based Zones": {
    title: "Confidence-Based Driving Zones",
    description: "Instead of binary safe/unsafe classification, our system provides a gradient of certainty across the entire driving surface with pixel-level confidence scores.",
    video: "/videos/feature-confidence-zones.mp4",
    howItWorks: [
      "Segmentation model outputs softmax probability for each pixel class",
      "Probability values are mapped to confidence levels: High (>85%), Medium (50-85%), Low (<50%)",
      "Color gradient is applied: Green → Yellow → Red based on confidence",
      "Temporal smoothing prevents flickering using exponential moving average",
      "Confidence zones are fed into the decision engine for speed adjustment",
      "Low-confidence regions trigger automatic speed reduction commands",
    ],
    technologies: [
      { name: "Softmax Probability", icon: BarChart3, desc: "Neural network confidence extraction per pixel" },
      { name: "Heatmap Engine", icon: Layers, desc: "Real-time color gradient mapping with GPU shaders" },
      { name: "Kalman Filter", icon: Cpu, desc: "Temporal smoothing for stable confidence display" },
      { name: "CUDA Kernels", icon: Zap, desc: "Custom GPU code for parallel confidence computation" },
    ],
    metrics: [
      { label: "Granularity", value: "Pixel-level" },
      { label: "Update Rate", value: "30 Hz" },
      { label: "Calibration", value: "99.1%" },
      { label: "False Alarm", value: "<2%" },
    ],
    outputExample: "🟢 85-100% confidence = Full speed | 🟡 50-85% = Reduced speed | 🔴 <50% = Slow/Stop",
  },
  "Traffic Signal Detection": {
    title: "Traffic Signal Detection & Recognition",
    description: "Our Traffic Signal Detection module uses a dedicated YOLOv8 object detection model trained on 100K+ annotated traffic light images across different countries and conditions.",
    video: "/videos/feature-traffic-signal.mp4",
    howItWorks: [
      "YOLOv8-nano model scans each frame for traffic light bounding boxes",
      "Detected regions are cropped and passed to a color classification CNN",
      "Signal state is determined: Red, Green, Yellow, Arrow, or Flashing",
      "Temporal voting over 5 frames prevents misclassification from flickering",
      "Distance estimation using known traffic light dimensions (standard 300mm)",
      "Signal state is published to the decision engine with priority override",
    ],
    technologies: [
      { name: "YOLOv8", icon: Cpu, desc: "Ultralytics state-of-the-art object detection model" },
      { name: "CNN Classifier", icon: Layers, desc: "Custom color classification network (99.4% accuracy)" },
      { name: "ONNX Runtime", icon: Zap, desc: "Cross-platform optimized inference engine" },
      { name: "Temporal Voting", icon: BarChart3, desc: "Multi-frame consensus for robust detection" },
    ],
    metrics: [
      { label: "Detection", value: "99.4%" },
      { label: "Range", value: "150m" },
      { label: "Latency", value: "<40ms" },
      { label: "Night Acc.", value: "97.8%" },
    ],
    outputExample: "🔴 Red Signal Detected — Distance: 45m — Action: STOP | Countdown: 12s remaining",
  },
  "Brake Alert System": {
    title: "Brake Alert & Vehicle Behavior Detection",
    description: "The Brake Alert System monitors vehicles ahead using computer vision to detect brake light activation, sudden deceleration, and erratic driving behavior.",
    video: "/videos/feature-brake-alert.mp4",
    howItWorks: [
      "Vehicle detection using YOLOv8 identifies cars, trucks, motorcycles ahead",
      "ROI extraction focuses on rear-end of detected vehicles",
      "Red color intensity analysis detects brake light activation",
      "Optical flow calculates relative speed and closing distance",
      "Time-to-collision (TTC) is computed from relative velocity and distance",
      "Alert level is escalated: Info → Warning → Critical based on TTC threshold",
    ],
    technologies: [
      { name: "Optical Flow", icon: Layers, desc: "Dense motion estimation for relative speed calculation" },
      { name: "YOLOv8", icon: Cpu, desc: "Multi-class vehicle detection and tracking" },
      { name: "HSV Analysis", icon: BarChart3, desc: "Color-space brake light detection algorithm" },
      { name: "TTC Engine", icon: Zap, desc: "Real-time time-to-collision computation" },
    ],
    metrics: [
      { label: "Detection", value: "98.7%" },
      { label: "False Positive", value: "<1.5%" },
      { label: "Warning Time", value: "2.5s+" },
      { label: "Range", value: "100m" },
    ],
    outputExample: "⚠ BRAKE DETECTED — Vehicle ahead braking | Distance: 28m | TTC: 3.2s | Action: SLOW DOWN",
  },
  "Context-Aware Driving Guidance": {
    title: "Context-Aware Driving Guidance System",
    description: "The Context-Aware Driving Guidance System combines ALL sensor inputs into a single, clear, actionable driving instruction.",
    video: "/videos/feature-driving-guidance.mp4",
    howItWorks: [
      "All module outputs are collected into a unified state vector",
      "A weighted decision matrix assigns priority: Traffic Signal > Obstacle > Confidence",
      "Fuzzy logic engine handles edge cases and conflicting signals",
      "Environmental context (weather, lighting) modifies confidence thresholds",
      "Final decision is computed with 99.9% uptime SLA",
      "Decision is rendered as HUD overlay + audio alert within 50ms total pipeline",
    ],
    technologies: [
      { name: "Decision Matrix", icon: BarChart3, desc: "Weighted multi-input fusion with priority scheduling" },
      { name: "Fuzzy Logic", icon: Cpu, desc: "Handles uncertainty and conflicting sensor data" },
      { name: "State Machine", icon: Layers, desc: "Deterministic state transitions for safe decisions" },
      { name: "ROS2 Pipeline", icon: Code2, desc: "Robot Operating System for real-time data orchestration" },
    ],
    metrics: [
      { label: "Pipeline", value: "<50ms" },
      { label: "Uptime", value: "99.9%" },
      { label: "Accuracy", value: "99.2%" },
      { label: "Inputs", value: "8 modules" },
    ],
    outputExample: "✅ SAFE TO PROCEED — Green signal ✓ | Clear road ✓ | High confidence ✓ | No obstacles ✓",
  },
};

interface Props {
  featureTitle: string | null;
  onClose: () => void;
}

const FeatureDetailModal = ({ featureTitle, onClose }: Props) => {
  const detail = featureTitle ? featureDetails[featureTitle] : null;
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);

  useEffect(() => {
    if (detail) playOpenSound();
  }, [detail]);

  const toggleVideo = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isVideoPlaying) {
      v.pause();
      setIsVideoPlaying(false);
      playVideoStopSound();
    } else {
      v.play();
      setIsVideoPlaying(true);
      playVideoStartSound();
    }
  };

  return (
    <AnimatePresence>
      {detail && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 bg-background/85 backdrop-blur-xl flex items-start justify-center p-4 pt-20 pb-4 overflow-y-auto"
          onClick={() => { playCloseSound(); onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 40 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="bg-card border border-border rounded-2xl max-w-4xl w-full overflow-hidden relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Gradient top bar */}
            <div className="h-1 bg-gradient-to-r from-primary via-accent to-primary" />

            <button
              onClick={() => { playCloseSound(); onClose(); }}
              className="absolute top-5 right-5 z-20 w-10 h-10 rounded-full bg-secondary/80 backdrop-blur-sm flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-secondary transition-all hover:rotate-90 duration-300"
            >
              <X className="w-5 h-5" />
            </button>

            {/* Embedded Video Player */}
            <div className="relative aspect-video bg-background/50 cursor-pointer" onClick={toggleVideo}>
              <video
                ref={videoRef}
                src={detail.video}
                muted={isMuted}
                loop
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              />
              {!isVideoPlaying && (
                <div className="absolute inset-0 bg-background/40 flex items-center justify-center">
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="w-20 h-20 rounded-full bg-primary/80 flex items-center justify-center shadow-2xl shadow-primary/40"
                  >
                    <Play className="w-8 h-8 text-primary-foreground ml-1" />
                  </motion.div>
                  <p className="absolute bottom-4 text-sm text-foreground/70 font-display tracking-wider">CLICK TO PLAY DEMO</p>
                </div>
              )}
              {isVideoPlaying && (
                <div className="absolute inset-0 flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
                  <div className="w-16 h-16 rounded-full bg-background/50 backdrop-blur-sm flex items-center justify-center">
                    <Pause className="w-7 h-7 text-foreground" />
                  </div>
                </div>
              )}

              {/* Mute button */}
              {isVideoPlaying && (
                <button
                  onClick={(e) => { e.stopPropagation(); setIsMuted(!isMuted); playClickSound(); }}
                  className="absolute bottom-4 left-4 z-10 w-9 h-9 rounded-full bg-background/60 backdrop-blur-sm flex items-center justify-center text-foreground hover:bg-background/80 transition-colors"
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                </button>
              )}

              {/* Playing indicator */}
              {isVideoPlaying && (
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <motion.div
                    className="w-2.5 h-2.5 rounded-full bg-destructive"
                    animate={{ opacity: [1, 0.3, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  <span className="text-xs font-display text-foreground/80 tracking-wider">REC</span>
                </div>
              )}
            </div>

            <div className="p-8">
              <h2 className="font-heading text-2xl md:text-3xl font-bold text-foreground mb-3">{detail.title}</h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">{detail.description}</p>

              {/* Output example */}
              <div className="mb-8 p-4 rounded-xl bg-gradient-to-r from-primary/5 to-accent/5 border border-primary/20">
                <p className="text-xs font-display text-primary tracking-wider mb-2">OUTPUT DISPLAY</p>
                <p className="text-sm text-muted-foreground">{detail.outputExample}</p>
              </div>

              {/* How it works */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">⚙️ How It Works</h3>
                <div className="space-y-3">
                  {detail.howItWorks.map((step, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}
                      className="flex gap-3 items-start group/step"
                    >
                      <span className="w-7 h-7 rounded-lg bg-primary/15 text-primary text-xs font-bold flex items-center justify-center flex-shrink-0 mt-0.5 group-hover/step:bg-primary/25 transition-colors">
                        {i + 1}
                      </span>
                      <p className="text-sm text-muted-foreground group-hover/step:text-foreground transition-colors">{step}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Technologies */}
              <div className="mb-8">
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">🛠 Technologies Used</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {detail.technologies.map((tech, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0.95 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.2 + i * 0.08 }}
                      whileHover={{ scale: 1.02 }}
                      className="bg-secondary/30 border border-border rounded-lg p-4 hover:border-primary/30 transition-all cursor-default"
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <tech.icon className="w-4 h-4 text-primary" />
                        <span className="text-sm font-bold text-foreground">{tech.name}</span>
                      </div>
                      <p className="text-xs text-muted-foreground">{tech.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Metrics */}
              <div>
                <h3 className="font-heading text-lg font-bold text-foreground mb-4">📊 Performance</h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {detail.metrics.map((m, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + i * 0.08 }}
                      className="bg-gradient-to-br from-primary/5 to-accent/5 border border-primary/15 rounded-lg p-3 text-center"
                    >
                      <p className="font-display text-lg font-bold text-primary">{m.value}</p>
                      <p className="text-xs text-muted-foreground">{m.label}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default FeatureDetailModal;

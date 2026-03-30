import { motion } from "framer-motion";
import { Cpu, Code2, Database, Cloud, Monitor, Layers, Zap, GitBranch } from "lucide-react";
import bgAiProcessing from "@/assets/bg-ai-processing.jpg";

const technologies = [
  { icon: Cpu, name: "PyTorch", category: "Deep Learning", desc: "Primary framework for training and deploying neural networks including DeepLabV3+, YOLOv8, and custom architectures" },
  { icon: Code2, name: "Python 3.11", category: "Core Language", desc: "Main development language for AI/ML pipeline, data processing, and system integration" },
  { icon: Layers, name: "OpenCV", category: "Computer Vision", desc: "Real-time video processing, frame manipulation, color space conversion, and image augmentation" },
  { icon: Zap, name: "TensorRT / ONNX", category: "Inference Optimization", desc: "NVIDIA TensorRT and ONNX Runtime for 10x faster model inference on edge GPUs" },
  { icon: Database, name: "PostGIS", category: "Spatial Database", desc: "Geospatial database for Self-Learning Road Memory — stores and queries road hazards by location" },
  { icon: Monitor, name: "ROS2 Humble", category: "Robotics Middleware", desc: "Robot Operating System for real-time inter-module communication and sensor data orchestration" },
  { icon: Cloud, name: "NVIDIA Jetson", category: "Edge Computing", desc: "Jetson Orin NX for on-vehicle inference — 100 TOPS AI performance in 25W power envelope" },
  { icon: GitBranch, name: "MLflow", category: "ML Operations", desc: "Experiment tracking, model versioning, and deployment pipeline management" },
];

const TechStack = () => {
  return (
    <section id="tech" className="py-24 relative overflow-hidden">
      <div className="absolute inset-0">
        <img src={bgAiProcessing} alt="" className="w-full h-full object-cover opacity-15" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/90 to-background" />
      </div>

      <div className="relative z-10 container mx-auto px-4">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-xs tracking-[0.3em] text-primary text-center mb-4"
        >
          TECHNOLOGY STACK
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-heading text-3xl md:text-5xl font-bold text-center text-foreground mb-4"
        >
          Built with Cutting-Edge AI
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-muted-foreground text-center max-w-2xl mx-auto mb-16"
        >
          Enterprise-grade deep learning pipeline optimized for real-time autonomous driving inference
        </motion.p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {technologies.map((tech, i) => (
            <motion.div
              key={tech.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
              className="bg-card/80 backdrop-blur-sm border border-border rounded-xl p-6 hover:border-primary/30 transition-all group"
            >
              <tech.icon className="w-8 h-8 text-primary mb-3 group-hover:scale-110 transition-transform" />
              <p className="text-xs text-primary/70 font-display mb-1">{tech.category}</p>
              <h3 className="font-heading text-lg font-bold text-foreground mb-2">{tech.name}</h3>
              <p className="text-sm text-muted-foreground">{tech.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TechStack;

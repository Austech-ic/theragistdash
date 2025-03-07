import { motion } from "framer-motion"


const FloatingPaths = ({ position = 1 }) => {  
    const safePosition = isNaN(position) ? 1 : position; // Ensure valid number
  
    const paths = Array.from({ length: 36 }, (_, i) => ({
      id: i,
      d: `M-${380 - i * 5 * safePosition} -${189 + i * 6}C-${
        380 - i * 5 * safePosition
      } -${189 + i * 6} -${312 - i * 5 * safePosition} ${216 - i * 6} ${
        152 - i * 5 * safePosition
      } ${343 - i * 6}C${616 - i * 5 * safePosition} ${470 - i * 6} ${
        684 - i * 5 * safePosition
      } ${875 - i * 6} ${684 - i * 5 * safePosition} ${875 - i * 6}`,
      color: `rgba(38, 174, 95,${0.1 + i * 0.03})`,
      width: 0.5 + i * 0.03,
    }));
  
    return (
      <div className="absolute inset-0 pointer-events-none">
        <svg className="w-full h-full text-[#26ae5f] " viewBox="0 0 696 316" fill="none">
          <title>Background Paths</title>
          {paths.map((path) => (
            <motion.path
              key={path.id}
              d={path.d}
              stroke="currentColor"
              strokeWidth={path.width}
              strokeOpacity={0.1 + path.id * 0.03}
              initial={{ pathLength: 0.3, opacity: 0.6 }}
              animate={{
                pathLength: 1,
                opacity: [0.3, 0.6, 0.3],
                pathOffset: [0, 1, 0],
              }}
              transition={{
                duration: 20 + Math.random() * 10,
                repeat: Number.POSITIVE_INFINITY,
                ease: "linear",
              }}
            />
          ))}
        </svg>
      </div>
    )
  }

  export default FloatingPaths
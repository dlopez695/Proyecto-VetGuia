import { motion } from 'motion/react';

export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50 z-0">
      {/* Perrito 1 - esquina superior derecha - Verde menta */}
      <motion.div
        className="absolute top-10 right-10"
        animate={{
          y: [0, -10, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
          {/* Perro minimalista */}
          <circle cx="40" cy="35" r="18" fill="#AEE5C9" />
          {/* Orejas */}
          <ellipse cx="28" cy="25" rx="8" ry="14" fill="#9FD9BA" />
          <ellipse cx="52" cy="25" rx="8" ry="14" fill="#9FD9BA" />
          {/* Ojos */}
          <circle cx="34" cy="33" r="2.5" fill="#5A7C6F" />
          <circle cx="46" cy="33" r="2.5" fill="#5A7C6F" />
          {/* Nariz */}
          <circle cx="40" cy="40" r="3" fill="#5A7C6F" />
          {/* Cuerpo */}
          <ellipse cx="40" cy="58" rx="16" ry="12" fill="#AEE5C9" />
          {/* Patas */}
          <rect x="30" y="65" width="5" height="10" rx="2.5" fill="#9FD9BA" />
          <rect x="45" y="65" width="5" height="10" rx="2.5" fill="#9FD9BA" />
        </svg>
      </motion.div>

      {/* Gatito 1 - esquina inferior izquierda - Rosa suave */}
      <motion.div
        className="absolute bottom-20 left-8"
        animate={{
          y: [0, 8, 0],
          x: [0, 5, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg width="70" height="70" viewBox="0 0 70 70" fill="none">
          {/* Gato minimalista */}
          <circle cx="35" cy="32" r="16" fill="#FADADD" />
          {/* Orejas triangulares */}
          <path d="M 24 20 L 20 10 L 28 18 Z" fill="#F8B5C0" />
          <path d="M 46 20 L 50 10 L 42 18 Z" fill="#F8B5C0" />
          {/* Ojos */}
          <ellipse cx="30" cy="30" rx="2" ry="3" fill="#8B5A7D" />
          <ellipse cx="40" cy="30" rx="2" ry="3" fill="#8B5A7D" />
          {/* Nariz */}
          <path d="M 35 35 L 33 37 L 37 37 Z" fill="#E88FA0" />
          {/* Cuerpo */}
          <ellipse cx="35" cy="52" rx="14" ry="11" fill="#FADADD" />
          {/* Cola curvada */}
          <path d="M 48 50 Q 58 45 60 38" stroke="#F8B5C0" strokeWidth="4" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* Huellitas flotantes - Beige/Crema */}
      <motion.div
        className="absolute top-1/3 right-1/4"
        animate={{
          opacity: [0.5, 0.8, 0.5],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 3,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
          <circle cx="20" cy="25" r="6" fill="#FFF6E8" />
          <circle cx="14" cy="16" r="3" fill="#FFE4C4" />
          <circle cx="20" cy="14" r="3" fill="#FFE4C4" />
          <circle cx="26" cy="16" r="3" fill="#FFE4C4" />
        </svg>
      </motion.div>

      {/* Perrito 2 - medio izquierda - Azul suave */}
      <motion.div
        className="absolute top-1/2 left-4"
        animate={{
          y: [0, -8, 0],
          rotate: [0, -3, 0],
        }}
        transition={{
          duration: 4.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      >
        <svg width="60" height="60" viewBox="0 0 60 60" fill="none">
          {/* Perro pequeño */}
          <circle cx="30" cy="26" r="13" fill="#B8D4E8" />
          <ellipse cx="22" cy="20" rx="6" ry="10" fill="#A5C9E3" />
          <ellipse cx="38" cy="20" rx="6" ry="10" fill="#A5C9E3" />
          <circle cx="26" cy="25" r="1.5" fill="#4A6B85" />
          <circle cx="34" cy="25" r="1.5" fill="#4A6B85" />
          <circle cx="30" cy="30" r="2" fill="#4A6B85" />
          <ellipse cx="30" cy="43" rx="12" ry="9" fill="#B8D4E8" />
        </svg>
      </motion.div>

      {/* Gatito 2 - parte superior izquierda - Lavanda */}
      <motion.div
        className="absolute top-1/4 left-1/3"
        animate={{
          y: [0, 10, 0],
          x: [0, -5, 0],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.5,
        }}
      >
        <svg width="55" height="55" viewBox="0 0 55 55" fill="none">
          <circle cx="27" cy="25" r="12" fill="#E6D5F5" />
          <path d="M 18 17 L 15 8 L 21 14 Z" fill="#D4BFEA" />
          <path d="M 36 17 L 39 8 L 33 14 Z" fill="#D4BFEA" />
          <circle cx="23" cy="23" r="1.5" fill="#7B5B9E" />
          <circle cx="31" cy="23" r="1.5" fill="#7B5B9E" />
          <path d="M 27 27 L 25 29 L 29 29 Z" fill="#B39ACC" />
          <ellipse cx="27" cy="40" rx="10" ry="8" fill="#E6D5F5" />
          <path d="M 36 38 Q 44 35 46 30" stroke="#D4BFEA" strokeWidth="3" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* Huellitas 2 - Naranja suave */}
      <motion.div
        className="absolute bottom-1/3 right-1/3"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.5,
        }}
      >
        <svg width="35" height="35" viewBox="0 0 35 35" fill="none">
          <circle cx="17" cy="22" r="5" fill="#FFDAB3" />
          <circle cx="12" cy="14" r="2.5" fill="#FFC896" />
          <circle cx="17" cy="12" r="2.5" fill="#FFC896" />
          <circle cx="22" cy="14" r="2.5" fill="#FFC896" />
        </svg>
      </motion.div>

      {/* Corazoncito flotante - Verde menta más oscuro */}
      <motion.div
        className="absolute top-2/3 right-1/4"
        animate={{
          y: [0, -15, 0],
          scale: [1, 1.2, 1],
          opacity: [0.5, 0.8, 0.5],
        }}
        transition={{
          duration: 3.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      >
        <svg width="30" height="30" viewBox="0 0 30 30" fill="none">
          <path
            d="M15 26C15 26 4 19 4 11C4 7.5 6.5 5 10 5C12.5 5 14.5 6.5 15 8C15.5 6.5 17.5 5 20 5C23.5 5 26 7.5 26 11C26 19 15 26 15 26Z"
            fill="#9FD9BA"
          />
        </svg>
      </motion.div>

      {/* Hueso minimalista - Beige */}
      <motion.div
        className="absolute bottom-1/4 left-1/4"
        animate={{
          rotate: [0, 10, -10, 0],
          opacity: [0.4, 0.7, 0.4],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.8,
        }}
      >
        <svg width="50" height="25" viewBox="0 0 50 25" fill="none">
          <circle cx="8" cy="12.5" r="6" fill="#FFE4C4" />
          <circle cx="42" cy="12.5" r="6" fill="#FFE4C4" />
          <rect x="10" y="9" width="30" height="7" rx="3.5" fill="#FFF6E8" />
        </svg>
      </motion.div>

      {/* Perrito extra - parte inferior derecha - Verde agua */}
      <motion.div
        className="absolute bottom-32 right-16"
        animate={{
          y: [0, 12, 0],
          rotate: [0, -5, 0],
        }}
        transition={{
          duration: 5.5,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.3,
        }}
      >
        <svg width="65" height="65" viewBox="0 0 65 65" fill="none">
          <circle cx="32" cy="28" r="14" fill="#C4E8E0" />
          <ellipse cx="23" cy="21" rx="7" ry="11" fill="#B0DDD3" />
          <ellipse cx="41" cy="21" rx="7" ry="11" fill="#B0DDD3" />
          <circle cx="27" cy="27" r="2" fill="#5A8077" />
          <circle cx="37" cy="27" r="2" fill="#5A8077" />
          <circle cx="32" cy="32" r="2.5" fill="#5A8077" />
          <ellipse cx="32" cy="46" rx="13" ry="10" fill="#C4E8E0" />
        </svg>
      </motion.div>

      {/* Gatito extra - medio derecha - Amarillo suave */}
      <motion.div
        className="absolute top-1/3 right-12"
        animate={{
          y: [0, -12, 0],
          x: [0, 3, 0],
        }}
        transition={{
          duration: 4.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2.2,
        }}
      >
        <svg width="58" height="58" viewBox="0 0 58 58" fill="none">
          <circle cx="29" cy="27" r="13" fill="#FFF4CC" />
          <path d="M 20 19 L 17 10 L 23 16 Z" fill="#FFEBB3" />
          <path d="M 38 19 L 41 10 L 35 16 Z" fill="#FFEBB3" />
          <circle cx="25" cy="25" r="1.8" fill="#A68B3D" />
          <circle cx="33" cy="25" r="1.8" fill="#A68B3D" />
          <path d="M 29 29 L 27 31 L 31 31 Z" fill="#D4BE6E" />
          <ellipse cx="29" cy="42" rx="11" ry="9" fill="#FFF4CC" />
          <path d="M 39 40 Q 46 37 48 32" stroke="#FFEBB3" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      </motion.div>

      {/* Huellitas 3 - Verde menta claro */}
      <motion.div
        className="absolute top-1/2 right-1/5"
        animate={{
          opacity: [0.4, 0.7, 0.4],
          scale: [1, 1.12, 1],
        }}
        transition={{
          duration: 3.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1.8,
        }}
      >
        <svg width="38" height="38" viewBox="0 0 38 38" fill="none">
          <circle cx="19" cy="24" r="5.5" fill="#D4F1E8" />
          <circle cx="13" cy="15" r="2.8" fill="#C3EBE0" />
          <circle cx="19" cy="13" r="2.8" fill="#C3EBE0" />
          <circle cx="25" cy="15" r="2.8" fill="#C3EBE0" />
        </svg>
      </motion.div>

      {/* Estrellita decorativa - Rosa coral */}
      <motion.div
        className="absolute top-1/5 left-1/5"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.15, 1],
          opacity: [0.4, 0.6, 0.4],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 0.5,
        }}
      >
        <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
          <path
            d="M14 2L15.5 10.5L22 8L17 14L24 17L15.5 17.5L17 26L14 20L11 26L12.5 17.5L4 17L11 14L6 8L12.5 10.5L14 2Z"
            fill="#FFB8C6"
          />
        </svg>
      </motion.div>
    </div>
  );
}
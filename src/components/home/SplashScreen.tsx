import { motion } from 'framer-motion';

import logoImage from '@/assets/logo.png';

export default function SplashScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.35 }}
      className="fixed inset-0 z-[100] flex min-h-dvh items-center justify-center bg-knu-lavender/10"
      aria-label="스플래시 화면"
    >
      <motion.img
        src={logoImage}
        alt="가두모집 서비스 로고"
        initial={{ scale: 0.88, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className="h-auto w-[min(56vw,220px)] drop-shadow-md"
      />
    </motion.div>
  );
}

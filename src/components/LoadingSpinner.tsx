import { Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';

export const LoadingSpinner = () => (
  <motion.div 
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm"
  >
    <Loader2 className="w-12 h-12 text-white animate-spin" />
  </motion.div>
);
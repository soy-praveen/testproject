import { motion } from 'framer-motion';
import { Coins } from 'lucide-react';

interface TokenAllocationProps {
  username: string;
  daysActive: number;
  allocatedVics: number;
  isPremium: boolean;
}

export const TokenAllocation = ({ username, daysActive, allocatedVics, isPremium }: TokenAllocationProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl shadow-xl max-w-md w-full"
    >
      <div className="text-center mb-6">
        <div className="w-20 h-20 bg-purple-100 rounded-full mx-auto flex items-center justify-center mb-4">
          <Coins className="w-10 h-10 text-purple-600" />
        </div>
        <h2 className="text-2xl font-bold">Token Allocation</h2>
        <p className="text-gray-600">for @{username}</p>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Days Active</p>
          <p className="font-medium">{daysActive} days</p>
        </div>

        <motion.div 
          className="bg-purple-50 p-4 rounded-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <p className="text-sm text-purple-600">Total VIC Allocation</p>
          <p className="text-3xl font-bold text-purple-700">{allocatedVics.toLocaleString()} VIC</p>
          <p className="text-sm text-purple-600 mt-1">
            Calculation: {daysActive} days × 1,000 VIC
          </p>
        </motion.div>

        {isPremium && (
          <div className="bg-yellow-50 p-4 rounded-lg">
            <p className="text-sm text-yellow-600">Premium Status Active</p>
            <p className="font-medium text-yellow-700">Premium benefits applied</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
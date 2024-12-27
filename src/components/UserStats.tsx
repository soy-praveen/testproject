import { motion } from 'framer-motion';
import { formatDistance } from 'date-fns';
import { Crown, ChevronRight } from 'lucide-react';

interface UserStatsProps {
  username: string;
  createdAt: Date;
  isPremium: boolean;
  onNext: () => void;
}

export const UserStats = ({ username, createdAt, isPremium, onNext }: UserStatsProps) => {
  const daysActive = Math.ceil((new Date().getTime() - createdAt.getTime()) / (1000 * 3600 * 24));
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="p-6 bg-white rounded-xl shadow-xl max-w-md w-full"
    >
      <div className="flex items-center space-x-3 mb-6">
        <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
          <span className="text-2xl">{username[0].toUpperCase()}</span>
        </div>
        <div>
          <h2 className="text-xl font-bold">@{username}</h2>
          {isPremium && (
            <div className="flex items-center text-yellow-500">
              <Crown className="w-4 h-4 mr-1" />
              <span className="text-sm">Premium User</span>
            </div>
          )}
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Account Created</p>
          <p className="font-medium">{formatDistance(createdAt, new Date(), { addSuffix: true })}</p>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg">
          <p className="text-sm text-gray-600">Days Active</p>
          <p className="font-medium">{daysActive} days</p>
        </div>
      </div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        onClick={onNext}
        className="mt-6 w-full bg-purple-600 text-white py-3 px-4 rounded-lg font-medium flex items-center justify-center"
      >
        Calculate VIC Allocation
        <ChevronRight className="w-5 h-5 ml-2" />
      </motion.button>
    </motion.div>
  );
};
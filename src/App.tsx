import { useEffect, useState } from 'react';
import { supabase } from './lib/supabase';
import { LoadingSpinner } from './components/LoadingSpinner';
import { UserStats } from './components/UserStats';
import { TokenAllocation } from './components/TokenAllocation';

interface UserData {
  username: string;
  created_at: string;
  allocated_vics: number;
  is_premium: boolean;
}

function App() {
  const [loading, setLoading] = useState(true);
  const [showAllocation, setShowAllocation] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    const telegram = window.Telegram.WebApp;
    telegram.ready();
    telegram.expand();

    const initApp = async () => {
      const user = telegram.initDataUnsafe.user;
      if (!user?.username) {
        console.error('No user data available');
        return;
      }

      // Check if user exists in database
      const { data: existingUser } = await supabase
        .from('users')
        .select('*')
        .eq('username', user.username)
        .single();

      if (existingUser) {
        setUserData(existingUser);
        setShowAllocation(true);
      } else {
        // Create new user entry
        const newUser = {
          username: user.username,
          created_at: new Date().toISOString(),
          is_premium: user.is_premium || false,
          allocated_vics: Math.ceil((new Date().getTime() - new Date(user.created_at).getTime()) / (1000 * 3600 * 24)) * 1000
        };

        const { data: savedUser } = await supabase
          .from('users')
          .insert([newUser])
          .select()
          .single();

        if (savedUser) {
          setUserData(savedUser);
        }
      }
      setLoading(false);
    };

    initApp();
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  if (!userData) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-red-600">Error loading user data</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50 flex items-center justify-center p-4">
      {showAllocation ? (
        <TokenAllocation
          username={userData.username}
          daysActive={Math.ceil((new Date().getTime() - new Date(userData.created_at).getTime()) / (1000 * 3600 * 24))}
          allocatedVics={userData.allocated_vics}
          isPremium={userData.is_premium}
        />
      ) : (
        <UserStats
          username={userData.username}
          createdAt={new Date(userData.created_at)}
          isPremium={userData.is_premium}
          onNext={() => setShowAllocation(true)}
        />
      )}
    </div>
  );
}

export default App;
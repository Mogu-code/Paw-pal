import React, { useState } from 'react';
import { Gift, Trophy, Star, Heart, Award, Zap, Crown, Target } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const RewardsPage: React.FC = () => {
  const [userPoints, setUserPoints] = useState(450);
  const [userLevel, setUserLevel] = useState('Hero Donor');
  const [nextLevelPoints, setNextLevelPoints] = useState(500);

  const badges = [
    {
      id: 1,
      name: 'First Donation',
      description: 'Completed your first blood donation',
      icon: Heart,
      earned: true,
      color: 'bg-red-500'
    },
    {
      id: 2,
      name: 'Lifesaver',
      description: 'Saved 5 pet lives through donations',
      icon: Trophy,
      earned: true,
      color: 'bg-yellow-500'
    },
    {
      id: 3,
      name: 'Hero Donor',
      description: 'Made 10 successful blood donations',
      icon: Award,
      earned: true,
      color: 'bg-purple-500'
    },
    {
      id: 4,
      name: 'Community Champion',
      description: 'Referred 5 new donors to the program',
      icon: Star,
      earned: false,
      color: 'bg-blue-500'
    },
    {
      id: 5,
      name: 'Super Hero',
      description: 'Made 25 blood donations',
      icon: Zap,
      earned: false,
      color: 'bg-orange-500'
    },
    {
      id: 6,
      name: 'Legend',
      description: 'Made 50 blood donations',
      icon: Crown,
      earned: false,
      color: 'bg-indigo-500'
    }
  ];

  const rewards = [
    {
      id: 1,
      title: 'Free Vet Checkup',
      description: 'Comprehensive health examination at partner clinics',
      points: 200,
      category: 'Healthcare',
      image: 'https://images.pexels.com/photos/6816859/pexels-photo-6816859.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      available: true
    },
    {
      id: 2,
      title: 'Premium Pet Food (5lb bag)',
      description: 'High-quality nutrition for your heroic pet',
      points: 300,
      category: 'Food & Treats',
      image: 'https://images.pexels.com/photos/4552838/pexels-photo-4552838.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      available: true
    },
    {
      id: 3,
      title: 'Professional Pet Grooming',
      description: 'Full grooming service at partner locations',
      points: 400,
      category: 'Grooming',
      image: 'https://images.pexels.com/photos/7788009/pexels-photo-7788009.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      available: true
    },
    {
      id: 4,
      title: 'Emergency Care Credit ($100)',
      description: 'Credit towards emergency veterinary services',
      points: 500,
      category: 'Emergency Care',
      image: 'https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      available: false
    },
    {
      id: 5,
      title: 'Pet Insurance (1 Month)',
      description: 'One month of premium pet insurance coverage',
      points: 600,
      category: 'Insurance',
      image: 'https://images.pexels.com/photos/7788010/pexels-photo-7788010.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      available: false
    },
    {
      id: 6,
      title: 'Specialty Consultation',
      description: 'Consultation with veterinary specialist',
      points: 800,
      category: 'Healthcare',
      image: 'https://images.pexels.com/photos/6235267/pexels-photo-6235267.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      available: false
    }
  ];

  const pointsHistory = [
    { date: '2025-01-15', activity: 'Blood Donation - Luna', points: 100, type: 'earned' },
    { date: '2025-01-10', activity: 'Emergency Blood Donation - Max', points: 150, type: 'earned' },
    { date: '2025-01-08', activity: 'Redeemed: Free Vet Checkup', points: -200, type: 'redeemed' },
    { date: '2025-01-05', activity: 'Blood Donation - Buddy', points: 100, type: 'earned' },
    { date: '2024-12-28', activity: 'Referral Bonus - Sarah J.', points: 50, type: 'bonus' },
  ];

  const handleRedeemReward = (rewardId: number, points: number) => {
    if (userPoints >= points) {
      setUserPoints(prev => prev - points);
      alert(`Reward redeemed successfully! You'll receive instructions via email.`);
    } else {
      alert(`You need ${points - userPoints} more points to redeem this reward.`);
    }
  };

  const progressPercentage = (userPoints / nextLevelPoints) * 100;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Rewards & Benefits</h1>
          <p className="text-lg text-gray-600">Earn points for donations and redeem amazing rewards for your pet</p>
        </div>

        {/* Points Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-gradient-to-br from-purple-600 to-purple-700 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-purple-100">Available Points</h3>
                <p className="text-3xl font-bold">{userPoints.toLocaleString()}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Gift className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>

          <Card className="bg-gradient-to-br from-orange-500 to-orange-600 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-lg font-medium text-orange-100">Current Level</h3>
                <p className="text-2xl font-bold">{userLevel}</p>
              </div>
              <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center">
                <Trophy className="w-8 h-8 text-white" />
              </div>
            </div>
          </Card>

          <Card>
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="text-lg font-medium text-gray-700">Progress to Next Level</h3>
                <p className="text-sm text-gray-500">{userPoints}/{nextLevelPoints} points</p>
              </div>
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                <Target className="w-6 h-6 text-green-600" />
              </div>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div
                className="bg-gradient-to-r from-green-500 to-green-600 h-3 rounded-full transition-all duration-500"
                style={{ width: `${Math.min(progressPercentage, 100)}%` }}
              ></div>
            </div>
            <p className="text-xs text-gray-500 mt-2">{nextLevelPoints - userPoints} points to "Super Hero"</p>
          </Card>
        </div>

        {/* Badges Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Achievement Badges</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {badges.map((badge) => {
              const Icon = badge.icon;
              return (
                <div
                  key={badge.id}
                  className={`text-center p-4 rounded-xl transition-all duration-200 ${
                    badge.earned 
                      ? 'bg-white shadow-lg hover:shadow-xl border-2 border-green-200' 
                      : 'bg-gray-100 opacity-50'
                  }`}
                >
                  <div
                    className={`w-16 h-16 ${badge.earned ? badge.color : 'bg-gray-400'} rounded-full flex items-center justify-center mx-auto mb-3`}
                  >
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className={`font-bold text-sm ${badge.earned ? 'text-gray-800' : 'text-gray-500'}`}>
                    {badge.name}
                  </h3>
                  <p className={`text-xs mt-1 ${badge.earned ? 'text-gray-600' : 'text-gray-400'}`}>
                    {badge.description}
                  </p>
                  {badge.earned && (
                    <div className="mt-2">
                      <span className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-green-100 text-green-800">
                        ✓ Earned
                      </span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </Card>

        {/* Rewards Catalog */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Redeem Rewards</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rewards.map((reward) => (
              <Card key={reward.id} className={`relative ${!reward.available ? 'opacity-75' : ''}`}>
                {!reward.available && (
                  <div className="absolute top-4 right-4 bg-gray-500 text-white px-3 py-1 rounded-full text-xs">
                    Coming Soon
                  </div>
                )}
                
                <img
                  src={reward.image}
                  alt={reward.title}
                  className="w-full h-40 object-cover rounded-xl mb-4"
                />
                
                <div className="mb-4">
                  <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                    {reward.category}
                  </span>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-2">{reward.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{reward.description}</p>
                
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <Gift className="w-5 h-5 text-orange-500" />
                    <span className="text-lg font-bold text-orange-500">{reward.points} points</span>
                  </div>
                  {userPoints >= reward.points && (
                    <span className="text-xs text-green-600 bg-green-100 px-2 py-1 rounded-full">
                      Available
                    </span>
                  )}
                </div>
                
                <Button
                  variant={userPoints >= reward.points ? "primary" : "outline"}
                  onClick={() => handleRedeemReward(reward.id, reward.points)}
                  disabled={!reward.available}
                  className="w-full"
                >
                  {userPoints >= reward.points ? 'Redeem Now' : `Need ${reward.points - userPoints} more points`}
                </Button>
              </Card>
            ))}
          </div>
        </div>

        {/* Points History */}
        <Card>
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Points History</h2>
          <div className="space-y-4">
            {pointsHistory.map((entry, index) => (
              <div key={index} className="flex items-center justify-between py-3 border-b border-gray-200 last:border-0">
                <div className="flex items-center space-x-3">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                    entry.type === 'earned' ? 'bg-green-100 text-green-600' :
                    entry.type === 'redeemed' ? 'bg-red-100 text-red-600' :
                    'bg-blue-100 text-blue-600'
                  }`}>
                    {entry.type === 'earned' ? <Heart className="w-5 h-5" /> :
                     entry.type === 'redeemed' ? <Gift className="w-5 h-5" /> :
                     <Star className="w-5 h-5" />}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">{entry.activity}</p>
                    <p className="text-sm text-gray-500">{entry.date}</p>
                  </div>
                </div>
                <div className={`font-bold ${
                  entry.points > 0 ? 'text-green-600' : 'text-red-600'
                }`}>
                  {entry.points > 0 ? '+' : ''}{entry.points} points
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* How to Earn Points */}
        <Card className="mt-8 bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">How to Earn Points</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Heart className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Blood Donation</h3>
              <p className="text-2xl font-bold text-red-500 mb-1">100 pts</p>
              <p className="text-sm text-gray-600">Per successful donation</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Emergency Donation</h3>
              <p className="text-2xl font-bold text-orange-500 mb-1">150 pts</p>
              <p className="text-sm text-gray-600">For urgent cases</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Star className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Referrals</h3>
              <p className="text-2xl font-bold text-blue-500 mb-1">50 pts</p>
              <p className="text-sm text-gray-600">Per new donor referred</p>
            </div>
            
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-3">
                <Trophy className="w-8 h-8 text-white" />
              </div>
              <h3 className="font-bold text-gray-800 mb-2">Milestones</h3>
              <p className="text-2xl font-bold text-green-500 mb-1">25-200 pts</p>
              <p className="text-sm text-gray-600">Achievement bonuses</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default RewardsPage;
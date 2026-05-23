import React from 'react';
import { Heart, Search, UserPlus, MapPin, BookOpen, Gift, Info, Phone } from 'lucide-react';

type PageType = 'home' | 'find-blood' | 'become-donor' | 'vet-clinics' | 'pet-care' | 'rewards' | 'about' | 'contact';

interface NavigationProps {
  currentPage: PageType;
  onNavigate: (page: PageType) => void;
}

const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const navItems = [
    { id: 'home', label: 'Home', icon: Heart },
    { id: 'find-blood', label: 'Find Blood', icon: Search },
    { id: 'become-donor', label: 'Become Donor', icon: UserPlus },
    { id: 'vet-clinics', label: 'Vet Clinics', icon: MapPin },
    { id: 'pet-care', label: 'Pet Care', icon: BookOpen },
    { id: 'rewards', label: 'Rewards', icon: Gift },
    { id: 'about', label: 'About', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone },
  ];

  return (
    <nav className="bg-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-r from-purple-700 to-orange-500 rounded-full flex items-center justify-center">
              <Heart className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-800">PawDonor</span>
          </div>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id as PageType)}
                  className={`flex items-center space-x-1 px-3 py-2 rounded-xl text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-purple-700 text-white shadow-lg'
                      : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => onNavigate('find-blood')}
            className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-xl font-medium transition-all duration-200 shadow-lg hover:shadow-xl"
          >
            Find Blood Now
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
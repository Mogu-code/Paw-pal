import React from 'react';
import { Phone } from 'lucide-react';

const EmergencyButton: React.FC = () => {
  const handleEmergencyCall = () => {
    alert('Emergency Hotline: 1-800-PET-HELP\n\nFor immediate veterinary assistance, call now!');
  };

  return (
    <button
      onClick={handleEmergencyCall}
      className="fixed bottom-6 right-6 bg-red-500 hover:bg-red-600 text-white p-4 rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 z-50 pulse-animation"
      aria-label="Emergency Hotline"
    >
      <Phone className="w-6 h-6" />
    </button>
  );
};

export default EmergencyButton;
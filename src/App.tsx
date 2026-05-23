import React, { useState } from 'react';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import FindBloodPage from './pages/FindBloodPage';
import BecomeDonorPage from './pages/BecomeDonorPage';
import VetClinicsPage from './pages/VetClinicsPage';
import PetCareResourcesPage from './pages/PetCareResourcesPage';
import RewardsPage from './pages/RewardsPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import EmergencyButton from './components/EmergencyButton';

type PageType = 'home' | 'find-blood' | 'become-donor' | 'vet-clinics' | 'pet-care' | 'rewards' | 'about' | 'contact';

function App() {
  const [currentPage, setCurrentPage] = useState<PageType>('home');

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={setCurrentPage} />;
      case 'find-blood':
        return <FindBloodPage />;
      case 'become-donor':
        return <BecomeDonorPage />;
      case 'vet-clinics':
        return <VetClinicsPage />;
      case 'pet-care':
        return <PetCareResourcesPage />;
      case 'rewards':
        return <RewardsPage />;
      case 'about':
        return <AboutPage />;
      case 'contact':
        return <ContactPage />;
      default:
        return <HomePage onNavigate={setCurrentPage} />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      {renderPage()}
      <EmergencyButton />
    </div>
  );
}

export default App;
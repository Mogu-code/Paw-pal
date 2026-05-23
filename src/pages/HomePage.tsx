import React from 'react';
import { Heart, Shield, Users, Award, ArrowRight, Star } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

interface HomePageProps {
  onNavigate: (page: string) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const benefits = [
    {
      icon: Heart,
      title: 'Save Lives',
      description: 'Your pet can be a hero and save other pets in need of blood transfusions.',
    },
    {
      icon: Shield,
      title: 'Trusted Network',
      description: 'All donors are verified by licensed veterinarians for safety and quality.',
    },
    {
      icon: Users,
      title: 'Community Impact',
      description: 'Join thousands of pet parents making a difference in their local community.',
    },
    {
      icon: Award,
      title: 'Rewards Program',
      description: 'Earn points for donations and get discounts on vet services and pet supplies.',
    },
  ];

  const partners = [
    'VetCorp', 'Animal Hospital Network', 'PetCare Plus', 'Emergency Vets', 'Pet Health Centers'
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-purple-700 via-purple-600 to-orange-500 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl md:text-6xl font-bold leading-tight mb-6">
                Every Paw Deserves a Chance 🐾
              </h1>
              <p className="text-xl mb-8 text-purple-100">
                Connect pet blood donors with those in need. Save lives, build community, and be a hero for pets in emergencies.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={() => onNavigate('find-blood')}
                  className="bg-orange-500 hover:bg-orange-400"
                >
                  Find Blood Now
                </Button>
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={() => onNavigate('become-donor')}
                  className="bg-transparent border-white text-white hover:bg-white hover:text-purple-700"
                >
                  Become a Donor
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="w-full h-96 bg-white/10 rounded-3xl backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <Heart className="w-24 h-24 text-orange-300 mx-auto mb-4" />
                  <p className="text-lg text-purple-100">Hero Pet Image</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Why Choose PawDonor?</h2>
            <p className="text-xl text-gray-600">Making pet blood donation safe, easy, and rewarding</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <Card key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-700 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                  <p className="text-gray-600">{benefit.description}</p>
                </Card>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">Get Started Today</h2>
            <p className="text-xl text-gray-600">Choose your path to making a difference</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
              <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Heart className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Need Blood?</h3>
              <p className="text-gray-600 mb-6">Find verified donors near you in minutes</p>
              <Button variant="primary" onClick={() => onNavigate('find-blood')}>
                Search Donors <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>

            <Card className="text-center bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
              <div className="w-20 h-20 bg-purple-700 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Become a Donor</h3>
              <p className="text-gray-600 mb-6">Register your pet and start saving lives</p>
              <Button variant="secondary" onClick={() => onNavigate('become-donor')}>
                Register Pet <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>

            <Card className="text-center bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
              <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <Shield className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Find Vet Care</h3>
              <p className="text-gray-600 mb-6">Locate trusted veterinary clinics nearby</p>
              <Button variant="outline" onClick={() => onNavigate('vet-clinics')}>
                Find Clinics <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Partners Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Trusted by Leading Veterinarians</h2>
            <p className="text-lg text-gray-600">Working with the best to ensure quality care</p>
          </div>
          <div className="flex flex-wrap justify-center items-center gap-8 opacity-60">
            {partners.map((partner, index) => (
              <div key={index} className="bg-white px-8 py-4 rounded-xl shadow-md">
                <span className="text-lg font-semibold text-gray-700">{partner}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-purple-700 to-orange-500 text-white">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 text-purple-100">
            Join our community of pet heroes and help save lives today
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              variant="primary" 
              size="lg" 
              onClick={() => onNavigate('become-donor')}
              className="bg-white text-purple-700 hover:bg-gray-100"
            >
              Start Donating
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              onClick={() => onNavigate('find-blood')}
              className="bg-transparent border-white text-white hover:bg-white hover:text-purple-700"
            >
              Find Blood
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-purple-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center">
                  <Heart className="w-5 h-5 text-white" />
                </div>
                <span className="text-xl font-bold">PawDonor</span>
              </div>
              <p className="text-purple-200">
                Connecting pet blood donors with those in need, saving lives one donation at a time.
              </p>
            </div>
            <div>
              <h4 className="font-bold mb-3">Quick Links</h4>
              <ul className="space-y-2 text-purple-200">
                <li><button onClick={() => onNavigate('about')} className="hover:text-white">About Us</button></li>
                <li><button onClick={() => onNavigate('contact')} className="hover:text-white">Contact</button></li>
                <li><a href="#" className="hover:text-white">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white">Terms of Service</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Services</h4>
              <ul className="space-y-2 text-purple-200">
                <li><button onClick={() => onNavigate('find-blood')} className="hover:text-white">Find Blood</button></li>
                <li><button onClick={() => onNavigate('become-donor')} className="hover:text-white">Become Donor</button></li>
                <li><button onClick={() => onNavigate('vet-clinics')} className="hover:text-white">Vet Clinics</button></li>
                <li><button onClick={() => onNavigate('rewards')} className="hover:text-white">Rewards</button></li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-3">Emergency</h4>
              <p className="text-purple-200 mb-3">24/7 Pet Emergency Hotline</p>
              <p className="text-2xl font-bold text-orange-400">1-800-PET-HELP</p>
            </div>
          </div>
          <div className="border-t border-purple-800 mt-8 pt-8 text-center text-purple-200">
            <p>&copy; 2025 PawDonor. All rights reserved. Made with ❤️ for pets everywhere.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
import React, { useState } from 'react';
import { MapPin, Phone, Clock, Star, Calendar, Filter, Search } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const VetClinicsPage: React.FC = () => {
  const [searchLocation, setSearchLocation] = useState('');
  const [selectedService, setSelectedService] = useState('all');
  const [sortBy, setSortBy] = useState('distance');

  const clinics = [
    {
      id: 1,
      name: 'Downtown Animal Hospital',
      address: '123 Main Street, Downtown, CA 90210',
      phone: '(555) 123-4567',
      rating: 4.8,
      reviews: 342,
      distance: 1.2,
      services: ['Emergency Care', 'Blood Transfusion', 'Surgery', 'Diagnostics'],
      hours: 'Open 24/7',
      image: 'https://images.pexels.com/photos/6235267/pexels-photo-6235267.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      specialties: ['Emergency Medicine', 'Critical Care'],
      acceptsWalkIns: true,
      hasBloodBank: true
    },
    {
      id: 2,
      name: 'Paws & Hearts Veterinary Clinic',
      address: '456 Oak Avenue, Midtown, CA 90211',
      phone: '(555) 234-5678',
      rating: 4.9,
      reviews: 128,
      distance: 2.8,
      services: ['Blood Transfusion', 'Cardiology', 'Internal Medicine'],
      hours: 'Mon-Fri: 8AM-6PM, Sat: 9AM-4PM',
      image: 'https://images.pexels.com/photos/6235678/pexels-photo-6235678.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      specialties: ['Cardiology', 'Blood Disorders'],
      acceptsWalkIns: false,
      hasBloodBank: true
    },
    {
      id: 3,
      name: 'City Pet Emergency Center',
      address: '789 Pine Street, Westside, CA 90212',
      phone: '(555) 345-6789',
      rating: 4.7,
      reviews: 256,
      distance: 3.5,
      services: ['Emergency Care', 'Blood Transfusion', 'ICU', 'Trauma Care'],
      hours: 'Open 24/7',
      image: 'https://images.pexels.com/photos/4269019/pexels-photo-4269019.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      specialties: ['Emergency Medicine', 'Trauma Surgery'],
      acceptsWalkIns: true,
      hasBloodBank: true
    },
    {
      id: 4,
      name: 'Sunny Valley Animal Clinic',
      address: '321 Elm Street, Uptown, CA 90213',
      phone: '(555) 456-7890',
      rating: 4.6,
      reviews: 89,
      distance: 5.1,
      services: ['General Care', 'Blood Transfusion', 'Wellness'],
      hours: 'Mon-Sat: 7AM-7PM',
      image: 'https://images.pexels.com/photos/5731849/pexels-photo-5731849.jpeg?auto=compress&cs=tinysrgb&w=400&h=200&fit=crop',
      specialties: ['General Practice', 'Preventive Care'],
      acceptsWalkIns: true,
      hasBloodBank: false
    }
  ];

  const services = [
    'Emergency Care',
    'Blood Transfusion',
    'Surgery',
    'Diagnostics',
    'Cardiology',
    'Internal Medicine',
    'ICU',
    'Trauma Care',
    'General Care',
    'Wellness'
  ];

  const handleBookAppointment = (clinicId: number) => {
    alert(`Booking appointment at clinic ${clinicId}. You'll be redirected to their scheduling system.`);
  };

  const handleCallClinic = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const filteredClinics = clinics.filter(clinic => {
    if (selectedService !== 'all' && !clinic.services.includes(selectedService)) return false;
    if (searchLocation && !clinic.address.toLowerCase().includes(searchLocation.toLowerCase()) && 
        !clinic.name.toLowerCase().includes(searchLocation.toLowerCase())) return false;
    return true;
  });

  const sortedClinics = [...filteredClinics].sort((a, b) => {
    switch (sortBy) {
      case 'distance':
        return a.distance - b.distance;
      case 'rating':
        return b.rating - a.rating;
      case 'reviews':
        return b.reviews - a.reviews;
      default:
        return 0;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Veterinary Clinics</h1>
          <p className="text-lg text-gray-600">Find trusted veterinary clinics that support pet blood donation</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-4 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search Location
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="City, ZIP code, or clinic name"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Service Needed</label>
              <select
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Services</option>
                {services.map(service => (
                  <option key={service} value={service}>{service}</option>
                ))}
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="distance">Distance</option>
                <option value="rating">Highest Rated</option>
                <option value="reviews">Most Reviews</option>
              </select>
            </div>
            
            <div className="flex items-end">
              <Button variant="outline" className="w-full">
                <Filter className="w-4 h-4" />
                More Filters
              </Button>
            </div>
          </div>
        </Card>

        {/* Map Section */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Clinic Locations</h2>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Map View</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-green-100 to-blue-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive map showing clinic locations</p>
              <p className="text-sm text-gray-400">Google Maps integration would be here</p>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Veterinary Clinics ({sortedClinics.length})
          </h2>
          <p className="text-gray-600">Clinics supporting pet blood donation programs</p>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {sortedClinics.map((clinic) => (
            <Card key={clinic.id} className="relative">
              {clinic.hasBloodBank && (
                <div className="absolute top-4 right-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-medium">
                  Blood Bank
                </div>
              )}
              
              <div className="flex space-x-4">
                <img
                  src={clinic.image}
                  alt={clinic.name}
                  className="w-32 h-24 rounded-xl object-cover flex-shrink-0"
                />
                
                <div className="flex-1 min-w-0">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">{clinic.name}</h3>
                  <div className="flex items-center mb-2">
                    <div className="flex items-center">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < Math.floor(clinic.rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 ml-2">
                      {clinic.rating} ({clinic.reviews} reviews)
                    </span>
                  </div>
                  <div className="flex items-start text-gray-600 mb-2">
                    <MapPin className="w-4 h-4 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-sm">{clinic.address}</span>
                  </div>
                  <div className="flex items-center text-gray-600 mb-2">
                    <Clock className="w-4 h-4 mr-2" />
                    <span className="text-sm">{clinic.hours}</span>
                  </div>
                  <div className="text-sm text-gray-600 mb-2">
                    <strong>Distance:</strong> {clinic.distance} miles
                  </div>
                </div>
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <div className="mb-3">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Services:</h4>
                  <div className="flex flex-wrap gap-2">
                    {clinic.services.map(service => (
                      <span
                        key={service}
                        className="px-2 py-1 bg-purple-100 text-purple-700 text-xs rounded-full"
                      >
                        {service}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="text-sm font-medium text-gray-700 mb-2">Specialties:</h4>
                  <div className="flex flex-wrap gap-2">
                    {clinic.specialties.map(specialty => (
                      <span
                        key={specialty}
                        className="px-2 py-1 bg-orange-100 text-orange-700 text-xs rounded-full"
                      >
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-4 text-sm">
                    <div className={`flex items-center ${clinic.acceptsWalkIns ? 'text-green-600' : 'text-gray-500'}`}>
                      <div className={`w-2 h-2 rounded-full mr-2 ${clinic.acceptsWalkIns ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                      Walk-ins {clinic.acceptsWalkIns ? 'Accepted' : 'By Appointment'}
                    </div>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button
                    variant="primary"
                    onClick={() => handleBookAppointment(clinic.id)}
                    className="flex-1"
                    icon={Calendar}
                  >
                    Book Appointment
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => handleCallClinic(clinic.phone)}
                    icon={Phone}
                  >
                    Call
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {sortedClinics.length === 0 && (
          <Card className="text-center py-12">
            <MapPin className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No clinics found</h3>
            <p className="text-gray-600 mb-6">
              Try expanding your search criteria or check back later for new clinics.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </Card>
        )}

        {/* Emergency Notice */}
        <Card className="mt-8 bg-red-50 border border-red-200">
          <div className="flex items-start space-x-3">
            <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <Phone className="w-4 h-4 text-white" />
            </div>
            <div>
              <h3 className="text-lg font-bold text-red-800 mb-2">Pet Emergency?</h3>
              <p className="text-red-700 mb-4">
                If your pet is experiencing a medical emergency requiring immediate blood transfusion, 
                please call our 24/7 emergency hotline or go directly to the nearest emergency clinic.
              </p>
              <Button variant="primary" className="bg-red-500 hover:bg-red-600">
                <Phone className="w-4 h-4" />
                Emergency Hotline: 1-800-PET-HELP
              </Button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default VetClinicsPage;
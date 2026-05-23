import React, { useState } from 'react';
import { Search, MapPin, Filter, Heart, Phone, Star, Clock } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const FindBloodPage: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSpecies, setSelectedSpecies] = useState('all');
  const [selectedDistance, setSelectedDistance] = useState('25');
  const [urgencyLevel, setUrgencyLevel] = useState('normal');

  const donors = [
    {
      id: 1,
      petName: 'Buddy',
      species: 'Dog',
      breed: 'Golden Retriever',
      bloodType: 'DEA 1.1 Negative',
      age: 3,
      weight: 65,
      distance: 2.5,
      owner: 'Sarah Johnson',
      rating: 4.9,
      donations: 8,
      lastDonation: '2 months ago',
      verified: true,
      profileImage: 'https://images.pexels.com/photos/1805164/pexels-photo-1805164.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 2,
      petName: 'Luna',
      species: 'Cat',
      breed: 'British Shorthair',
      bloodType: 'Type A',
      age: 2,
      weight: 12,
      distance: 3.8,
      owner: 'Mike Chen',
      rating: 5.0,
      donations: 5,
      lastDonation: '3 weeks ago',
      verified: true,
      profileImage: 'https://images.pexels.com/photos/320014/pexels-photo-320014.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    },
    {
      id: 3,
      petName: 'Max',
      species: 'Dog',
      breed: 'German Shepherd',
      bloodType: 'DEA 1.1 Positive',
      age: 4,
      weight: 78,
      distance: 5.2,
      owner: 'Emma Davis',
      rating: 4.8,
      donations: 12,
      lastDonation: '1 month ago',
      verified: true,
      profileImage: 'https://images.pexels.com/photos/1254140/pexels-photo-1254140.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop'
    }
  ];

  const handleRequestBlood = (donorId: number) => {
    alert(`Blood request sent to donor ${donorId}! You'll receive a confirmation shortly.`);
  };

  const filteredDonors = donors.filter(donor => {
    if (selectedSpecies !== 'all' && donor.species.toLowerCase() !== selectedSpecies) return false;
    if (donor.distance > parseInt(selectedDistance)) return false;
    if (searchTerm && !donor.petName.toLowerCase().includes(searchTerm.toLowerCase()) && 
        !donor.breed.toLowerCase().includes(searchTerm.toLowerCase()) &&
        !donor.bloodType.toLowerCase().includes(searchTerm.toLowerCase())) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Find Blood Donors</h1>
          <p className="text-lg text-gray-600">Search for verified pet blood donors in your area</p>
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Search by pet name, breed, or blood type
              </label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="text"
                  placeholder="e.g., Golden Retriever, DEA 1.1..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Species</label>
              <select
                value={selectedSpecies}
                onChange={(e) => setSelectedSpecies(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="all">All Species</option>
                <option value="dog">Dogs</option>
                <option value="cat">Cats</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Distance (miles)</label>
              <select
                value={selectedDistance}
                onChange={(e) => setSelectedDistance(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="5">Within 5 miles</option>
                <option value="10">Within 10 miles</option>
                <option value="25">Within 25 miles</option>
                <option value="50">Within 50 miles</option>
              </select>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Urgency</label>
              <select
                value={urgencyLevel}
                onChange={(e) => setUrgencyLevel(e.target.value)}
                className="w-full py-3 px-4 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              >
                <option value="normal">Normal</option>
                <option value="urgent">Urgent</option>
                <option value="emergency">Emergency</option>
              </select>
            </div>
          </div>
        </Card>

        {/* Map Section */}
        <Card className="mb-8">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-2xl font-bold text-gray-800">Donors Near You</h2>
            <div className="flex items-center text-gray-600">
              <MapPin className="w-5 h-5 mr-2" />
              <span>Map View</span>
            </div>
          </div>
          <div className="h-64 bg-gradient-to-br from-blue-100 to-green-100 rounded-xl flex items-center justify-center">
            <div className="text-center">
              <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-2" />
              <p className="text-gray-500">Interactive map showing donor locations</p>
              <p className="text-sm text-gray-400">Google Maps integration would be here</p>
            </div>
          </div>
        </Card>

        {/* Results */}
        <div className="mb-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            Available Donors ({filteredDonors.length})
          </h2>
          <p className="text-gray-600">Showing verified donors matching your criteria</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDonors.map((donor) => (
            <Card key={donor.id} className="relative">
              {donor.verified && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
                  Verified
                </div>
              )}
              
              <div className="flex items-start space-x-4 mb-4">
                <img
                  src={donor.profileImage}
                  alt={donor.petName}
                  className="w-16 h-16 rounded-full object-cover"
                />
                <div>
                  <h3 className="text-xl font-bold text-gray-800">{donor.petName}</h3>
                  <p className="text-gray-600">{donor.breed}</p>
                  <div className="flex items-center mt-1">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm text-gray-600 ml-1">{donor.rating} rating</span>
                  </div>
                </div>
              </div>

              <div className="space-y-2 mb-4">
                <div className="flex justify-between">
                  <span className="text-gray-600">Blood Type:</span>
                  <span className="font-medium text-purple-700">{donor.bloodType}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Age:</span>
                  <span className="font-medium">{donor.age} years</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Weight:</span>
                  <span className="font-medium">{donor.weight} lbs</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Distance:</span>
                  <span className="font-medium">{donor.distance} miles</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Donations:</span>
                  <span className="font-medium">{donor.donations} times</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-4 mb-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm text-gray-600">Owner: {donor.owner}</span>
                  <div className="flex items-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {donor.lastDonation}
                  </div>
                </div>
              </div>

              <div className="flex space-x-2">
                <Button
                  variant="primary"
                  onClick={() => handleRequestBlood(donor.id)}
                  className="flex-1"
                  icon={Heart}
                >
                  Request Blood
                </Button>
                <Button variant="outline" className="px-3">
                  <Phone className="w-4 h-4" />
                </Button>
              </div>
            </Card>
          ))}
        </div>

        {filteredDonors.length === 0 && (
          <Card className="text-center py-12">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-800 mb-2">No donors found</h3>
            <p className="text-gray-600 mb-6">
              Try expanding your search criteria or check back later for new donors.
            </p>
            <Button variant="outline" onClick={() => window.location.reload()}>
              Reset Filters
            </Button>
          </Card>
        )}
      </div>
    </div>
  );
};

export default FindBloodPage;
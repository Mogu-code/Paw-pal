import React, { useState } from 'react';
import { Upload, Heart, Check, User, PawPrint, Shield } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const BecomeDonorPage: React.FC = () => {
  const [formData, setFormData] = useState({
    ownerName: '',
    ownerEmail: '',
    ownerPhone: '',
    petName: '',
    species: '',
    breed: '',
    age: '',
    weight: '',
    bloodType: '',
    healthStatus: 'excellent',
    vetVerified: false,
    lastVetVisit: '',
    vaccinations: true,
    medications: '',
    availabilityDays: [] as string[],
    emergencyOnly: false,
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : value
    }));
  };

  const handleAvailabilityChange = (day: string) => {
    setFormData(prev => ({
      ...prev,
      availabilityDays: prev.availabilityDays.includes(day)
        ? prev.availabilityDays.filter(d => d !== day)
        : [...prev.availabilityDays, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">
              Welcome to the PawDonor Family! 🎉
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for registering <strong>{formData.petName}</strong> as a blood donor. 
              You're now part of a community of pet heroes saving lives!
            </p>
            <div className="bg-purple-50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-purple-800 mb-4">What happens next?</h3>
              <ul className="text-left space-y-3 text-purple-700">
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  We'll verify your information within 24 hours
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  A veterinarian will review {formData.petName}'s health profile
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  You'll receive your donor ID and welcome kit by email
                </li>
                <li className="flex items-start">
                  <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                  Start earning rewards points for every donation!
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={() => setIsSubmitted(false)}>
                Register Another Pet
              </Button>
              <Button variant="outline">
                View Donor Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Become a Donor</h1>
          <p className="text-lg text-gray-600">Register your pet and start saving lives today</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Owner Information */}
          <Card>
            <div className="flex items-center mb-6">
              <User className="w-6 h-6 text-purple-700 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Owner Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  name="ownerName"
                  required
                  value={formData.ownerName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="ownerEmail"
                  required
                  value={formData.ownerEmail}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number *
                </label>
                <input
                  type="tel"
                  name="ownerPhone"
                  required
                  value={formData.ownerPhone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>
          </Card>

          {/* Pet Information */}
          <Card>
            <div className="flex items-center mb-6">
              <PawPrint className="w-6 h-6 text-orange-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Pet Information</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Pet Name *
                </label>
                <input
                  type="text"
                  name="petName"
                  required
                  value={formData.petName}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Your pet's name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Species *
                </label>
                <select
                  name="species"
                  required
                  value={formData.species}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="">Select species</option>
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Breed *
                </label>
                <input
                  type="text"
                  name="breed"
                  required
                  value={formData.breed}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., Golden Retriever, Persian"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Age (years) *
                </label>
                <input
                  type="number"
                  name="age"
                  required
                  min="1"
                  max="15"
                  value={formData.age}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Age in years"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Weight (lbs) *
                </label>
                <input
                  type="number"
                  name="weight"
                  required
                  min="10"
                  value={formData.weight}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="Weight in pounds"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Blood Type (if known)
                </label>
                <input
                  type="text"
                  name="bloodType"
                  value={formData.bloodType}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  placeholder="e.g., DEA 1.1 Negative, Type A"
                />
              </div>
            </div>
          </Card>

          {/* Health Information */}
          <Card>
            <div className="flex items-center mb-6">
              <Shield className="w-6 h-6 text-green-500 mr-3" />
              <h2 className="text-2xl font-bold text-gray-800">Health Information</h2>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Overall Health Status *
                </label>
                <select
                  name="healthStatus"
                  required
                  value={formData.healthStatus}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                >
                  <option value="excellent">Excellent</option>
                  <option value="good">Good</option>
                  <option value="fair">Fair</option>
                </select>
              </div>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Last Veterinary Visit
                  </label>
                  <input
                    type="date"
                    name="lastVetVisit"
                    value={formData.lastVetVisit}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Medications
                  </label>
                  <input
                    type="text"
                    name="medications"
                    value={formData.medications}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="List any current medications"
                  />
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="vaccinations"
                    checked={formData.vaccinations}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    My pet is up to date on all vaccinations
                  </label>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="vetVerified"
                    checked={formData.vetVerified}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    I authorize veterinary verification of my pet's health records
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    name="emergencyOnly"
                    checked={formData.emergencyOnly}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <label className="ml-3 text-sm text-gray-700">
                    Only contact me for emergency situations
                  </label>
                </div>
              </div>
            </div>
          </Card>

          {/* Pet Photo Upload */}
          <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Pet Photo</h3>
            <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center hover:border-purple-400 transition-colors">
              <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
              <p className="text-sm text-gray-500">PNG, JPG up to 10MB</p>
              <input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={() => {}}
              />
            </div>
          </Card>

          {/* Availability */}
          <Card>
            <h3 className="text-xl font-bold text-gray-800 mb-4">Availability</h3>
            <p className="text-gray-600 mb-4">Select the days you're typically available for blood donation requests:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                <label key={day} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.availabilityDays.includes(day)}
                    onChange={() => handleAvailabilityChange(day)}
                    className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500"
                  />
                  <span className="text-sm text-gray-700">{day}</span>
                </label>
              ))}
            </div>
          </Card>

          {/* Terms and Submit */}
          <Card>
            <div className="bg-purple-50 rounded-xl p-6 mb-6">
              <h4 className="font-bold text-purple-800 mb-3">Before you submit:</h4>
              <ul className="space-y-2 text-purple-700 text-sm">
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Your pet must be at least 1 year old and weigh more than 25 lbs (dogs) or 10 lbs (cats)
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  A veterinarian will review your pet's eligibility
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  Blood donation is safe and typically takes 10-15 minutes
                </li>
                <li className="flex items-start">
                  <Check className="w-4 h-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  You can withdraw from the program at any time
                </li>
              </ul>
            </div>

            <div className="flex items-start mb-6">
              <input
                type="checkbox"
                required
                className="w-4 h-4 text-purple-600 border-gray-300 rounded focus:ring-purple-500 mt-1"
              />
              <label className="ml-3 text-sm text-gray-700">
                I agree to the <a href="#" className="text-purple-600 hover:underline">Terms of Service</a> and <a href="#" className="text-purple-600 hover:underline">Privacy Policy</a>. I understand that my pet's information will be shared with potential blood recipients and their veterinarians.
              </label>
            </div>

            <Button
              variant="primary"
              size="lg"
              type="submit"
              className="w-full"
              icon={Heart}
            >
              Register as Donor
            </Button>
          </Card>
        </form>
      </div>
    </div>
  );
};

export default BecomeDonorPage;
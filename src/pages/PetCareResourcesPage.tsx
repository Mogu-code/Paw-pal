import React, { useState } from 'react';
import { BookOpen, Heart, AlertTriangle, Shield, Apple, Stethoscope, Clock, ArrowRight } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const PetCareResourcesPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'diet' | 'diseases' | 'emergency' | 'vaccination'>('diet');

  const tabs = [
    { id: 'diet', label: 'Diet & Nutrition', icon: Apple },
    { id: 'diseases', label: 'Common Diseases', icon: Stethoscope },
    { id: 'emergency', label: 'Emergency Care', icon: AlertTriangle },
    { id: 'vaccination', label: 'Vaccination', icon: Shield },
  ];

  const dietArticles = [
    {
      id: 1,
      title: 'Essential Nutrients for Healthy Blood Production',
      excerpt: 'Learn about the key vitamins and minerals that support healthy blood formation in pets.',
      readTime: '5 min read',
      category: 'Nutrition',
      image: 'https://images.pexels.com/photos/7195797/pexels-photo-7195797.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Pre and Post Blood Donation Diet Tips',
      excerpt: 'Nutritional guidelines to help your pet prepare for and recover from blood donation.',
      readTime: '7 min read',
      category: 'Donation Care',
      image: 'https://images.pexels.com/photos/4552838/pexels-photo-4552838.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Iron-Rich Foods for Pets',
      excerpt: 'Natural food sources to boost iron levels and support healthy blood cell production.',
      readTime: '4 min read',
      category: 'Nutrition',
      image: 'https://images.pexels.com/photos/8434789/pexels-photo-8434789.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const diseaseArticles = [
    {
      id: 1,
      title: 'Understanding Anemia in Pets',
      excerpt: 'Symptoms, causes, and treatment options for anemia in dogs and cats.',
      readTime: '8 min read',
      category: 'Blood Disorders',
      image: 'https://images.pexels.com/photos/6816859/pexels-photo-6816859.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Blood Clotting Disorders in Pets',
      excerpt: 'Recognizing signs of bleeding disorders and when to seek immediate veterinary care.',
      readTime: '6 min read',
      category: 'Blood Disorders',
      image: 'https://images.pexels.com/photos/8434846/pexels-photo-8434846.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Tick-Borne Diseases and Blood Health',
      excerpt: 'How tick-borne illnesses affect your pet\'s blood and immune system.',
      readTime: '10 min read',
      category: 'Infectious Disease',
      image: 'https://images.pexels.com/photos/7195887/pexels-photo-7195887.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const emergencyArticles = [
    {
      id: 1,
      title: 'Recognizing Blood Loss Emergencies',
      excerpt: 'Critical warning signs that indicate your pet needs immediate blood transfusion.',
      readTime: '3 min read',
      category: 'Emergency',
      image: 'https://images.pexels.com/photos/6816860/pexels-photo-6816860.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      urgent: true
    },
    {
      id: 2,
      title: 'First Aid for Bleeding Wounds',
      excerpt: 'Step-by-step guide to control bleeding while getting to the veterinary clinic.',
      readTime: '4 min read',
      category: 'First Aid',
      image: 'https://images.pexels.com/photos/8434791/pexels-photo-8434791.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      urgent: true
    },
    {
      id: 3,
      title: 'When to Rush to Emergency Vet',
      excerpt: 'Understanding the difference between urgent and emergency situations.',
      readTime: '5 min read',
      category: 'Emergency',
      image: 'https://images.pexels.com/photos/7195798/pexels-photo-7195798.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop',
      urgent: true
    }
  ];

  const vaccinationArticles = [
    {
      id: 1,
      title: 'Blood Donor Vaccination Requirements',
      excerpt: 'Essential vaccinations needed for pets participating in blood donation programs.',
      readTime: '6 min read',
      category: 'Donor Requirements',
      image: 'https://images.pexels.com/photos/7195799/pexels-photo-7195799.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 2,
      title: 'Core vs. Non-Core Vaccines',
      excerpt: 'Understanding which vaccines are essential and which are optional for your pet.',
      readTime: '7 min read',
      category: 'Preventive Care',
      image: 'https://images.pexels.com/photos/6816856/pexels-photo-6816856.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    },
    {
      id: 3,
      title: 'Vaccination Schedule for Young Pets',
      excerpt: 'Timeline for puppy and kitten vaccinations to build strong immunity.',
      readTime: '8 min read',
      category: 'Preventive Care',
      image: 'https://images.pexels.com/photos/8434790/pexels-photo-8434790.jpeg?auto=compress&cs=tinysrgb&w=300&h=200&fit=crop'
    }
  ];

  const getArticles = () => {
    switch (activeTab) {
      case 'diet':
        return dietArticles;
      case 'diseases':
        return diseaseArticles;
      case 'emergency':
        return emergencyArticles;
      case 'vaccination':
        return vaccinationArticles;
      default:
        return dietArticles;
    }
  };

  const handleReadMore = (articleId: number) => {
    alert(`Opening full article ${articleId}. This would navigate to the complete article.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Pet Care Resources</h1>
          <p className="text-lg text-gray-600">Expert guides and tips for keeping your pet healthy and prepared for donation</p>
        </div>

        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-white rounded-2xl p-2 shadow-lg">
            <div className="flex space-x-1">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    className={`flex items-center space-x-2 px-6 py-3 rounded-xl text-sm font-medium transition-all duration-200 ${
                      isActive
                        ? 'bg-purple-700 text-white shadow-lg'
                        : 'text-gray-600 hover:text-purple-700 hover:bg-purple-50'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                    <span>{tab.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* Emergency Alert for Emergency Tab */}
        {activeTab === 'emergency' && (
          <Card className="mb-8 bg-red-50 border-2 border-red-200">
            <div className="flex items-start space-x-4">
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                <AlertTriangle className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-red-800 mb-2">Emergency Information</h3>
                <p className="text-red-700 mb-4">
                  If your pet is experiencing a life-threatening emergency, don't wait. Call our emergency hotline immediately or go to the nearest emergency veterinary clinic.
                </p>
                <Button variant="primary" className="bg-red-500 hover:bg-red-600">
                  Emergency Hotline: 1-800-PET-HELP
                </Button>
              </div>
            </div>
          </Card>
        )}

        {/* Featured Content */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          {getArticles().map((article) => (
            <Card key={article.id} className={`relative ${article.urgent ? 'ring-2 ring-red-300 bg-red-50' : ''}`}>
              {article.urgent && (
                <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-full text-xs font-bold">
                  URGENT
                </div>
              )}
              
              <img
                src={article.image}
                alt={article.title}
                className="w-full h-48 object-cover rounded-xl mb-4"
              />
              
              <div className="flex items-center justify-between mb-3">
                <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-medium rounded-full">
                  {article.category}
                </span>
                <div className="flex items-center text-gray-500 text-xs">
                  <Clock className="w-3 h-3 mr-1" />
                  {article.readTime}
                </div>
              </div>
              
              <h3 className="text-xl font-bold text-gray-800 mb-3">{article.title}</h3>
              <p className="text-gray-600 mb-6">{article.excerpt}</p>
              
              <Button
                variant={article.urgent ? "primary" : "outline"}
                onClick={() => handleReadMore(article.id)}
                className={`w-full ${article.urgent ? 'bg-red-500 hover:bg-red-600' : ''}`}
              >
                Read More <ArrowRight className="w-4 h-4" />
              </Button>
            </Card>
          ))}
        </div>

        {/* Quick Tips Section */}
        <Card className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Quick Tips</h2>
          
          {activeTab === 'diet' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-green-50 rounded-xl p-6">
                <h3 className="font-bold text-green-800 mb-3">✓ Do's</h3>
                <ul className="space-y-2 text-green-700">
                  <li>• Provide high-quality protein sources</li>
                  <li>• Include iron-rich foods like lean meats</li>
                  <li>• Ensure adequate hydration</li>
                  <li>• Follow feeding schedules consistently</li>
                </ul>
              </div>
              <div className="bg-red-50 rounded-xl p-6">
                <h3 className="font-bold text-red-800 mb-3">✗ Don'ts</h3>
                <ul className="space-y-2 text-red-700">
                  <li>• Avoid feeding raw meat to blood donors</li>
                  <li>• Don't give supplements without vet approval</li>
                  <li>• Avoid sudden diet changes</li>
                  <li>• Don't overfeed before donation</li>
                </ul>
              </div>
            </div>
          )}

          {activeTab === 'diseases' && (
            <div className="grid md:grid-cols-3 gap-6">
              <div className="bg-yellow-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <AlertTriangle className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-yellow-800 mb-2">Watch For</h3>
                <p className="text-yellow-700 text-sm">Lethargy, pale gums, rapid breathing</p>
              </div>
              <div className="bg-blue-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-blue-800 mb-2">Regular Checkups</h3>
                <p className="text-blue-700 text-sm">Blood tests every 6 months for donors</p>
              </div>
              <div className="bg-green-50 rounded-xl p-6 text-center">
                <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-6 h-6 text-white" />
                </div>
                <h3 className="font-bold text-green-800 mb-2">Prevention</h3>
                <p className="text-green-700 text-sm">Maintain healthy diet and exercise</p>
              </div>
            </div>
          )}

          {activeTab === 'emergency' && (
            <div className="bg-gradient-to-r from-red-100 to-orange-100 rounded-xl p-6">
              <h3 className="font-bold text-red-800 mb-4 text-lg">Emergency Checklist</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-red-700 mb-3">Immediate Actions:</h4>
                  <ul className="space-y-2 text-red-600">
                    <li>1. Keep pet calm and still</li>
                    <li>2. Apply direct pressure to wounds</li>
                    <li>3. Call emergency vet immediately</li>
                    <li>4. Transport safely to clinic</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-red-700 mb-3">Emergency Kit:</h4>
                  <ul className="space-y-2 text-red-600">
                    <li>• Clean towels and gauze</li>
                    <li>• Emergency vet contact numbers</li>
                    <li>• Pet carrier or stretcher</li>
                    <li>• Medical records copy</li>
                  </ul>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'vaccination' && (
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 rounded-xl p-6">
                <h3 className="font-bold text-purple-800 mb-3">Core Vaccines (Required)</h3>
                <ul className="space-y-2 text-purple-700">
                  <li>• Rabies (annual or 3-year)</li>
                  <li>• DHPP for dogs (Distemper, Hepatitis, Parvovirus, Parainfluenza)</li>
                  <li>• FVRCP for cats (Feline Viral Rhinotracheitis, Calicivirus, Panleukopenia)</li>
                </ul>
              </div>
              <div className="bg-blue-50 rounded-xl p-6">
                <h3 className="font-bold text-blue-800 mb-3">Additional for Donors</h3>
                <ul className="space-y-2 text-blue-700">
                  <li>• Bordetella (kennel cough)</li>
                  <li>• Lyme disease (if in endemic area)</li>
                  <li>• FeLV for cats (Feline Leukemia)</li>
                </ul>
              </div>
            </div>
          )}
        </Card>

        {/* Contact Veterinarian CTA */}
        <Card className="text-center bg-gradient-to-r from-purple-700 to-orange-500 text-white">
          <h2 className="text-2xl font-bold mb-4">Have Questions?</h2>
          <p className="text-purple-100 mb-6">
            Our veterinary partners are here to help with any questions about pet health and blood donation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="bg-white text-purple-700 hover:bg-gray-100">
              Contact a Vet
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-700">
              Browse More Articles
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default PetCareResourcesPage;
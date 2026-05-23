import React from 'react';
import { Heart, Users, Award, Target, MapPin, Mail, Phone } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const AboutPage: React.FC = () => {
  const stats = [
    { number: '2,500+', label: 'Lives Saved', icon: Heart },
    { number: '800+', label: 'Active Donors', icon: Users },
    { number: '150+', label: 'Partner Clinics', icon: MapPin },
    { number: '5 Years', label: 'In Operation', icon: Award },
  ];

  const team = [
    {
      name: 'Dr. Sarah Martinez',
      role: 'Chief Veterinary Officer',
      image: 'https://images.pexels.com/photos/5407206/pexels-photo-5407206.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: '15+ years in veterinary medicine with specialization in emergency care and blood transfusion protocols.'
    },
    {
      name: 'Michael Chen',
      role: 'Founder & CEO',
      image: 'https://images.pexels.com/photos/5212317/pexels-photo-5212317.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Pet parent and technology entrepreneur passionate about connecting communities to save pet lives.'
    },
    {
      name: 'Dr. Emily Rodriguez',
      role: 'Director of Operations',
      image: 'https://images.pexels.com/photos/5407047/pexels-photo-5407047.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Veterinary technician with 12 years experience in blood banking and donor management systems.'
    },
    {
      name: 'James Thompson',
      role: 'Community Outreach Manager',
      image: 'https://images.pexels.com/photos/5212700/pexels-photo-5212700.jpeg?auto=compress&cs=tinysrgb&w=300&h=300&fit=crop',
      bio: 'Dedicated to building relationships with pet owners, veterinarians, and animal welfare organizations.'
    }
  ];

  const testimonials = [
    {
      name: 'Jennifer Walsh',
      role: 'Pet Parent',
      text: 'When my cat needed emergency surgery and blood transfusion, PawDonor connected us with a donor within hours. I\'m forever grateful.',
      image: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Dr. Robert Kim',
      role: 'Emergency Veterinarian',
      text: 'This platform has revolutionized how we handle blood emergencies. The response time and quality of donors is exceptional.',
      image: 'https://images.pexels.com/photos/5327656/pexels-photo-5327656.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    },
    {
      name: 'Maria Santos',
      role: 'Blood Donor',
      text: 'My Golden Retriever Max loves going to donation appointments. Knowing he\'s helping save other pets makes us both happy.',
      image: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=100&h=100&fit=crop'
    }
  ];

  const values = [
    {
      title: 'Compassion',
      description: 'Every pet deserves the best possible care, and we work tirelessly to ensure no pet goes without needed blood products.',
      icon: Heart
    },
    {
      title: 'Community',
      description: 'We believe in the power of pet parents coming together to support each other in times of need.',
      icon: Users
    },
    {
      title: 'Excellence',
      description: 'We maintain the highest standards for donor screening, blood handling, and veterinary partnerships.',
      icon: Award
    },
    {
      title: 'Innovation',
      description: 'We continuously improve our platform using technology to make blood donation more accessible and efficient.',
      icon: Target
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-6">About PawDonor</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto mb-8">
            We're on a mission to save pet lives by connecting blood donors with those in need. 
            Every donation has the power to give a pet a second chance at life.
          </p>
          <div className="grid md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-700 to-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-3xl font-bold text-gray-800">{stat.number}</h3>
                  <p className="text-gray-600">{stat.label}</p>
                </div>
              );
            })}
          </div>
        </div>

        {/* Mission Statement */}
        <Card className="mb-16 bg-gradient-to-r from-purple-50 to-orange-50 border border-purple-200">
          <div className="text-center max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed mb-6">
              PawDonor was founded in 2020 when our founder's dog, Charlie, needed an emergency blood transfusion. 
              The difficulty of finding a compatible donor in time sparked the idea for a platform that would connect 
              pet blood donors with recipients quickly and efficiently.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
              Today, we're proud to be the largest pet blood donation network in the country, working with hundreds 
              of veterinary clinics and thousands of donor families to ensure that no pet goes without the blood 
              products they need to survive and thrive.
            </p>
          </div>
        </Card>

        {/* Values */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="text-center">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-700 to-orange-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-gray-800 mb-3">{value.title}</h3>
                  <p className="text-gray-600">{value.description}</p>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">Meet Our Team</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="text-center">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-24 h-24 rounded-full object-cover mx-auto mb-4"
                />
                <h3 className="text-xl font-bold text-gray-800 mb-1">{member.name}</h3>
                <p className="text-purple-600 font-medium mb-3">{member.role}</p>
                <p className="text-sm text-gray-600">{member.bio}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-gray-800 text-center mb-12">What People Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="text-center">
                <img
                  src={testimonial.image}
                  alt={testimonial.name}
                  className="w-16 h-16 rounded-full object-cover mx-auto mb-4"
                />
                <p className="text-gray-700 italic mb-4">"{testimonial.text}"</p>
                <h4 className="font-bold text-gray-800">{testimonial.name}</h4>
                <p className="text-sm text-gray-600">{testimonial.role}</p>
              </Card>
            ))}
          </div>
        </div>

        {/* Impact Section */}
        <Card className="mb-16 bg-gradient-to-r from-green-50 to-blue-50 border border-green-200">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Impact</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div>
                <div className="w-20 h-20 bg-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Emergency Response</h3>
                <p className="text-gray-600">
                  Average response time of under 2 hours for emergency blood requests
                </p>
              </div>
              <div>
                <div className="w-20 h-20 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Community Growth</h3>
                <p className="text-gray-600">
                  Growing network of over 800 registered donors across 25 states
                </p>
              </div>
              <div>
                <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Award className="w-10 h-10 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-2">Recognition</h3>
                <p className="text-gray-600">
                  Winner of the 2024 Pet Innovation Award and AVMA Technology Excellence
                </p>
              </div>
            </div>
          </div>
        </Card>

        {/* Contact Information */}
        <div className="grid md:grid-cols-2 gap-8 mb-16">
          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Get in Touch</h2>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">info@pawdonor.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">(555) 123-PAWS</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-purple-600" />
                <span className="text-gray-700">123 Pet Heroes Blvd, San Francisco, CA 94102</span>
              </div>
            </div>
            <div className="mt-8">
              <Button variant="primary" className="w-full">
                Contact Us
              </Button>
            </div>
          </Card>

          <Card>
            <h2 className="text-2xl font-bold text-gray-800 mb-6">Join Our Mission</h2>
            <p className="text-gray-600 mb-6">
              Whether you're a pet owner, veterinarian, or animal lover, there are many ways 
              to get involved and help save pet lives.
            </p>
            <div className="space-y-3">
              <Button variant="primary" className="w-full">
                Become a Donor
              </Button>
              <Button variant="outline" className="w-full">
                Partner with Us
              </Button>
              <Button variant="outline" className="w-full">
                Volunteer
              </Button>
            </div>
          </Card>
        </div>

        {/* Call to Action */}
        <Card className="text-center bg-gradient-to-r from-purple-700 to-orange-500 text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Save Lives?</h2>
          <p className="text-xl text-purple-100 mb-8">
            Join thousands of pet heroes who are making a difference in their communities
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button variant="primary" className="bg-white text-purple-700 hover:bg-gray-100">
              Register Your Pet
            </Button>
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white hover:text-purple-700">
              Find Blood Now
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AboutPage;
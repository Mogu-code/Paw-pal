import React, { useState } from 'react';
import { Phone, Mail, MapPin, Clock, MessageCircle, AlertTriangle, Send, Heart } from 'lucide-react';
import Button from '../components/Button';
import Card from '../components/Card';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    urgency: 'normal',
    message: '',
    contactMethod: 'email'
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const contactOptions = [
    {
      title: 'General Inquiries',
      description: 'Questions about our services, partnerships, or platform',
      icon: Mail,
      contact: 'info@pawdonor.com',
      hours: 'Mon-Fri: 9AM-6PM PST',
      color: 'bg-blue-500'
    },
    {
      title: 'Donor Support',
      description: 'Help with donor registration, profile updates, or donations',
      icon: Heart,
      contact: 'donors@pawdonor.com',
      hours: 'Mon-Sun: 8AM-8PM PST',
      color: 'bg-purple-500'
    },
    {
      title: 'Veterinary Partners',
      description: 'For veterinary clinics interested in joining our network',
      icon: MessageCircle,
      contact: 'vets@pawdonor.com',
      hours: 'Mon-Fri: 8AM-6PM PST',
      color: 'bg-green-500'
    },
    {
      title: '24/7 Emergency Hotline',
      description: 'Immediate assistance for blood donation emergencies',
      icon: Phone,
      contact: '1-800-PET-HELP',
      hours: 'Available 24/7',
      color: 'bg-red-500'
    }
  ];

  const faqs = [
    {
      question: 'How quickly can I find a blood donor?',
      answer: 'For emergency cases, we typically connect you with a donor within 1-3 hours. Non-emergency requests are usually fulfilled within 24-48 hours.'
    },
    {
      question: 'Is blood donation safe for my pet?',
      answer: 'Yes, blood donation is very safe when performed by trained veterinary professionals. The process is similar to human blood donation and takes about 15-20 minutes.'
    },
    {
      question: 'How often can my pet donate blood?',
      answer: 'Dogs can safely donate blood every 6-8 weeks, while cats can donate every 8-12 weeks. Our system automatically tracks donation intervals to ensure pet safety.'
    },
    {
      question: 'What if my pet needs blood but there are no compatible donors nearby?',
      answer: 'We work with a network of blood banks and can arrange transportation from donors in nearby cities. We also have emergency protocols with partner clinics.'
    }
  ];

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-4xl mx-auto px-6">
          <Card className="text-center py-12">
            <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <Send className="w-10 h-10 text-white" />
            </div>
            <h1 className="text-4xl font-bold text-gray-800 mb-4">Message Sent!</h1>
            <p className="text-xl text-gray-600 mb-8">
              Thank you for contacting PawDonor. We'll get back to you within 24 hours.
            </p>
            <div className="bg-purple-50 rounded-xl p-6 mb-8 max-w-2xl mx-auto">
              <h3 className="text-lg font-bold text-purple-800 mb-4">What happens next?</h3>
              <ul className="text-left space-y-3 text-purple-700">
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Our team will review your message and respond via {formData.contactMethod}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  {formData.urgency === 'emergency' ? 'Emergency requests receive immediate priority' : 
                   formData.urgency === 'urgent' ? 'We\'ll respond within 4 hours for urgent matters' :
                   'Expect a response within 24 hours'}
                </li>
                <li className="flex items-start">
                  <div className="w-2 h-2 bg-purple-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                  Check your email for a confirmation with your support ticket number
                </li>
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button variant="primary" onClick={() => setIsSubmitted(false)}>
                Send Another Message
              </Button>
              <Button variant="outline" onClick={() => window.history.back()}>
                Return to Previous Page
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800 mb-4">Contact Us</h1>
          <p className="text-lg text-gray-600">Get in touch with our team - we're here to help 24/7</p>
        </div>

        {/* Emergency Alert */}
        <Card className="mb-8 bg-red-50 border-2 border-red-200">
          <div className="flex items-start space-x-4">
            <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-red-800 mb-2">Pet Emergency?</h3>
              <p className="text-red-700 mb-4">
                If your pet needs immediate blood transfusion or is experiencing a medical emergency, 
                don't wait. Call our 24/7 emergency hotline now.
              </p>
              <Button variant="primary" className="bg-red-500 hover:bg-red-600">
                <Phone className="w-4 h-4" />
                Call Emergency Hotline: 1-800-PET-HELP
              </Button>
            </div>
          </div>
        </Card>

        {/* Contact Options */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {contactOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <Card key={index} className="text-center hover:shadow-xl transition-all duration-300">
                <div className={`w-16 h-16 ${option.color} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <Icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-lg font-bold text-gray-800 mb-2">{option.title}</h3>
                <p className="text-gray-600 text-sm mb-4">{option.description}</p>
                <div className="space-y-2">
                  <p className="font-bold text-gray-800">{option.contact}</p>
                  <div className="flex items-center justify-center text-sm text-gray-600">
                    <Clock className="w-4 h-4 mr-1" />
                    {option.hours}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-12">
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <Card>
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Send us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      required
                      value={formData.name}
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
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="your.email@example.com"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      placeholder="(555) 123-4567"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Urgency Level *
                    </label>
                    <select
                      name="urgency"
                      required
                      value={formData.urgency}
                      onChange={handleInputChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    >
                      <option value="normal">Normal (24-48 hours)</option>
                      <option value="urgent">Urgent (4-6 hours)</option>
                      <option value="emergency">Emergency (Immediate)</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Subject *
                  </label>
                  <select
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                  >
                    <option value="">Select a subject</option>
                    <option value="blood-request">Blood Donation Request</option>
                    <option value="donor-registration">Donor Registration Help</option>
                    <option value="vet-partnership">Veterinary Partnership</option>
                    <option value="technical-support">Technical Support</option>
                    <option value="billing">Billing Question</option>
                    <option value="feedback">Feedback/Suggestion</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message *
                  </label>
                  <textarea
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Please provide details about your inquiry..."
                  ></textarea>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Contact Method
                  </label>
                  <div className="flex space-x-4">
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="email"
                        checked={formData.contactMethod === 'email'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Email</span>
                    </label>
                    <label className="flex items-center">
                      <input
                        type="radio"
                        name="contactMethod"
                        value="phone"
                        checked={formData.contactMethod === 'phone'}
                        onChange={handleInputChange}
                        className="w-4 h-4 text-purple-600 border-gray-300 focus:ring-purple-500"
                      />
                      <span className="ml-2 text-sm text-gray-700">Phone</span>
                    </label>
                  </div>
                </div>

                {formData.urgency === 'emergency' && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-4">
                    <div className="flex items-start space-x-3">
                      <AlertTriangle className="w-5 h-5 text-red-500 mt-0.5" />
                      <div>
                        <h4 className="font-bold text-red-800">Emergency Notice</h4>
                        <p className="text-red-700 text-sm">
                          For true emergencies requiring immediate blood transfusion, please call our emergency hotline 
                          at 1-800-PET-HELP instead of using this form.
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                <Button type="submit" variant="primary" size="lg" className="w-full" icon={Send}>
                  Send Message
                </Button>
              </form>
            </Card>
          </div>

          {/* FAQ and Additional Info */}
          <div className="space-y-6">
            <Card>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Office Information</h3>
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <MapPin className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Headquarters</p>
                    <p className="text-gray-600 text-sm">123 Pet Heroes Blvd<br />San Francisco, CA 94102</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Clock className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">Business Hours</p>
                    <p className="text-gray-600 text-sm">Mon-Fri: 9AM-6PM PST<br />Emergency hotline: 24/7</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Mail className="w-5 h-5 text-purple-600 mt-0.5" />
                  <div>
                    <p className="font-medium text-gray-800">General Email</p>
                    <p className="text-gray-600 text-sm">info@pawdonor.com</p>
                  </div>
                </div>
              </div>
            </Card>

            <Card>
              <h3 className="text-xl font-bold text-gray-800 mb-4">Frequently Asked Questions</h3>
              <div className="space-y-4">
                {faqs.map((faq, index) => (
                  <div key={index} className="border-b border-gray-200 last:border-0 pb-4 last:pb-0">
                    <h4 className="font-medium text-gray-800 mb-2">{faq.question}</h4>
                    <p className="text-gray-600 text-sm">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
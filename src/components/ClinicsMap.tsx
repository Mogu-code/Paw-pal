import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";

export default function ClinicsMap() {
  const [filters, setFilters] = useState({
    city: "",
    searchTerm: "",
  });

  const clinics = useQuery(api.clinics.getClinics, {
    city: filters.city || undefined,
    searchTerm: filters.searchTerm || undefined,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Veterinary Clinics</h2>
        <p className="text-gray-600">Find nearby veterinary clinics for your pet's needs</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Clinics</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              placeholder="Search by clinic name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              City
            </label>
            <input
              type="text"
              value={filters.city}
              onChange={(e) => setFilters({ ...filters, city: e.target.value })}
              placeholder="Enter city name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>
        </div>
      </div>

      {/* Results */}
      <div>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Clinics Found ({clinics?.length || 0})
          </h3>
        </div>

        {clinics && clinics.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-6xl mb-4">🏥</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No clinics found</h3>
            <p className="text-gray-600">Try adjusting your search filters</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {clinics?.map((clinic) => (
            <ClinicCard key={clinic._id} clinic={clinic} />
          ))}
        </div>
      </div>
    </div>
  );
}

function ClinicCard({ clinic }: { clinic: any }) {
  const handleBookAppointment = () => {
    // In a real app, this would open a booking system or redirect to the clinic's website
    window.open(`tel:${clinic.phone}`, '_self');
  };

  const handleGetDirections = () => {
    // Open Google Maps with the clinic's location
    const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${clinic.lat},${clinic.lng}`;
    window.open(mapsUrl, '_blank');
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 hover:shadow-md transition-shadow">
      <div className="flex justify-between items-start mb-3">
        <h3 className="text-lg font-semibold text-gray-900">{clinic.name}</h3>
        <div className="w-10 h-10 bg-teal-100 rounded-full flex items-center justify-center">
          <span className="text-xl">🏥</span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p><span className="font-medium">📍 Address:</span> {clinic.address}</p>
        <p><span className="font-medium">🏙️ City:</span> {clinic.city}</p>
        <p><span className="font-medium">📞 Phone:</span> {clinic.phone}</p>
        {clinic.email && (
          <p><span className="font-medium">✉️ Email:</span> {clinic.email}</p>
        )}
        <p><span className="font-medium">🕒 Hours:</span> {clinic.operatingHours}</p>
      </div>

      {clinic.services && clinic.services.length > 0 && (
        <div className="mb-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Services:</p>
          <div className="flex flex-wrap gap-1">
            {clinic.services.slice(0, 3).map((service: string, index: number) => (
              <span
                key={index}
                className="bg-teal-100 text-teal-700 px-2 py-1 rounded-full text-xs"
              >
                {service}
              </span>
            ))}
            {clinic.services.length > 3 && (
              <span className="bg-gray-100 text-gray-600 px-2 py-1 rounded-full text-xs">
                +{clinic.services.length - 3} more
              </span>
            )}
          </div>
        </div>
      )}

      <div className="flex space-x-2">
        <button
          onClick={handleBookAppointment}
          className="flex-1 bg-teal-600 text-white py-2 px-3 rounded-md hover:bg-teal-700 transition-colors text-sm font-medium"
        >
          📞 Call Now
        </button>
        <button
          onClick={handleGetDirections}
          className="flex-1 bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          🗺️ Directions
        </button>
      </div>
    </div>
  );
}

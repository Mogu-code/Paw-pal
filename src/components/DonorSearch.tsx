import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export default function DonorSearch() {
  const [filters, setFilters] = useState({
    species: "",
    bloodGroup: "",
    city: "",
    searchTerm: "",
  });
  const [showRequestModal, setShowRequestModal] = useState<string | null>(null);

  const donors = useQuery(api.pets.searchDonorPets, {
    species: filters.species || undefined,
    bloodGroup: filters.bloodGroup || undefined,
    city: filters.city || undefined,
    searchTerm: filters.searchTerm || undefined,
  });

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Find Blood Donors</h2>
        <p className="text-gray-600">Search for compatible blood donors in your area</p>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-lg shadow-sm p-6">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Search Filters</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Search
            </label>
            <input
              type="text"
              value={filters.searchTerm}
              onChange={(e) => setFilters({ ...filters, searchTerm: e.target.value })}
              placeholder="Search by pet name..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Species
            </label>
            <select
              value={filters.species}
              onChange={(e) => setFilters({ ...filters, species: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <option value="">All Species</option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Blood Group
            </label>
            <input
              type="text"
              value={filters.bloodGroup}
              onChange={(e) => setFilters({ ...filters, bloodGroup: e.target.value })}
              placeholder="e.g., DEA 1.1 positive"
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
            Available Donors ({donors?.length || 0})
          </h3>
        </div>

        {donors && donors.length === 0 && (
          <div className="bg-white rounded-lg shadow-sm p-8 text-center">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">No donors found</h3>
            <p className="text-gray-600">Try adjusting your search filters to find more donors</p>
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {donors?.map((pet) => (
            <DonorCard
              key={pet._id}
              pet={pet}
              onRequestBlood={() => setShowRequestModal(pet._id)}
            />
          ))}
        </div>
      </div>

      {showRequestModal && (
        <RequestModal
          petId={showRequestModal}
          onClose={() => setShowRequestModal(null)}
        />
      )}
    </div>
  );
}

function DonorCard({ pet, onRequestBlood }: { pet: any; onRequestBlood: () => void }) {
  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden hover:shadow-md transition-shadow">
      {pet.photoUrl && (
        <img
          src={pet.photoUrl}
          alt={pet.name}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <div className="flex justify-between items-start mb-2">
          <h3 className="text-lg font-semibold text-gray-900">{pet.name}</h3>
          <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-medium">
            Available
          </span>
        </div>
        
        <div className="space-y-1 text-sm text-gray-600 mb-4">
          <p><span className="font-medium">Species:</span> {pet.species}</p>
          <p><span className="font-medium">Breed:</span> {pet.breed}</p>
          <p><span className="font-medium">Age:</span> {pet.age} years</p>
          <p><span className="font-medium">Weight:</span> {pet.weight} kg</p>
          <p><span className="font-medium">Blood Group:</span> {pet.bloodGroup}</p>
          <p><span className="font-medium">City:</span> {pet.city}</p>
          <p><span className="font-medium">Vaccination:</span> {pet.vaccinationStatus}</p>
        </div>

        <div className="border-t pt-3">
          <p className="text-sm text-gray-600 mb-2">
            <span className="font-medium">Owner:</span> {pet.ownerName}
          </p>
          <button
            onClick={onRequestBlood}
            className="w-full bg-orange-600 text-white py-2 px-4 rounded-md hover:bg-orange-700 transition-colors font-medium"
          >
            🩸 Request Blood
          </button>
        </div>
      </div>
    </div>
  );
}

function RequestModal({ petId, onClose }: { petId: string; onClose: () => void }) {
  const [formData, setFormData] = useState({
    urgency: "normal" as "normal" | "emergency",
    message: "",
    requiredAmount: "",
    contactInfo: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createRequest = useMutation(api.requests.createRequest);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.requiredAmount || !formData.contactInfo) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      await createRequest({
        donorPetId: petId as any,
        urgency: formData.urgency,
        message: formData.message || undefined,
        requiredAmount: formData.requiredAmount,
        contactInfo: formData.contactInfo,
      });
      toast.success("Blood request sent successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to send request");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <div className="flex justify-between items-center mb-6">
          <h3 className="text-xl font-semibold text-gray-900">Request Blood Donation</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600"
          >
            ✕
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Urgency Level *
            </label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, urgency: "normal" })}
                className={`p-3 rounded-md border-2 text-center transition-colors ${
                  formData.urgency === "normal"
                    ? "border-teal-500 bg-teal-50 text-teal-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">Normal</div>
                <div className="text-xs text-gray-500">Routine procedure</div>
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, urgency: "emergency" })}
                className={`p-3 rounded-md border-2 text-center transition-colors ${
                  formData.urgency === "emergency"
                    ? "border-orange-500 bg-orange-50 text-orange-700"
                    : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <div className="font-medium">🚨 Emergency</div>
                <div className="text-xs text-gray-500">Urgent need</div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Required Amount *
            </label>
            <input
              type="text"
              value={formData.requiredAmount}
              onChange={(e) => setFormData({ ...formData, requiredAmount: e.target.value })}
              placeholder="e.g., 200ml, 1 unit"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Your Contact Information *
            </label>
            <input
              type="text"
              value={formData.contactInfo}
              onChange={(e) => setFormData({ ...formData, contactInfo: e.target.value })}
              placeholder="Phone number or email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Additional Message
            </label>
            <textarea
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              placeholder="Any additional information about the situation..."
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              rows={3}
            />
          </div>

          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`px-4 py-2 text-white rounded-md transition-colors disabled:opacity-50 ${
                formData.urgency === "emergency"
                  ? "bg-orange-600 hover:bg-orange-700"
                  : "bg-teal-600 hover:bg-teal-700"
              }`}
            >
              {isSubmitting ? "Sending..." : "Send Request"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

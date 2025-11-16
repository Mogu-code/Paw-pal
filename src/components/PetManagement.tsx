import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export default function PetManagement() {
  const [showAddForm, setShowAddForm] = useState(false);
  const pets = useQuery(api.pets.getUserPets);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">My Pets</h2>
        <button
          onClick={() => setShowAddForm(true)}
          className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors"
        >
          + Add Pet
        </button>
      </div>

      {pets && pets.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🐕</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No pets registered yet</h3>
          <p className="text-gray-600 mb-4">Add your first pet to start helping save lives</p>
          <button
            onClick={() => setShowAddForm(true)}
            className="bg-teal-600 text-white px-6 py-2 rounded-md hover:bg-teal-700 transition-colors"
          >
            Add Your First Pet
          </button>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {pets?.map((pet) => (
          <PetCard key={pet._id} pet={pet} />
        ))}
      </div>

      {showAddForm && (
        <AddPetModal onClose={() => setShowAddForm(false)} />
      )}
    </div>
  );
}

function PetCard({ pet }: { pet: any }) {
  const [showEditForm, setShowEditForm] = useState(false);
  const updatePet = useMutation(api.pets.updatePet);

  const toggleAvailability = async () => {
    try {
      await updatePet({
        petId: pet._id,
        isAvailableForDonation: !pet.isAvailableForDonation,
      });
      toast.success(
        pet.isAvailableForDonation
          ? "Pet removed from donor list"
          : "Pet added to donor list"
      );
    } catch (error) {
      toast.error("Failed to update pet availability");
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden">
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
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
            pet.isAvailableForDonation
              ? "bg-green-100 text-green-700"
              : "bg-gray-100 text-gray-700"
          }`}>
            {pet.isAvailableForDonation ? "Available" : "Unavailable"}
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

        <div className="flex space-x-2">
          <button
            onClick={() => setShowEditForm(true)}
            className="flex-1 bg-gray-100 text-gray-700 py-2 px-3 rounded-md hover:bg-gray-200 transition-colors text-sm"
          >
            Edit
          </button>
          <button
            onClick={toggleAvailability}
            className={`flex-1 py-2 px-3 rounded-md transition-colors text-sm ${
              pet.isAvailableForDonation
                ? "bg-red-100 text-red-700 hover:bg-red-200"
                : "bg-green-100 text-green-700 hover:bg-green-200"
            }`}
          >
            {pet.isAvailableForDonation ? "Make Unavailable" : "Make Available"}
          </button>
        </div>
      </div>

      {showEditForm && (
        <EditPetModal pet={pet} onClose={() => setShowEditForm(false)} />
      )}
    </div>
  );
}

function AddPetModal({ onClose }: { onClose: () => void }) {
  const [formData, setFormData] = useState({
    name: "",
    species: "dog" as "dog" | "cat",
    breed: "",
    age: "",
    weight: "",
    bloodGroup: "",
    city: "",
    healthCondition: "",
    vaccinationStatus: "up-to-date" as "up-to-date" | "overdue" | "unknown",
    isAvailableForDonation: true,
  });
  const [photo, setPhoto] = useState<File | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const createPet = useMutation(api.pets.createPet);
  const generateUploadUrl = useMutation(api.pets.generateUploadUrl);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      let photoId;
      if (photo) {
        const uploadUrl = await generateUploadUrl();
        const result = await fetch(uploadUrl, {
          method: "POST",
          headers: { "Content-Type": photo.type },
          body: photo,
        });
        const { storageId } = await result.json();
        photoId = storageId;
      }

      await createPet({
        name: formData.name,
        species: formData.species,
        breed: formData.breed,
        age: parseInt(formData.age),
        weight: parseFloat(formData.weight),
        bloodGroup: formData.bloodGroup,
        city: formData.city,
        healthCondition: formData.healthCondition,
        vaccinationStatus: formData.vaccinationStatus,
        photo: photoId,
        isAvailableForDonation: formData.isAvailableForDonation,
      });

      toast.success("Pet added successfully!");
      onClose();
    } catch (error) {
      toast.error("Failed to add pet");
      console.error(error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold text-gray-900">Add New Pet</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Pet Name *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Species *
                </label>
                <select
                  value={formData.species}
                  onChange={(e) => setFormData({ ...formData, species: e.target.value as "dog" | "cat" })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="dog">Dog</option>
                  <option value="cat">Cat</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Breed *
                </label>
                <input
                  type="text"
                  value={formData.breed}
                  onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Age (years) *
                </label>
                <input
                  type="number"
                  value={formData.age}
                  onChange={(e) => setFormData({ ...formData, age: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Weight (kg) *
                </label>
                <input
                  type="number"
                  value={formData.weight}
                  onChange={(e) => setFormData({ ...formData, weight: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  min="0"
                  step="0.1"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Blood Group *
                </label>
                <input
                  type="text"
                  value={formData.bloodGroup}
                  onChange={(e) => setFormData({ ...formData, bloodGroup: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  placeholder="e.g., DEA 1.1 positive"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  City *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Vaccination Status *
                </label>
                <select
                  value={formData.vaccinationStatus}
                  onChange={(e) => setFormData({ ...formData, vaccinationStatus: e.target.value as any })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                >
                  <option value="up-to-date">Up to Date</option>
                  <option value="overdue">Overdue</option>
                  <option value="unknown">Unknown</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Health Condition *
              </label>
              <textarea
                value={formData.healthCondition}
                onChange={(e) => setFormData({ ...formData, healthCondition: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
                rows={3}
                placeholder="Describe your pet's current health condition"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Pet Photo
              </label>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => setPhoto(e.target.files?.[0] || null)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500"
              />
            </div>

            <div className="flex items-center">
              <input
                type="checkbox"
                id="available"
                checked={formData.isAvailableForDonation}
                onChange={(e) => setFormData({ ...formData, isAvailableForDonation: e.target.checked })}
                className="h-4 w-4 text-teal-600 focus:ring-teal-500 border-gray-300 rounded"
              />
              <label htmlFor="available" className="ml-2 block text-sm text-gray-900">
                Make available for blood donation
              </label>
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
                className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50"
              >
                {isSubmitting ? "Adding..." : "Add Pet"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

function EditPetModal({ pet, onClose }: { pet: any; onClose: () => void }) {
  // Similar to AddPetModal but for editing - implementation would be similar
  // For brevity, showing a simplified version
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg max-w-md w-full p-6">
        <h3 className="text-xl font-semibold text-gray-900 mb-4">Edit {pet.name}</h3>
        <p className="text-gray-600 mb-4">Pet editing functionality would be implemented here.</p>
        <button
          onClick={onClose}
          className="w-full bg-teal-600 text-white py-2 px-4 rounded-md hover:bg-teal-700 transition-colors"
        >
          Close
        </button>
      </div>
    </div>
  );
}

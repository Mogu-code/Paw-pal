
import { useState } from "react";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export default function EmergencyButton() {
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const user = useQuery(api.users.getCurrentUser);

  if (user?.role !== "owner") {
    return null; // Only show for pet owners
  }

  return (
    <>
      <button
        onClick={() => setShowEmergencyModal(true)}
        className="w-full bg-gradient-to-r from-orange-500 to-red-500 text-white py-4 px-6 rounded-lg hover:from-orange-600 hover:to-red-600 transition-all transform hover:scale-105 shadow-lg font-bold text-lg"
      >
        🚨 EMERGENCY
        <div className="text-sm font-normal opacity-90">Blood Needed Now</div>
      </button>

      {showEmergencyModal && (
        <EmergencyModal onClose={() => setShowEmergencyModal(false)} />
      )}
    </>
  );
}

function EmergencyModal({ onClose }: { onClose: () => void }) {
  const [selectedPet, setSelectedPet] = useState("");
  const [formData, setFormData] = useState({
    requiredAmount: "",
    contactInfo: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const pets = useQuery(api.pets.getUserPets);
  const donors = useQuery(api.pets.searchDonorPets, {});
  const createRequest = useMutation(api.requests.createRequest);

  const handleEmergencyRequest = async () => {
    if (!selectedPet || !formData.requiredAmount || !formData.contactInfo) {
      toast.error("Please fill in all required fields");
      return;
    }

    setIsSubmitting(true);
    try {
      // Find compatible donors for the selected pet
      const
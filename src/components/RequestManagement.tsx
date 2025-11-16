import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export default function RequestManagement() {
  const requests = useQuery(api.requests.getUserRequests);
  const updateRequestStatus = useMutation(api.requests.updateRequestStatus);

  const handleStatusUpdate = async (requestId: string, status: "accepted" | "rejected" | "completed") => {
    try {
      await updateRequestStatus({ requestId: requestId as any, status });
      toast.success(`Request ${status} successfully!`);
    } catch (error) {
      toast.error(`Failed to ${status} request`);
      console.error(error);
    }
  };

  const sentRequests = requests?.filter(r => r.type === "sent") || [];
  const receivedRequests = requests?.filter(r => r.type === "received") || [];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">Request Management</h2>
        <p className="text-gray-600">Manage your blood donation requests</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Sent Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Requests I've Sent ({sentRequests.length})
          </h3>
          <div className="space-y-4">
            {sentRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No requests sent yet</p>
            ) : (
              sentRequests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  type="sent"
                  onStatusUpdate={handleStatusUpdate}
                />
              ))
            )}
          </div>
        </div>

        {/* Received Requests */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Requests I've Received ({receivedRequests.length})
          </h3>
          <div className="space-y-4">
            {receivedRequests.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No requests received yet</p>
            ) : (
              receivedRequests.map((request) => (
                <RequestCard
                  key={request._id}
                  request={request}
                  type="received"
                  onStatusUpdate={handleStatusUpdate}
                />
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function RequestCard({ 
  request, 
  type, 
  onStatusUpdate 
}: { 
  request: any; 
  type: "sent" | "received";
  onStatusUpdate: (requestId: string, status: "accepted" | "rejected" | "completed") => void;
}) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending": return "bg-yellow-100 text-yellow-700";
      case "accepted": return "bg-green-100 text-green-700";
      case "rejected": return "bg-red-100 text-red-700";
      case "completed": return "bg-blue-100 text-blue-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const formatDate = (timestamp: number) => {
    return new Date(timestamp).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4">
      <div className="flex justify-between items-start mb-3">
        <div>
          <h4 className="font-semibold text-gray-900">
            {type === "sent" ? "Request to" : "Request from"} {request.otherPartyName}
          </h4>
          <p className="text-sm text-gray-600">Pet: {request.petName}</p>
        </div>
        <div className="flex items-center space-x-2">
          {request.urgency === "emergency" && (
            <span className="bg-orange-100 text-orange-700 px-2 py-1 rounded-full text-xs font-medium">
              🚨 Emergency
            </span>
          )}
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
            {request.status}
          </span>
        </div>
      </div>

      <div className="space-y-2 text-sm text-gray-600 mb-4">
        <p><span className="font-medium">Required Amount:</span> {request.requiredAmount}</p>
        <p><span className="font-medium">Contact:</span> {request.contactInfo}</p>
        {request.message && (
          <p><span className="font-medium">Message:</span> {request.message}</p>
        )}
        <p><span className="font-medium">Requested:</span> {formatDate(request._creationTime)}</p>
      </div>

      {/* Action buttons for received requests */}
      {type === "received" && request.status === "pending" && (
        <div className="flex space-x-2">
          <button
            onClick={() => onStatusUpdate(request._id, "accepted")}
            className="flex-1 bg-green-600 text-white py-2 px-3 rounded-md hover:bg-green-700 transition-colors text-sm font-medium"
          >
            Accept
          </button>
          <button
            onClick={() => onStatusUpdate(request._id, "rejected")}
            className="flex-1 bg-red-600 text-white py-2 px-3 rounded-md hover:bg-red-700 transition-colors text-sm font-medium"
          >
            Reject
          </button>
        </div>
      )}

      {/* Mark as completed button for accepted requests */}
      {type === "received" && request.status === "accepted" && (
        <button
          onClick={() => onStatusUpdate(request._id, "completed")}
          className="w-full bg-blue-600 text-white py-2 px-3 rounded-md hover:bg-blue-700 transition-colors text-sm font-medium"
        >
          Mark as Completed
        </button>
      )}

      {/* Contact info for sent requests */}
      {type === "sent" && request.status === "accepted" && request.otherPartyPhone && (
        <div className="bg-green-50 border border-green-200 rounded-md p-3">
          <p className="text-sm text-green-700">
            <span className="font-medium">Great news!</span> Your request was accepted. 
            Contact the donor at: <span className="font-medium">{request.otherPartyPhone}</span>
          </p>
        </div>
      )}
    </div>
  );
}

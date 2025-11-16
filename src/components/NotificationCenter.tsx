import { useQuery, useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";
import { toast } from "sonner";

export default function NotificationCenter() {
  const notifications = useQuery(api.notifications.getUserNotifications);
  const markAsRead = useMutation(api.notifications.markNotificationAsRead);
  const markAllAsRead = useMutation(api.notifications.markAllNotificationsAsRead);

  const handleMarkAsRead = async (notificationId: string) => {
    try {
      await markAsRead({ notificationId: notificationId as any });
    } catch (error) {
      toast.error("Failed to mark notification as read");
    }
  };

  const handleMarkAllAsRead = async () => {
    try {
      await markAllAsRead({});
      toast.success("All notifications marked as read");
    } catch (error) {
      toast.error("Failed to mark all notifications as read");
    }
  };

  const unreadNotifications = notifications?.filter(n => !n.isRead) || [];
  const readNotifications = notifications?.filter(n => n.isRead) || [];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Notifications</h2>
          <p className="text-gray-600">Stay updated on your blood donation activities</p>
        </div>
        {unreadNotifications.length > 0 && (
          <button
            onClick={handleMarkAllAsRead}
            className="bg-teal-600 text-white px-4 py-2 rounded-md hover:bg-teal-700 transition-colors text-sm"
          >
            Mark All as Read
          </button>
        )}
      </div>

      {notifications && notifications.length === 0 && (
        <div className="bg-white rounded-lg shadow-sm p-8 text-center">
          <div className="text-6xl mb-4">🔔</div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">No notifications yet</h3>
          <p className="text-gray-600">You'll see notifications here when there's activity on your account</p>
        </div>
      )}

      {/* Unread Notifications */}
      {unreadNotifications.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Unread ({unreadNotifications.length})
          </h3>
          <div className="space-y-3">
            {unreadNotifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        </div>
      )}

      {/* Read Notifications */}
      {readNotifications.length > 0 && (
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">
            Read ({readNotifications.length})
          </h3>
          <div className="space-y-3">
            {readNotifications.map((notification) => (
              <NotificationCard
                key={notification._id}
                notification={notification}
                onMarkAsRead={handleMarkAsRead}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function NotificationCard({ 
  notification, 
  onMarkAsRead 
}: { 
  notification: any; 
  onMarkAsRead: (id: string) => void;
}) {
  const getTypeIcon = (type: string) => {
    switch (type) {
      case "request": return "📋";
      case "emergency": return "🚨";
      case "accepted": return "✅";
      case "rejected": return "❌";
      default: return "🔔";
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "emergency": return "border-l-orange-500 bg-orange-50";
      case "accepted": return "border-l-green-500 bg-green-50";
      case "rejected": return "border-l-red-500 bg-red-50";
      default: return "border-l-teal-500 bg-teal-50";
    }
  };

  const formatDate = (timestamp: number) => {
    const now = Date.now();
    const diff = now - timestamp;
    const minutes = Math.floor(diff / (1000 * 60));
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));

    if (minutes < 1) return "Just now";
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    
    return new Date(timestamp).toLocaleDateString();
  };

  return (
    <div
      className={`border-l-4 p-4 rounded-r-lg transition-colors ${
        notification.isRead 
          ? "border-l-gray-300 bg-gray-50" 
          : getTypeColor(notification.type)
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-start space-x-3 flex-1">
          <span className="text-xl">{getTypeIcon(notification.type)}</span>
          <div className="flex-1">
            <h4 className="font-semibold text-gray-900">{notification.title}</h4>
            <p className="text-gray-600 text-sm mt-1">{notification.message}</p>
            <p className="text-gray-400 text-xs mt-2">{formatDate(notification._creationTime)}</p>
          </div>
        </div>
        
        {!notification.isRead && (
          <button
            onClick={() => onMarkAsRead(notification._id)}
            className="text-teal-600 hover:text-teal-700 text-sm font-medium ml-4"
          >
            Mark as read
          </button>
        )}
      </div>
    </div>
  );
}

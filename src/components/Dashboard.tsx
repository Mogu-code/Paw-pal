import { useState } from "react";
import { useQuery } from "convex/react";
import { api } from "../../convex/_generated/api";
import { SignOutButton } from "../SignOutButton";
import PetManagement from "./PetManagement";
import DonorSearch from "./DonorSearch";
import RequestManagement from "./RequestManagement";
import ClinicsMap from "./ClinicsMap";
import NotificationCenter from "./NotificationCenter";
import EmergencyButton from "./EmergencyButton";

interface User {
  _id: string;
  name: string;
  email: string;
  role: "owner" | "clinic";
  points: number;
  city?: string;
}

interface DashboardProps {
  user: User;
}

export default function Dashboard({ user }: DashboardProps) {
  const [activeTab, setActiveTab] = useState("dashboard");
  const notifications = useQuery(api.notifications.getUserNotifications);
  const unreadCount = notifications?.filter(n => !n.isRead).length || 0;

  const tabs = [
    { id: "dashboard", label: "Dashboard", icon: "🏠" },
    { id: "pets", label: "My Pets", icon: "🐕" },
    { id: "search", label: "Find Donors", icon: "🔍" },
    { id: "requests", label: "Requests", icon: "📋" },
    { id: "clinics", label: "Vet Clinics", icon: "🏥" },
    { id: "notifications", label: "Notifications", icon: "🔔", badge: unreadCount },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-orange-500 rounded-full"></div>
              <h1 className="text-xl font-bold text-gray-900">PetBlood Connect</h1>
            </div>
            <div className="flex items-center space-x-4">
              <div className="text-right">
                <div className="text-sm font-medium text-gray-900">{user.name}</div>
                <div className="text-xs text-gray-500">
                  {user.role === "owner" ? "Pet Owner" : "Vet Clinic"} • {user.points} points
                </div>
              </div>
              <SignOutButton />
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar */}
          <div className="lg:w-64">
            <nav className="bg-white rounded-lg shadow-sm p-4">
              <div className="space-y-2">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center justify-between px-3 py-2 rounded-md text-left transition-colors ${
                      activeTab === tab.id
                        ? "bg-teal-100 text-teal-700 font-medium"
                        : "text-gray-600 hover:bg-gray-100"
                    }`}
                  >
                    <div className="flex items-center space-x-3">
                      <span>{tab.icon}</span>
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge && tab.badge > 0 && (
                      <span className="bg-orange-500 text-white text-xs rounded-full px-2 py-1 min-w-[20px] text-center">
                        {tab.badge}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </nav>

            {/* Emergency Button */}
            <div className="mt-4">
              <EmergencyButton />
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {activeTab === "dashboard" && <DashboardOverview user={user} />}
            {activeTab === "pets" && <PetManagement />}
            {activeTab === "search" && <DonorSearch />}
            {activeTab === "requests" && <RequestManagement />}
            {activeTab === "clinics" && <ClinicsMap />}
            {activeTab === "notifications" && <NotificationCenter />}
          </div>
        </div>
      </div>
    </div>
  );
}

function DashboardOverview({ user }: { user: User }) {
  const pets = useQuery(api.pets.getUserPets);
  const requests = useQuery(api.requests.getUserRequests);

  const stats = [
    {
      label: "My Pets",
      value: pets?.length || 0,
      icon: "🐕",
      color: "bg-teal-100 text-teal-700",
    },
    {
      label: "Active Requests",
      value: requests?.filter(r => r.status === "pending").length || 0,
      icon: "📋",
      color: "bg-orange-100 text-orange-700",
    },
    {
      label: "Points Earned",
      value: user.points,
      icon: "⭐",
      color: "bg-yellow-100 text-yellow-700",
    },
    {
      label: "Donations Made",
      value: requests?.filter(r => r.status === "completed" && r.type === "received").length || 0,
      icon: "❤️",
      color: "bg-red-100 text-red-700",
    },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-2">
          Welcome back, {user.name}! 👋
        </h2>
        <p className="text-gray-600">
          Here's what's happening with your pet blood donation activities.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-lg shadow-sm p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.color}`}>
                <span className="text-xl">{stat.icon}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-3">
            {requests?.slice(0, 5).map((request) => (
              <div key={request._id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <p className="font-medium text-gray-900">
                    {request.type === "sent" ? "Requested from" : "Request for"} {request.petName}
                  </p>
                  <p className="text-sm text-gray-500">
                    {request.type === "sent" ? "To" : "From"} {request.otherPartyName}
                  </p>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  request.status === "pending" ? "bg-yellow-100 text-yellow-700" :
                  request.status === "accepted" ? "bg-green-100 text-green-700" :
                  request.status === "completed" ? "bg-blue-100 text-blue-700" :
                  "bg-red-100 text-red-700"
                }`}>
                  {request.status}
                </span>
              </div>
            ))}
            {(!requests || requests.length === 0) && (
              <p className="text-gray-500 text-center py-4">No recent activity</p>
            )}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="space-y-3">
            <button className="w-full bg-teal-600 text-white py-3 px-4 rounded-md hover:bg-teal-700 transition-colors">
              🐕 Add New Pet
            </button>
            <button className="w-full bg-orange-600 text-white py-3 px-4 rounded-md hover:bg-orange-700 transition-colors">
              🔍 Find Blood Donors
            </button>
            <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors">
              🏥 Find Nearby Clinics
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

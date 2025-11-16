import { Authenticated, Unauthenticated, useQuery } from "convex/react";
import { api } from "../convex/_generated/api";
import { SignInForm } from "./SignInForm";
import { SignOutButton } from "./SignOutButton";
import { Toaster } from "sonner";
import { useState } from "react";
import Dashboard from "./components/Dashboard";
import ProfileSetup from "./components/ProfileSetup";

export default function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-50 to-orange-50">
      <Authenticated>
        <AuthenticatedApp />
      </Authenticated>
      <Unauthenticated>
        <UnauthenticatedApp />
      </Unauthenticated>
      <Toaster position="top-right" />
    </div>
  );
}

function AuthenticatedApp() {
  const user = useQuery(api.users.getCurrentUser);

  if (user === undefined) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-teal-600"></div>
      </div>
    );
  }

  if (!user || !user.role) {
    return <ProfileSetup />;
  }

  return <Dashboard user={user} />;
}

function UnauthenticatedApp() {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-teal-600 to-orange-500 rounded-full"></div>
              <h1 className="text-xl font-bold text-gray-900">PetBlood Connect</h1>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 flex items-center justify-center p-8">
        <div className="max-w-md w-full">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Save Lives, One Donation at a Time
            </h2>
            <p className="text-lg text-gray-600">
              Connect pet owners with life-saving blood donors in your community
            </p>
          </div>

          <div className="bg-white rounded-lg shadow-lg p-6">
            <SignInForm />
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🐕</span>
              </div>
              <h3 className="font-semibold text-gray-900">Register Pets</h3>
              <p className="text-sm text-gray-600">Add your pet's profile and donation availability</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🩸</span>
              </div>
              <h3 className="font-semibold text-gray-900">Find Donors</h3>
              <p className="text-sm text-gray-600">Search for compatible blood donors nearby</p>
            </div>
            <div className="bg-white rounded-lg p-4 shadow-sm">
              <div className="w-12 h-12 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-2xl">🏥</span>
              </div>
              <h3 className="font-semibold text-gray-900">Connect</h3>
              <p className="text-sm text-gray-600">Get connected with vet clinics and donors</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

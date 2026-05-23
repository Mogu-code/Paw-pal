# Pet Blood Donation Platform

> *“Every Paw Deserves a Chance.”*

PetBloodConnect is an AI-powered web platform designed to connect pet owners in urgent need of blood transfusions with nearby eligible donor pets through a trusted, vet-supported network.

The platform aims to solve the lack of structured pet blood donation systems in India by enabling:
- Faster donor matching
- Emergency blood requests
- Veterinary collaboration
- Community awareness & engagement

---

# 🌟 Problem Statement

Thousands of pets lose their lives every year because blood is not available on time during emergencies such as:
- Accidents
- Surgeries
- Anemia
- Poisoning
- Severe infections

Unlike humans, there is no centralized and accessible blood donation ecosystem for pets in India.

PetBloodConnect aims to bridge this gap using technology, AI-powered donor matching, and veterinary partnerships.

---

# 💡 Solution

PetBloodConnect provides a platform where:

- Pet owners can register healthy pets as blood donors
- Users can search for compatible blood donors nearby
- Veterinary clinics can verify donor eligibility
- Emergency requests can instantly notify nearby donors
- AI helps match donors based on blood group, species, and location

---

# ✨ Features

## 🩸 Blood Donor Matching
- Search donors by:
  - Species (Dog/Cat)
  - Blood Group
  - Location
- AI-powered compatibility matching
- Emergency request system

---

## 🐶 Pet Registration
Users can create pet profiles with:
- Name
- Species
- Breed
- Blood Group
- Weight & Age
- Vaccination Status
- Medical Information

---

## 🏥 Vet Clinic Integration
- Nearby veterinary clinics displayed using maps
- Verified clinics for trusted donations
- Appointment booking support

---

## 🚨 Emergency Mode
- One-click emergency blood request
- Real-time alerts sent to nearby eligible donors

---

## 🎁 Rewards & Benefits
- Loyalty points for blood donors
- Discounts/free checkups through partner clinics
- Community recognition badges

---

## 📚 Pet Care Resources
- Emergency guidance
- Pet healthcare awareness
- Vaccination and wellness information

---

# 🤖 AI Integration

The platform uses AI for:
- Smart donor-recipient matching
- Emergency prioritization
- Fake/anomaly profile detection
- Personalized alerts and recommendations

---

# 🛠️ Tech Stack

## Frontend
- React.js
- Tailwind CSS

## Backend
- Node.js + Express
- Convex / Firebase

## Database
- MongoDB / Convex Database

## AI / ML
- Python (Flask/FastAPI)

## APIs & Services
- Google Maps API
- Firebase Authentication
- Push Notifications

---

# 🎨 Design Philosophy

- Clean and minimal UI
- Mobile-friendly responsive design
- Fast and accessible during emergencies
- Chic, non-congested layouts with smooth animations

## Theme Colors
- Deep Teal → Trust & Healthcare
- Warm Orange → Urgency & Action

---

# 🌍 SDG Alignment

This project aligns with:
- **SDG 3** → Good Health & Well-being
- **SDG 11** → Sustainable Cities & Communities
- **SDG 15** → Life on Land

---

# 📈 Future Scope

- Mobile application support
- Real-time emergency broadcasts
- Pet digital health records
- Community forums
- NGO & shelter integration
- Advanced predictive AI systems

---
  
This is a project built with [Chef](https://chef.convex.dev) using [Convex](https://convex.dev) as its backend.
 You can find docs about Chef with useful information like how to deploy to production [here](https://docs.convex.dev/chef).
  
This project is connected to the Convex deployment named [`grateful-parrot-800`](https://dashboard.convex.dev/d/grateful-parrot-800).
  
## Project structure
  
The frontend code is in the `app` directory and is built with [Vite](https://vitejs.dev/).
  
The backend code is in the `convex` directory.
  
`npm run dev` will start the frontend and backend servers.

## App authentication

Chef apps use [Convex Auth](https://auth.convex.dev/) with Anonymous auth for easy sign in. You may wish to change this before deploying your app.

## Developing and deploying your app

Check out the [Convex docs](https://docs.convex.dev/) for more information on how to develop with Convex.
* If you're new to Convex, the [Overview](https://docs.convex.dev/understanding/) is a good place to start
* Check out the [Hosting and Deployment](https://docs.convex.dev/production/) docs for how to deploy your app
* Read the [Best Practices](https://docs.convex.dev/understanding/best-practices/) guide for tips on how to improve you app further

## HTTP API

User-defined http routes are defined in the `convex/router.ts` file. We split these routes into a separate file from `convex/http.ts` to allow us to prevent the LLM from modifying the authentication routes.

import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  users: defineTable({
    name: v.string(),
    email: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("owner"), v.literal("clinic")),
    points: v.number(),
    city: v.optional(v.string()),
  }).index("by_email", ["email"]),

  pets: defineTable({
    ownerId: v.id("users"),
    name: v.string(),
    species: v.union(v.literal("dog"), v.literal("cat")),
    breed: v.string(),
    age: v.number(),
    weight: v.number(),
    bloodGroup: v.string(),
    city: v.string(),
    healthCondition: v.string(),
    vaccinationStatus: v.union(v.literal("up-to-date"), v.literal("overdue"), v.literal("unknown")),
    photo: v.optional(v.id("_storage")),
    isAvailableForDonation: v.boolean(),
  })
    .index("by_owner", ["ownerId"])
    .index("by_species_blood_city", ["species", "bloodGroup", "city"])
    .searchIndex("search_pets", {
      searchField: "name",
      filterFields: ["species", "bloodGroup", "city", "isAvailableForDonation"],
    }),

  requests: defineTable({
    requesterId: v.id("users"),
    donorPetId: v.id("pets"),
    donorOwnerId: v.id("users"),
    status: v.union(v.literal("pending"), v.literal("accepted"), v.literal("rejected"), v.literal("completed")),
    urgency: v.union(v.literal("normal"), v.literal("emergency")),
    message: v.optional(v.string()),
    requiredAmount: v.string(),
    contactInfo: v.string(),
  })
    .index("by_requester", ["requesterId"])
    .index("by_donor_owner", ["donorOwnerId"])
    .index("by_status", ["status"]),

  clinics: defineTable({
    name: v.string(),
    city: v.string(),
    address: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    services: v.array(v.string()),
    lat: v.number(),
    lng: v.number(),
    operatingHours: v.string(),
  })
    .index("by_city", ["city"])
    .searchIndex("search_clinics", {
      searchField: "name",
      filterFields: ["city"],
    }),

  notifications: defineTable({
    userId: v.id("users"),
    type: v.union(v.literal("request"), v.literal("emergency"), v.literal("accepted"), v.literal("rejected")),
    title: v.string(),
    message: v.string(),
    isRead: v.boolean(),
    relatedRequestId: v.optional(v.id("requests")),
  }).index("by_user", ["userId"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});

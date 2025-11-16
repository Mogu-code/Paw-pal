import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getUserPets = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const pets = await ctx.db
      .query("pets")
      .withIndex("by_owner", (q) => q.eq("ownerId", userId))
      .collect();

    return Promise.all(
      pets.map(async (pet) => ({
        ...pet,
        photoUrl: pet.photo ? await ctx.storage.getUrl(pet.photo) : null,
      }))
    );
  },
});

export const createPet = mutation({
  args: {
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
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const petId = await ctx.db.insert("pets", {
      ownerId: userId,
      ...args,
    });

    return petId;
  },
});

export const updatePet = mutation({
  args: {
    petId: v.id("pets"),
    name: v.optional(v.string()),
    breed: v.optional(v.string()),
    age: v.optional(v.number()),
    weight: v.optional(v.number()),
    bloodGroup: v.optional(v.string()),
    city: v.optional(v.string()),
    healthCondition: v.optional(v.string()),
    vaccinationStatus: v.optional(v.union(v.literal("up-to-date"), v.literal("overdue"), v.literal("unknown"))),
    photo: v.optional(v.id("_storage")),
    isAvailableForDonation: v.optional(v.boolean()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const pet = await ctx.db.get(args.petId);
    if (!pet || pet.ownerId !== userId) {
      throw new Error("Pet not found or not owned by user");
    }

    const { petId, ...updates } = args;
    const filteredUpdates = Object.fromEntries(
      Object.entries(updates).filter(([_, value]) => value !== undefined)
    );

    await ctx.db.patch(petId, filteredUpdates);
    return petId;
  },
});

export const searchDonorPets = query({
  args: {
    species: v.optional(v.union(v.literal("dog"), v.literal("cat"))),
    bloodGroup: v.optional(v.string()),
    city: v.optional(v.string()),
    searchTerm: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let pets;

    if (args.searchTerm) {
      pets = await ctx.db
        .query("pets")
        .withSearchIndex("search_pets", (q) => {
          let query = q.search("name", args.searchTerm);
          if (args.species) query = query.eq("species", args.species);
          if (args.bloodGroup) query = query.eq("bloodGroup", args.bloodGroup);
          if (args.city) query = query.eq("city", args.city);
          return query.eq("isAvailableForDonation", true);
        })
        .collect();
    } else {
      pets = await ctx.db
        .query("pets")
        .withIndex("by_species_blood_city", (q) => {
          let query = q;
          if (args.species) query = query.eq("species", args.species);
          if (args.bloodGroup) query = query.eq("bloodGroup", args.bloodGroup);
          if (args.city) query = query.eq("city", args.city);
          return query;
        })
        .filter((q) => q.eq(q.field("isAvailableForDonation"), true))
        .collect();
    }

    return Promise.all(
      pets.map(async (pet) => {
        const owner = await ctx.db.get(pet.ownerId);
        return {
          ...pet,
          photoUrl: pet.photo ? await ctx.storage.getUrl(pet.photo) : null,
          ownerName: owner?.name || "Unknown",
          ownerPhone: owner?.phone,
        };
      })
    );
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    return await ctx.storage.generateUploadUrl();
  },
});

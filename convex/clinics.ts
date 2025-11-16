import { v } from "convex/values";
import { query, mutation } from "./_generated/server";

export const getClinics = query({
  args: {
    city: v.optional(v.string()),
    searchTerm: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    if (args.searchTerm) {
      return await ctx.db
        .query("clinics")
        .withSearchIndex("search_clinics", (q) => {
          let query = q.search("name", args.searchTerm);
          if (args.city) query = query.eq("city", args.city);
          return query;
        })
        .collect();
    }

    if (args.city) {
      return await ctx.db
        .query("clinics")
        .withIndex("by_city", (q) => q.eq("city", args.city))
        .collect();
    }

    return await ctx.db.query("clinics").collect();
  },
});

export const addClinic = mutation({
  args: {
    name: v.string(),
    city: v.string(),
    address: v.string(),
    phone: v.string(),
    email: v.optional(v.string()),
    services: v.array(v.string()),
    lat: v.number(),
    lng: v.number(),
    operatingHours: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db.insert("clinics", args);
  },
});

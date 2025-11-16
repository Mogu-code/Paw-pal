import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";

export const getCurrentUser = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return null;
    
    const user = await ctx.db.get(userId);
    return user;
  },
});

export const createUserProfile = mutation({
  args: {
    name: v.string(),
    phone: v.optional(v.string()),
    role: v.union(v.literal("owner"), v.literal("clinic")),
    city: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const existingUser = await ctx.db.get(userId);
    if (existingUser) {
      // Update existing user
      await ctx.db.patch(userId, {
        name: args.name,
        phone: args.phone,
        role: args.role,
        city: args.city,
      });
    } else {
      // This shouldn't happen with Convex Auth, but just in case
      throw new Error("User not found");
    }
    
    return userId;
  },
});

export const updateUserProfile = mutation({
  args: {
    name: v.optional(v.string()),
    phone: v.optional(v.string()),
    city: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const updates: any = {};
    if (args.name !== undefined) updates.name = args.name;
    if (args.phone !== undefined) updates.phone = args.phone;
    if (args.city !== undefined) updates.city = args.city;

    await ctx.db.patch(userId, updates);
    return userId;
  },
});

export const awardPoints = mutation({
  args: {
    userId: v.id("users"),
    points: v.number(),
  },
  handler: async (ctx, args) => {
    const user = await ctx.db.get(args.userId);
    if (!user) throw new Error("User not found");

    await ctx.db.patch(args.userId, {
      points: user.points + args.points,
    });
  },
});

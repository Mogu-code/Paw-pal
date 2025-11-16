import { v } from "convex/values";
import { query, mutation } from "./_generated/server";
import { getAuthUserId } from "@convex-dev/auth/server";
import { internal } from "./_generated/api";

export const createRequest = mutation({
  args: {
    donorPetId: v.id("pets"),
    urgency: v.union(v.literal("normal"), v.literal("emergency")),
    message: v.optional(v.string()),
    requiredAmount: v.string(),
    contactInfo: v.string(),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const pet = await ctx.db.get(args.donorPetId);
    if (!pet) throw new Error("Pet not found");

    const requestId = await ctx.db.insert("requests", {
      requesterId: userId,
      donorPetId: args.donorPetId,
      donorOwnerId: pet.ownerId,
      status: "pending",
      urgency: args.urgency,
      message: args.message,
      requiredAmount: args.requiredAmount,
      contactInfo: args.contactInfo,
    });

    // Create notification for donor owner
    const requester = await ctx.db.get(userId);
    await ctx.db.insert("notifications", {
      userId: pet.ownerId,
      type: args.urgency === "emergency" ? "emergency" : "request",
      title: args.urgency === "emergency" ? "🚨 Emergency Blood Request" : "Blood Donation Request",
      message: `${requester?.name || "Someone"} has requested blood from your pet ${pet.name}`,
      isRead: false,
      relatedRequestId: requestId,
    });

    return requestId;
  },
});

export const updateRequestStatus = mutation({
  args: {
    requestId: v.id("requests"),
    status: v.union(v.literal("accepted"), v.literal("rejected"), v.literal("completed")),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) throw new Error("Not authenticated");

    const request = await ctx.db.get(args.requestId);
    if (!request) throw new Error("Request not found");

    if (request.donorOwnerId !== userId) {
      throw new Error("Not authorized to update this request");
    }

    await ctx.db.patch(args.requestId, { status: args.status });

    // Create notification for requester
    const donorOwner = await ctx.db.get(request.donorOwnerId);
    const pet = await ctx.db.get(request.donorPetId);
    
    await ctx.db.insert("notifications", {
      userId: request.requesterId,
      type: args.status,
      title: args.status === "accepted" ? "Request Accepted! 🎉" : "Request Update",
      message: args.status === "accepted" 
        ? `${donorOwner?.name || "The owner"} accepted your request for ${pet?.name || "their pet"}`
        : `Your request for ${pet?.name || "the pet"} was ${args.status}`,
      isRead: false,
      relatedRequestId: args.requestId,
    });

    // Award points for completed donations
    if (args.status === "completed") {
      await ctx.runMutation(internal.users.awardPoints, {
        userId: request.donorOwnerId,
        points: 50,
      });
    }

    return args.requestId;
  },
});

export const getUserRequests = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (!userId) return [];

    const sentRequests = await ctx.db
      .query("requests")
      .withIndex("by_requester", (q) => q.eq("requesterId", userId))
      .collect();

    const receivedRequests = await ctx.db
      .query("requests")
      .withIndex("by_donor_owner", (q) => q.eq("donorOwnerId", userId))
      .collect();

    const enrichSentRequests = await Promise.all(
      sentRequests.map(async (request) => {
        const pet = await ctx.db.get(request.donorPetId);
        const donorOwner = await ctx.db.get(request.donorOwnerId);
        return {
          ...request,
          type: "sent" as const,
          petName: pet?.name || "Unknown",
          otherPartyName: donorOwner?.name || "Unknown",
          otherPartyPhone: donorOwner?.phone,
        };
      })
    );

    const enrichReceivedRequests = await Promise.all(
      receivedRequests.map(async (request) => {
        const pet = await ctx.db.get(request.donorPetId);
        const requester = await ctx.db.get(request.requesterId);
        return {
          ...request,
          type: "received" as const,
          petName: pet?.name || "Unknown",
          otherPartyName: requester?.name || "Unknown",
          otherPartyPhone: requester?.phone,
        };
      })
    );

    return [...enrichSentRequests, ...enrichReceivedRequests].sort(
      (a, b) => b._creationTime - a._creationTime
    );
  },
});

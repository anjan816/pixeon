// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// export const store = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Called storeUser without authentication present");
//     }

//     // Check if we've already stored this identity before
//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (user !== null) {
//       // If we've seen this identity before but the name has changed, patch the value.
//       if (user.name !== identity.name) {
//         await ctx.db.patch(user._id, { name: identity.name });
//       }
//       return user._id;
//     }

//     // If it's a new identity, create a new `User`.
//     return await ctx.db.insert("users", {
//       name: identity.name ?? "Anonymous",
//       //name: v.optional(v.string()),
//       tokenIdentifier: identity.tokenIdentifier,
//       email: identity.email,
//       imageUrl: identity.pictureUrl,
//       plan: "free", // Default plan
//       projectsUsed: 0, // Initialize usage counters
//       exportsThisMonth: 0,
//       createdAt: Date.now(),
//       lastActiveAt: Date.now(),
//     });
//   },
// });

// export const getCurrentUser = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) {
//       throw new Error("Not authenticated");
//     }

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (!user) {
//       throw new Error("User not found");
//     }

//     return user;
//   },
// });

// // Upgrade user to Pro
// export const upgradeToPro = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (!user) throw new Error("User not found");

//     await ctx.db.patch(user._id, {
//       plan: "pro",
//       lastActiveAt: Date.now(),
//       // Optional: add expiry if you want subscription logic
//       planExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days
//     });

//     return { success: true, message: "User upgraded to Pro" };
//   },
// });

// // Downgrade user back to Free (optional)
// export const downgradeToFree = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (!user) throw new Error("User not found");

//     await ctx.db.patch(user._id, {
//       plan: "free",
//       lastActiveAt: Date.now(),
//     });

//     return { success: true, message: "User downgraded to Free" };
//   },
// });











// import { mutation, query } from "./_generated/server";
// import { v } from "convex/values";

// // Store or update user
// export const store = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (user) {
//       if (user.name !== identity.name) {
//         await ctx.db.patch(user._id, { name: identity.name });
//       }
//       return user._id;
//     }

//     return await ctx.db.insert("users", {
//       name: identity.name ?? "Anonymous",
//       tokenIdentifier: identity.tokenIdentifier,
//       email: identity.email,
//       imageUrl: identity.pictureUrl,
//       plan: "free",
//       projectsUsed: 0,
//       exportsThisMonth: 0,
//       createdAt: Date.now(),
//       lastActiveAt: Date.now(),
//     });
//   },
// });

// // Get current user
// export const getCurrentUser = query({
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (!user) throw new Error("User not found");
//     return user;
//   },
// });

// // Upgrade user to Pro
// export const upgradeToPro = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (!user) throw new Error("User not found");

//     await ctx.db.patch(user._id, {
//       plan: "pro",
//       planExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days expiry
//       lastActiveAt: Date.now(),
//     });

//     return { success: true, message: "User upgraded to Pro" };
//   },
// });

// // Downgrade to Free
// export const downgradeToFree = mutation({
//   args: {},
//   handler: async (ctx) => {
//     const identity = await ctx.auth.getUserIdentity();
//     if (!identity) throw new Error("Not authenticated");

//     const user = await ctx.db
//       .query("users")
//       .withIndex("by_token", (q) =>
//         q.eq("tokenIdentifier", identity.tokenIdentifier)
//       )
//       .unique();

//     if (!user) throw new Error("User not found");

//     await ctx.db.patch(user._id, {
//       plan: "free",
//       planExpiry: null,
//       lastActiveAt: Date.now(),
//     });

//     return { success: true, message: "User downgraded to Free" };
//   },
// });



















import { mutation, query } from "./_generated/server";
import { v } from "convex/values";

// Store or update user
export const store = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    // Check if user already exists in DB
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (user) {
      if (user.name !== identity.name) {
        await ctx.db.patch(user._id, { name: identity.name });
      }
      return user._id;
    }

    // Determine initial plan dynamically
    let initialPlan = "free"; // default
    let planExpiry = null;

    // Example: Check if user already purchased Pro (replace with your actual check)
    // For instance, using identity.subscriptionPlanId from Clerk
    if (identity.subscriptionPlanId === "cplan_316Pol6NP96JSJ3pxEKN51seQVp") {
      initialPlan = "pro";
      planExpiry = Date.now() + 30 * 24 * 60 * 60 * 1000; // 30 days expiry
    }

    // Insert new user with dynamic plan
    return await ctx.db.insert("users", {
      name: identity.name ?? "Anonymous",
      tokenIdentifier: identity.tokenIdentifier,
      email: identity.email ?? "unknown@example.com",
      imageUrl: identity.pictureUrl ?? "undefined",
      plan: initialPlan,
      planExpiry: undefined,
      projectsUsed: 0,
      exportsThisMonth: 0,
      createdAt: Date.now(),
      lastActiveAt: Date.now(),
    });
  },
});

// Get current user
export const getCurrentUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("User not found");
    return user;
  },
});

// Upgrade user to Pro
export const upgradeToPro = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      plan: "pro",
      planExpiry: Date.now() + 30 * 24 * 60 * 60 * 1000, // 30 days expiry
      lastActiveAt: Date.now(),
    });

    return { success: true, message: "User upgraded to Pro" };
  },
});

// Downgrade to Free
export const downgradeToFree = mutation({
  args: {},
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity();
    if (!identity) throw new Error("Not authenticated");

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", identity.tokenIdentifier)
      )
      .unique();

    if (!user) throw new Error("User not found");

    await ctx.db.patch(user._id, {
      plan: "free",
      planExpiry: null,
      lastActiveAt: Date.now(),
    });

    return { success: true, message: "User downgraded to Free" };
  },
});

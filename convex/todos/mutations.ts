import { v } from "convex/values";

import { mutation } from "../_generated/server";

export const create = mutation({
  args: { text: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.insert("todos", { text: args.text, completed: false });
  },
});

export const toggle = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    const todo = await ctx.db.get("todos", args.id);
    if (!todo) throw new Error("Todo not found");
    await ctx.db.patch("todos", args.id, { completed: !todo.completed });
  },
});

export const remove = mutation({
  args: { id: v.id("todos") },
  handler: async (ctx, args) => {
    await ctx.db.delete("todos", args.id);
  },
});

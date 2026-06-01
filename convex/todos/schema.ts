import { defineTable } from "convex/server";
import { v } from "convex/values";

export const todos = defineTable({
  text: v.string(),
  completed: v.boolean(),
}).index("by_completed", ["completed"]);

export default { todos };

import { authTables } from "@convex-dev/auth/server";
import { defineSchema } from "convex/server";

import { todos } from "./todos/schema";

export default defineSchema({
  ...authTables,
  todos,
});

import { PortalHost } from "@rn-primitives/portal";
import { ConvexProvider, ConvexReactClient } from "convex/react";
import { Stack } from "expo-router";

import "./../../global.css";

const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

export default function RootLayout() {
  return (
    <ConvexProvider client={convex}>
      <Stack />
      <PortalHost />
    </ConvexProvider>
  );
}

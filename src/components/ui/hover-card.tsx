import {
  Content as HoverCardContentPrimitive,
  Overlay as HoverCardOverlay,
  Portal as HoverCardPortal,
  Root as HoverCardRoot,
  Trigger as HoverCardTriggerPrimitive,
} from "@rn-primitives/hover-card";
import * as React from "react";
import { Platform, StyleSheet } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const HoverCard = HoverCardRoot;

const HoverCardTrigger = HoverCardTriggerPrimitive;

const FullWindowOverlay = Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function HoverCardContent({
  className,
  align = "center",
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardContentPrimitive>) {
  return (
    <HoverCardPortal>
      <FullWindowOverlay>
        <HoverCardOverlay style={Platform.select({ native: StyleSheet.absoluteFill })}>
          <NativeOnlyAnimatedView entering={FadeIn} exiting={FadeOut}>
            <TextClassContext.Provider value="text-popover-foreground">
              <HoverCardContentPrimitive
                align={align}
                sideOffset={sideOffset}
                className={cn(
                  "bg-popover border-border outline-hidden z-50 w-64 rounded-md border p-4 shadow-md shadow-black/5",
                  Platform.select({
                    web: cn(
                      "animate-in fade-in-0 zoom-in-95 origin-(--radix-hover-card-content-transform-origin) cursor-default [&>*]:cursor-auto",
                      props.side === "bottom" && "slide-in-from-top-2",
                      props.side === "top" && "slide-in-from-bottom-2",
                    ),
                  }),
                  className,
                )}
                {...props}
              />
            </TextClassContext.Provider>
          </NativeOnlyAnimatedView>
        </HoverCardOverlay>
      </FullWindowOverlay>
    </HoverCardPortal>
  );
}

export { HoverCard, HoverCardContent, HoverCardTrigger };

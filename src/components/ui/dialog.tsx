import {
  Close as DialogClosePrimitive,
  Content as DialogContentPrimitive,
  Description as DialogDescriptionPrimitive,
  Overlay as DialogOverlayPrimitive,
  Portal as DialogPortalPrimitive,
  Root as DialogRoot,
  Title as DialogTitlePrimitive,
  Trigger as DialogTriggerPrimitive,
} from "@rn-primitives/dialog";
import { X } from "lucide-react-native";
import * as React from "react";
import { Platform, Text, View, type ViewProps } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { Icon } from "@/components/ui/icon";
import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { cn } from "@/lib/utils";

const Dialog = DialogRoot;

const DialogTrigger = DialogTriggerPrimitive;

const DialogPortal = DialogPortalPrimitive;

const DialogClose = DialogClosePrimitive;

const FullWindowOverlay = Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function DialogOverlay({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof DialogOverlayPrimitive>, "asChild"> & {
  children?: React.ReactNode;
}) {
  return (
    <FullWindowOverlay>
      <DialogOverlayPrimitive
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 flex items-center justify-center bg-black/50 p-2",
          Platform.select({
            web: "animate-in fade-in-0 fixed",
          }),
          className,
        )}
        {...props}
        asChild={Platform.OS !== "web"}
      >
        <NativeOnlyAnimatedView entering={FadeIn.duration(200)} exiting={FadeOut.duration(150)}>
          <NativeOnlyAnimatedView entering={FadeIn.delay(50)} exiting={FadeOut.duration(150)}>
            <>{children}</>
          </NativeOnlyAnimatedView>
        </NativeOnlyAnimatedView>
      </DialogOverlayPrimitive>
    </FullWindowOverlay>
  );
}

function DialogContent({
  className,
  portalHost,
  children,
  ...props
}: React.ComponentProps<typeof DialogContentPrimitive> & {
  portalHost?: string;
}) {
  return (
    <DialogPortal hostName={portalHost}>
      <DialogOverlay>
        <DialogContentPrimitive
          className={cn(
            "bg-background border-border z-50 mx-auto flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5 sm:max-w-lg",
            Platform.select({
              web: "animate-in fade-in-0 zoom-in-95 duration-200",
            }),
            className,
          )}
          {...props}
        >
          {children}
          <DialogClosePrimitive
            className={cn(
              "absolute right-4 top-4 rounded opacity-70 active:opacity-100",
              Platform.select({
                web: "focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:outline-none focus-visible:ring-2",
              }),
            )}
          >
            <Icon
              as={X}
              className={cn("text-accent-foreground web:pointer-events-none size-4 shrink-0")}
            />
            <Text className="sr-only">Close</Text>
          </DialogClosePrimitive>
        </DialogContentPrimitive>
      </DialogOverlay>
    </DialogPortal>
  );
}

function DialogHeader({ className, ...props }: ViewProps) {
  return (
    <View className={cn("flex flex-col gap-2 text-center sm:text-left", className)} {...props} />
  );
}

function DialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function DialogTitle({ className, ...props }: React.ComponentProps<typeof DialogTitlePrimitive>) {
  return (
    <DialogTitlePrimitive
      className={cn("text-foreground text-lg font-semibold leading-none", className)}
      {...props}
    />
  );
}

function DialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof DialogDescriptionPrimitive>) {
  return (
    <DialogDescriptionPrimitive
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
};

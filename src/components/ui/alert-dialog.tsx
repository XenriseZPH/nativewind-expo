import {
  Action as AlertDialogActionPrimitive,
  Cancel as AlertDialogCancelPrimitive,
  Content as AlertDialogContentPrimitive,
  Description as AlertDialogDescriptionPrimitive,
  Overlay as AlertDialogOverlayPrimitive,
  Portal as AlertDialogPortalPrimitive,
  Root as AlertDialogRoot,
  Title as AlertDialogTitlePrimitive,
  Trigger as AlertDialogTriggerPrimitive,
} from "@rn-primitives/alert-dialog";
import * as React from "react";
import { Platform, View, type ViewProps } from "react-native";
import { FadeIn, FadeOut } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { buttonTextVariants, buttonVariants } from "@/components/ui/button";
import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const AlertDialog = AlertDialogRoot;

const AlertDialogTrigger = AlertDialogTriggerPrimitive;

const AlertDialogPortal = AlertDialogPortalPrimitive;

const FullWindowOverlay = Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function AlertDialogOverlay({
  className,
  children,
  ...props
}: Omit<React.ComponentProps<typeof AlertDialogOverlayPrimitive>, "asChild"> & {
  children?: React.ReactNode;
}) {
  return (
    <FullWindowOverlay>
      <AlertDialogOverlayPrimitive
        className={cn(
          "absolute bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/50 p-2",
          Platform.select({
            web: "animate-in fade-in-0 fixed",
          }),
          className,
        )}
        {...props}
      >
        <NativeOnlyAnimatedView
          entering={FadeIn.duration(200).delay(50)}
          exiting={FadeOut.duration(150)}
        >
          <>{children}</>
        </NativeOnlyAnimatedView>
      </AlertDialogOverlayPrimitive>
    </FullWindowOverlay>
  );
}

function AlertDialogContent({
  className,
  portalHost,
  ...props
}: React.ComponentProps<typeof AlertDialogContentPrimitive> & {
  portalHost?: string;
}) {
  return (
    <AlertDialogPortal hostName={portalHost}>
      <AlertDialogOverlay>
        <AlertDialogContentPrimitive
          className={cn(
            "bg-background border-border z-50 flex w-full max-w-[calc(100%-2rem)] flex-col gap-4 rounded-lg border p-6 shadow-lg shadow-black/5 sm:max-w-lg",
            Platform.select({
              web: "animate-in fade-in-0 zoom-in-95 duration-200",
            }),
            className,
          )}
          {...props}
        />
      </AlertDialogOverlay>
    </AlertDialogPortal>
  );
}

function AlertDialogHeader({ className, ...props }: ViewProps) {
  return (
    <TextClassContext.Provider value="text-center sm:text-left">
      <View className={cn("flex flex-col gap-2", className)} {...props} />
    </TextClassContext.Provider>
  );
}

function AlertDialogFooter({ className, ...props }: ViewProps) {
  return (
    <View
      className={cn("flex flex-col-reverse gap-2 sm:flex-row sm:justify-end", className)}
      {...props}
    />
  );
}

function AlertDialogTitle({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogTitlePrimitive>) {
  return (
    <AlertDialogTitlePrimitive
      className={cn("text-foreground text-lg font-semibold", className)}
      {...props}
    />
  );
}

function AlertDialogDescription({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogDescriptionPrimitive>) {
  return (
    <AlertDialogDescriptionPrimitive
      className={cn("text-muted-foreground text-sm", className)}
      {...props}
    />
  );
}

function AlertDialogAction({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogActionPrimitive>) {
  const textClass = React.useMemo(() => buttonTextVariants({ className }), [className]);
  return (
    <TextClassContext.Provider value={textClass}>
      <AlertDialogActionPrimitive className={cn(buttonVariants(), className)} {...props} />
    </TextClassContext.Provider>
  );
}

function AlertDialogCancel({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogCancelPrimitive>) {
  const textClass = React.useMemo(
    () => buttonTextVariants({ className, variant: "outline" }),
    [className],
  );
  return (
    <TextClassContext.Provider value={textClass}>
      <AlertDialogCancelPrimitive
        className={cn(buttonVariants({ variant: "outline" }), className)}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

export {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogPortal,
  AlertDialogTitle,
  AlertDialogTrigger,
};

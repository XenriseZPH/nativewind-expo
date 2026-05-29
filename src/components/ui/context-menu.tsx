import {
  CheckboxItem as ContextMenuCheckboxItemPrimitive,
  Content as ContextMenuContentPrimitive,
  Group as ContextMenuGroupPrimitive,
  Item as ContextMenuItemPrimitive,
  ItemIndicator as ContextMenuItemIndicatorPrimitive,
  Label as ContextMenuLabelPrimitive,
  Overlay as ContextMenuOverlayPrimitive,
  Portal as ContextMenuPortalPrimitive,
  RadioGroup as ContextMenuRadioGroupPrimitive,
  RadioItem as ContextMenuRadioItemPrimitive,
  Root as ContextMenuRoot,
  Separator as ContextMenuSeparatorPrimitive,
  Sub as ContextMenuSubPrimitive,
  SubContent as ContextMenuSubContentPrimitive,
  SubTrigger as ContextMenuSubTriggerPrimitive,
  Trigger as ContextMenuTriggerPrimitive,
  useSubContext as useContextMenuSubContext,
} from "@rn-primitives/context-menu";
import { Check, ChevronDown, ChevronRight, ChevronUp } from "lucide-react-native";
import * as React from "react";
import { Platform, type StyleProp, StyleSheet, Text, View, type ViewStyle } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { Icon } from "@/components/ui/icon";
import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const ContextMenu = ContextMenuRoot;
const ContextMenuTrigger = ContextMenuTriggerPrimitive;
const ContextMenuGroup = ContextMenuGroupPrimitive;
const ContextMenuPortal = ContextMenuPortalPrimitive;
const ContextMenuSub = ContextMenuSubPrimitive;
const ContextMenuRadioGroup = ContextMenuRadioGroupPrimitive;

function ContextMenuSubTrigger({
  className,
  inset,
  children,
  iconClassName,
  ...props
}: React.ComponentProps<typeof ContextMenuSubTriggerPrimitive> & {
  children?: React.ReactNode;
  iconClassName?: string;
  inset?: boolean;
}) {
  const { open } = useContextMenuSubContext();
  const icon = Platform.OS === "web" ? ChevronRight : open ? ChevronUp : ChevronDown;
  const textClass = React.useMemo(
    () =>
      cn(
        "text-sm select-none group-active:text-accent-foreground",
        open && "text-accent-foreground",
      ),
    [open],
  );
  return (
    <TextClassContext.Provider value={textClass}>
      <ContextMenuSubTriggerPrimitive
        className={cn(
          "active:bg-accent group flex flex-row items-center rounded-sm px-2 py-2 sm:py-1.5",
          Platform.select({
            web: "focus:bg-accent focus:text-accent-foreground cursor-default outline-none [&_svg]:pointer-events-none",
          }),
          className,
          open && cn("bg-accent", Platform.select({ native: "mb-1" })),
          inset && "pl-8",
        )}
        {...props}
      >
        <>{children}</>
        <Icon as={icon} className={cn("text-foreground ml-auto size-4 shrink-0", iconClassName)} />
      </ContextMenuSubTriggerPrimitive>
    </TextClassContext.Provider>
  );
}

function ContextMenuSubContent({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuSubContentPrimitive>) {
  return (
    <NativeOnlyAnimatedView entering={FadeIn}>
      <ContextMenuSubContentPrimitive
        className={cn(
          "bg-popover border-border overflow-hidden rounded-md border p-1 shadow-lg shadow-black/5",
          Platform.select({
            web: "animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 fade-in-0 data-[state=closed]:zoom-out-95 zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 origin-(--radix-context-menu-content-transform-origin) z-50 min-w-[8rem]",
          }),
          className,
        )}
        {...props}
      />
    </NativeOnlyAnimatedView>
  );
}

const FullWindowOverlay = Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function ContextMenuContent({
  className,
  overlayClassName,
  overlayStyle,
  portalHost,
  ...props
}: React.ComponentProps<typeof ContextMenuContentPrimitive> & {
  overlayStyle?: StyleProp<ViewStyle>;
  overlayClassName?: string;
  portalHost?: string;
}) {
  return (
    <ContextMenuPortalPrimitive hostName={portalHost}>
      <FullWindowOverlay>
        <ContextMenuOverlayPrimitive
          style={Platform.select({
            web: overlayStyle ?? undefined,
            native: overlayStyle
              ? StyleSheet.flatten([
                  StyleSheet.absoluteFill,
                  overlayStyle as typeof StyleSheet.absoluteFill,
                ])
              : StyleSheet.absoluteFill,
          })}
          className={overlayClassName}
        >
          <NativeOnlyAnimatedView entering={FadeIn}>
            <TextClassContext.Provider value="text-popover-foreground">
              <ContextMenuContentPrimitive
                className={cn(
                  "bg-popover border-border min-w-[8rem] overflow-hidden rounded-md border p-1 shadow-lg shadow-black/5",
                  Platform.select({
                    web: cn(
                      "animate-in fade-in-0 zoom-in-95 max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) z-50 cursor-default",
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
        </ContextMenuOverlayPrimitive>
      </FullWindowOverlay>
    </ContextMenuPortalPrimitive>
  );
}

function ContextMenuItem({
  className,
  inset,
  variant,
  ...props
}: React.ComponentProps<typeof ContextMenuItemPrimitive> & {
  className?: string;
  inset?: boolean;
  variant?: "default" | "destructive";
}) {
  const textClass = React.useMemo(
    () =>
      cn(
        "select-none text-sm text-popover-foreground group-active:text-popover-foreground",
        variant === "destructive" && "text-destructive group-active:text-destructive",
      ),
    [variant],
  );
  return (
    <TextClassContext.Provider value={textClass}>
      <ContextMenuItemPrimitive
        className={cn(
          "active:bg-accent group relative flex flex-row items-center gap-2 rounded-sm px-2 py-2 sm:py-1.5",
          Platform.select({
            web: cn(
              "focus:bg-accent focus:text-accent-foreground cursor-default outline-none data-[disabled]:pointer-events-none",
              variant === "destructive" && "focus:bg-destructive/10 dark:focus:bg-destructive/20",
            ),
          }),
          variant === "destructive" && "active:bg-destructive/10 dark:active:bg-destructive/20",
          props.disabled && "opacity-50",
          inset && "pl-8",
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function ContextMenuCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuCheckboxItemPrimitive> & {
  children?: React.ReactNode;
}) {
  return (
    <TextClassContext.Provider value="text-sm text-popover-foreground select-none group-active:text-accent-foreground">
      <ContextMenuCheckboxItemPrimitive
        className={cn(
          "active:bg-accent group relative flex flex-row items-center gap-2 rounded-sm py-2 pl-8 pr-2 sm:py-1.5",
          Platform.select({
            web: "focus:bg-accent focus:text-accent-foreground cursor-default outline-none data-[disabled]:pointer-events-none",
          }),
          props.disabled && "opacity-50",
          className,
        )}
        {...props}
      >
        <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <ContextMenuItemIndicatorPrimitive>
            <Icon
              as={Check}
              className={cn(
                "text-foreground size-4",
                Platform.select({ web: "pointer-events-none" }),
              )}
            />
          </ContextMenuItemIndicatorPrimitive>
        </View>
        <>{children}</>
      </ContextMenuCheckboxItemPrimitive>
    </TextClassContext.Provider>
  );
}

function ContextMenuRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ContextMenuRadioItemPrimitive> & {
  children?: React.ReactNode;
}) {
  return (
    <TextClassContext.Provider value="text-sm text-popover-foreground select-none group-active:text-accent-foreground">
      <ContextMenuRadioItemPrimitive
        className={cn(
          "active:bg-accent group relative flex flex-row items-center gap-2 rounded-sm py-2 pl-8 pr-2 sm:py-1.5",
          Platform.select({
            web: "focus:bg-accent focus:text-accent-foreground cursor-default outline-none data-[disabled]:pointer-events-none",
          }),
          props.disabled && "opacity-50",
          className,
        )}
        {...props}
      >
        <View className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <ContextMenuItemIndicatorPrimitive>
            <View className="h-2 w-2 rounded-full bg-foreground" />
          </ContextMenuItemIndicatorPrimitive>
        </View>
        <>{children}</>
      </ContextMenuRadioItemPrimitive>
    </TextClassContext.Provider>
  );
}

function ContextMenuLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof ContextMenuLabelPrimitive> & {
  className?: string;
  inset?: boolean;
}) {
  return (
    <ContextMenuLabelPrimitive
      className={cn(
        "text-foreground px-2 py-2 text-sm font-medium sm:py-1.5",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function ContextMenuSeparator({
  className,
  ...props
}: React.ComponentProps<typeof ContextMenuSeparatorPrimitive>) {
  return (
    <ContextMenuSeparatorPrimitive
      className={cn("bg-border -mx-1 my-1 h-px", className)}
      {...props}
    />
  );
}

function ContextMenuShortcut({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

export {
  ContextMenu,
  ContextMenuCheckboxItem,
  ContextMenuContent,
  ContextMenuGroup,
  ContextMenuItem,
  ContextMenuLabel,
  ContextMenuPortal,
  ContextMenuRadioGroup,
  ContextMenuRadioItem,
  ContextMenuSeparator,
  ContextMenuShortcut,
  ContextMenuSub,
  ContextMenuSubContent,
  ContextMenuSubTrigger,
  ContextMenuTrigger,
};

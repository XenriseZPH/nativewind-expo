import {
  CheckboxItem as MenubarCheckboxItemPrimitive,
  Content as MenubarContentPrimitive,
  Group as MenubarGroupPrimitive,
  Item as MenubarItemPrimitive,
  ItemIndicator as MenubarItemIndicatorPrimitive,
  Label as MenubarLabelPrimitive,
  Menu as MenubarMenuPrimitive,
  Portal as MenubarPortalPrimitive,
  RadioGroup as MenubarRadioGroupPrimitive,
  RadioItem as MenubarRadioItemPrimitive,
  Root as MenubarRoot,
  Separator as MenubarSeparatorPrimitive,
  Sub as MenubarSubPrimitive,
  SubContent as MenubarSubContentPrimitive,
  SubTrigger as MenubarSubTriggerPrimitive,
  Trigger as MenubarTriggerPrimitive,
  useMenuContext,
  useRootContext,
  useSubContext,
} from "@rn-primitives/menubar";
import { Portal } from "@rn-primitives/portal";
import { Check, ChevronDown, ChevronRight, ChevronUp } from "lucide-react-native";
import * as React from "react";
import { Platform, Pressable, StyleSheet, Text, View } from "react-native";
import { FadeIn } from "react-native-reanimated";
import { FullWindowOverlay as RNFullWindowOverlay } from "react-native-screens";

import { Icon } from "@/components/ui/icon";
import { NativeOnlyAnimatedView } from "@/components/ui/native-only-animated-view";
import { TextClassContext } from "@/components/ui/text";
import { cn } from "@/lib/utils";

const MenubarGroup = MenubarGroupPrimitive;
const MenubarMenu = MenubarMenuPrimitive;
const MenubarPortal = MenubarPortalPrimitive;
const MenubarRadioGroup = MenubarRadioGroupPrimitive;
const MenubarSub = MenubarSubPrimitive;

const FullWindowOverlay = Platform.OS === "ios" ? RNFullWindowOverlay : React.Fragment;

function Menubar({
  className,
  value: valueProp,
  onValueChange: onValueChangeProp,
  ...props
}: React.ComponentProps<typeof MenubarRoot>) {
  const id = React.useId();
  const [value, setValue] = React.useState<string | undefined>(undefined);

  function closeMenu() {
    if (onValueChangeProp) {
      onValueChangeProp(undefined);
      return;
    }
    setValue(undefined);
  }

  return (
    <>
      {Platform.OS !== "web" && (value || valueProp) ? (
        <Portal name={`menubar-overlay-${id}`}>
          <Pressable onPress={closeMenu} style={StyleSheet.absoluteFill} />
        </Portal>
      ) : null}
      <MenubarRoot
        className={cn(
          "bg-background border-border flex h-10 flex-row items-center gap-1 rounded-md border p-1 shadow-sm shadow-black/5 sm:h-9",
          className,
        )}
        value={value ?? valueProp}
        onValueChange={onValueChangeProp ?? setValue}
        {...props}
      />
    </>
  );
}

function MenubarTrigger({
  className,
  ...props
}: React.ComponentProps<typeof MenubarTriggerPrimitive>) {
  const { value } = useRootContext();
  const { value: itemValue } = useMenuContext();

  const textClass = React.useMemo(
    () =>
      cn(
        "text-sm font-medium select-none group-active:text-accent-foreground",
        value === itemValue && "text-accent-foreground",
      ),
    [value, itemValue],
  );

  return (
    <TextClassContext.Provider value={textClass}>
      <MenubarTriggerPrimitive
        className={cn(
          "group flex items-center rounded-md px-2 py-1.5 sm:py-1",
          Platform.select({
            web: "focus:bg-accent focus:text-accent-foreground cursor-default outline-none",
          }),
          value === itemValue && "bg-accent",
          className,
        )}
        {...props}
      />
    </TextClassContext.Provider>
  );
}

function MenubarSubTrigger({
  className,
  inset,
  children,
  iconClassName,
  ...props
}: React.ComponentProps<typeof MenubarSubTriggerPrimitive> & {
  children?: React.ReactNode;
  iconClassName?: string;
  inset?: boolean;
}) {
  const { open } = useSubContext();
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
      <MenubarSubTriggerPrimitive
        className={cn(
          "active:bg-accent group flex flex-row items-center rounded-sm px-2 py-2 sm:py-1.5",
          Platform.select({
            web: "focus:bg-accent focus:text-accent-foreground cursor-default outline-none [&_svg]:pointer-events-none",
          }),
          className,
          open && "bg-accent",
          inset && "pl-8",
        )}
        {...props}
      >
        <>{children}</>
        <Icon as={icon} className={cn("text-foreground ml-auto size-4 shrink-0", iconClassName)} />
      </MenubarSubTriggerPrimitive>
    </TextClassContext.Provider>
  );
}

function MenubarSubContent({
  className,
  ...props
}: React.ComponentProps<typeof MenubarSubContentPrimitive>) {
  return (
    <NativeOnlyAnimatedView entering={FadeIn}>
      <MenubarSubContentPrimitive
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

function MenubarContent({
  className,
  portalHost,
  align = "start",
  alignOffset = -4,
  sideOffset = 8,
  ...props
}: React.ComponentProps<typeof MenubarContentPrimitive> & {
  portalHost?: string;
}) {
  return (
    <MenubarPortalPrimitive hostName={portalHost}>
      <FullWindowOverlay>
        <NativeOnlyAnimatedView
          entering={FadeIn}
          style={StyleSheet.absoluteFill}
          pointerEvents="box-none"
        >
          <TextClassContext.Provider value="text-popover-foreground">
            <MenubarContentPrimitive
              className={cn(
                "bg-popover border-border min-w-[12rem] overflow-hidden rounded-md border p-1 shadow-lg shadow-black/5",
                Platform.select({
                  web: cn(
                    "animate-in fade-in-0 zoom-in-95 max-h-(--radix-context-menu-content-available-height) origin-(--radix-context-menu-content-transform-origin) z-50 cursor-default",
                    props.side === "bottom" && "slide-in-from-top-2",
                    props.side === "top" && "slide-in-from-bottom-2",
                  ),
                }),
                className,
              )}
              align={align}
              alignOffset={alignOffset}
              sideOffset={sideOffset}
              {...props}
            />
          </TextClassContext.Provider>
        </NativeOnlyAnimatedView>
      </FullWindowOverlay>
    </MenubarPortalPrimitive>
  );
}

function MenubarItem({
  className,
  inset,
  variant,
  ...props
}: React.ComponentProps<typeof MenubarItemPrimitive> & {
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
      <MenubarItemPrimitive
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

function MenubarCheckboxItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarCheckboxItemPrimitive> & {
  children?: React.ReactNode;
}) {
  return (
    <TextClassContext.Provider value="text-sm text-popover-foreground select-none group-active:text-accent-foreground">
      <MenubarCheckboxItemPrimitive
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
          <MenubarItemIndicatorPrimitive>
            <Icon
              as={Check}
              className={cn(
                "text-foreground size-4",
                Platform.select({ web: "pointer-events-none" }),
              )}
            />
          </MenubarItemIndicatorPrimitive>
        </View>
        <>{children}</>
      </MenubarCheckboxItemPrimitive>
    </TextClassContext.Provider>
  );
}

function MenubarRadioItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof MenubarRadioItemPrimitive> & {
  children?: React.ReactNode;
}) {
  return (
    <TextClassContext.Provider value="text-sm text-popover-foreground select-none group-active:text-accent-foreground">
      <MenubarRadioItemPrimitive
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
          <MenubarItemIndicatorPrimitive>
            <View className="h-2 w-2 rounded-full bg-foreground" />
          </MenubarItemIndicatorPrimitive>
        </View>
        <>{children}</>
      </MenubarRadioItemPrimitive>
    </TextClassContext.Provider>
  );
}

function MenubarLabel({
  className,
  inset,
  ...props
}: React.ComponentProps<typeof MenubarLabelPrimitive> & {
  className?: string;
  inset?: boolean;
}) {
  return (
    <MenubarLabelPrimitive
      className={cn(
        "text-foreground px-2 py-2 text-sm font-medium sm:py-1.5",
        inset && "pl-8",
        className,
      )}
      {...props}
    />
  );
}

function MenubarSeparator({
  className,
  ...props
}: React.ComponentProps<typeof MenubarSeparatorPrimitive>) {
  return (
    <MenubarSeparatorPrimitive className={cn("bg-border -mx-1 my-1 h-px", className)} {...props} />
  );
}

function MenubarShortcut({ className, ...props }: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn("text-muted-foreground ml-auto text-xs tracking-widest", className)}
      {...props}
    />
  );
}

export {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarGroup,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarPortal,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
};

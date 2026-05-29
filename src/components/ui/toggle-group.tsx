import {
  Item as ToggleGroupItemPrimitive,
  Root as ToggleGroupRoot,
  useRootContext as useToggleGroupRootContext,
  utils as toggleGroupUtils,
} from "@rn-primitives/toggle-group";
import * as React from "react";
import { Platform } from "react-native";

import { Icon } from "@/components/ui/icon";
import { TextClassContext } from "@/components/ui/text";
import { toggleVariants } from "@/components/ui/toggle";
import { cn } from "@/lib/utils";

import type { VariantProps } from "class-variance-authority";

const ToggleGroupContext = React.createContext<VariantProps<typeof toggleVariants> | null>(null);

function ToggleGroup({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupRoot> & VariantProps<typeof toggleVariants>) {
  const contextValue = React.useMemo(() => ({ variant, size }), [variant, size]);
  return (
    <ToggleGroupRoot
      className={cn(
        "flex flex-row items-center rounded-md shadow-none",
        Platform.select({ web: "w-fit" }),
        variant === "outline" && "shadow-sm shadow-black/5",
        className,
      )}
      {...props}
    >
      <ToggleGroupContext.Provider value={contextValue}>{children}</ToggleGroupContext.Provider>
    </ToggleGroupRoot>
  );
}

function useToggleGroupContext() {
  const context = React.useContext(ToggleGroupContext);
  if (context === null) {
    throw new Error(
      "ToggleGroup compound components cannot be rendered outside the ToggleGroup component",
    );
  }
  return context;
}

function ToggleGroupItem({
  className,
  children,
  variant,
  size,
  isFirst,
  isLast,
  ...props
}: React.ComponentProps<typeof ToggleGroupItemPrimitive> &
  VariantProps<typeof toggleVariants> & {
    isFirst?: boolean;
    isLast?: boolean;
  }) {
  const context = useToggleGroupContext();
  const { value } = useToggleGroupRootContext();

  const textClass = React.useMemo(
    () =>
      cn(
        "text-sm text-foreground font-medium",
        toggleGroupUtils.getIsSelected(value, props.value)
          ? "text-accent-foreground"
          : Platform.select({ web: "group-hover:text-muted-foreground" }),
      ),
    [value, props.value],
  );

  return (
    <TextClassContext.Provider value={textClass}>
      <ToggleGroupItemPrimitive
        className={cn(
          toggleVariants({
            variant: context.variant || variant,
            size: context.size || size,
          }),
          props.disabled && "opacity-50",
          toggleGroupUtils.getIsSelected(value, props.value) && "bg-accent",
          "min-w-0 shrink-0 rounded-none shadow-none",
          isFirst && "rounded-l-md",
          isLast && "rounded-r-md",
          (context.variant === "outline" || variant === "outline") && "border-l-0",
          (context.variant === "outline" || variant === "outline") && isFirst && "border-l",
          Platform.select({
            web: "flex-1 focus:z-10 focus-visible:z-10",
          }),
          className,
        )}
        {...props}
      >
        {children}
      </ToggleGroupItemPrimitive>
    </TextClassContext.Provider>
  );
}

function ToggleGroupIcon({ className, ...props }: React.ComponentProps<typeof Icon>) {
  const textClass = React.useContext(TextClassContext);
  return <Icon className={cn("size-4 shrink-0", textClass, className)} {...props} />;
}

export { ToggleGroup, ToggleGroupIcon, ToggleGroupItem };

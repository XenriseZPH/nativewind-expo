import {
  Indicator as RadioGroupIndicator,
  Item as RadioGroupItemPrimitive,
  Root as RadioGroupRoot,
} from "@rn-primitives/radio-group";
import { Platform } from "react-native";

import { cn } from "@/lib/utils";

function RadioGroup({ className, ...props }: React.ComponentProps<typeof RadioGroupRoot>) {
  return <RadioGroupRoot className={cn("gap-3", className)} {...props} />;
}

function RadioGroupItem({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupItemPrimitive>) {
  return (
    <RadioGroupItemPrimitive
      className={cn(
        "border-input dark:bg-input/30 aspect-square size-4 shrink-0 items-center justify-center rounded-full border shadow-sm shadow-black/5",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive outline-none transition-all focus-visible:ring-[3px] disabled:cursor-not-allowed",
        }),
        props.disabled && "opacity-50",
        className,
      )}
      {...props}
    >
      <RadioGroupIndicator className="size-2 rounded-full bg-primary" />
    </RadioGroupItemPrimitive>
  );
}

export { RadioGroup, RadioGroupItem };

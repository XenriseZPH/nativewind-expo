import { Indicator as CheckboxIndicator, Root as CheckboxRoot } from "@rn-primitives/checkbox";
import { Check } from "lucide-react-native";
import { Platform } from "react-native";

import { Icon } from "@/components/ui/icon";
import { cn } from "@/lib/utils";

const DEFAULT_HIT_SLOP = 24;

function Checkbox({
  className,
  checkedClassName,
  indicatorClassName,
  iconClassName,
  ...props
}: React.ComponentProps<typeof CheckboxRoot> & {
  checkedClassName?: string;
  indicatorClassName?: string;
  iconClassName?: string;
}) {
  return (
    <CheckboxRoot
      className={cn(
        "border-input dark:bg-input/30 size-4 shrink-0 rounded-lg border shadow-sm shadow-black/5",
        Platform.select({
          web: "focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive peer cursor-default outline-none transition-shadow focus-visible:ring-[3px] disabled:cursor-not-allowed",
          native: "overflow-hidden",
        }),
        props.checked && cn("border-primary", checkedClassName),
        props.disabled && "opacity-50",
        className,
      )}
      hitSlop={DEFAULT_HIT_SLOP}
      {...props}
    >
      <CheckboxIndicator
        className={cn("bg-primary h-full w-full items-center justify-center", indicatorClassName)}
      >
        <Icon
          as={Check}
          size={12}
          strokeWidth={Platform.OS === "web" ? 2.5 : 3.5}
          className={cn("text-primary-foreground", iconClassName)}
          color={"white"}
        />
      </CheckboxIndicator>
    </CheckboxRoot>
  );
}

export { Checkbox };

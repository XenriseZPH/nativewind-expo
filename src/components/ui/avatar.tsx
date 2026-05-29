import {
  Fallback as AvatarFallbackPrimitive,
  Image as AvatarImagePrimitive,
  Root as AvatarRoot,
} from "@rn-primitives/avatar";

import { cn } from "@/lib/utils";

function Avatar({ className, ...props }: React.ComponentProps<typeof AvatarRoot>) {
  return (
    <AvatarRoot
      className={cn("relative flex size-8 shrink-0 overflow-hidden rounded-full", className)}
      {...props}
    />
  );
}

function AvatarImage({ className, ...props }: React.ComponentProps<typeof AvatarImagePrimitive>) {
  return <AvatarImagePrimitive className={cn("aspect-square size-full", className)} {...props} />;
}

function AvatarFallback({
  className,
  ...props
}: React.ComponentProps<typeof AvatarFallbackPrimitive>) {
  return (
    <AvatarFallbackPrimitive
      className={cn(
        "bg-muted flex size-full flex-row items-center justify-center rounded-full",
        className,
      )}
      {...props}
    />
  );
}

export { Avatar, AvatarFallback, AvatarImage };

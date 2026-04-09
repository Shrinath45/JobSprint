import * as React from "react";
import { cn } from "@/lib/utils";

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => {
  return (
    <input
      type={type}
      ref={ref}
      {...props}
      className={cn(
        "flex w-full h-12 rounded-xl border border-gray-300 bg-white px-4 py-2 text-base shadow-sm transition-all duration-200 placeholder:text-gray-400",
        "focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent",
        "hover:shadow-md hover:border-gray-400",
        "disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
    />
  );
});

Input.displayName = "Input";

export { Input };

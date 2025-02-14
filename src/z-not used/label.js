// Label component in CRA (Create React App) format

import React from "react";
import * as LabelPrimitive from "@radix-ui/react-label";
// import { cn } from "./lib/utils"; // Adjust the path if necessary
import { cn } from "../lib/utils";

const Label = React.forwardRef(({ className, ...props }, ref) => {
    return (
        <LabelPrimitive.Root
            ref={ref}
            className={cn(
                "text-sm font-medium text-black dark:text-white leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
                className
            )}
            {...props}
        />
    );
});

Label.displayName = LabelPrimitive.Root.displayName;

export { Label };

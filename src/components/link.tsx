import { cn } from "@/lib/utils";
import type React from "react";
import { buttonVariants } from "./button/buttonVariants";
import { Link } from "react-router-dom";

export const CustomLink = ({
  href,
  className,
  ...props
}: React.ComponentProps<"a"> & { href: string }) => {
  return (
    <Link
      to={href}
      className={cn(
        buttonVariants({ variant: "outline", size: "default" }),
        className
      )}
      {...props}
    />
  );
};

"use client";
import { ImageOff } from "lucide-react";
import { type ImgHTMLAttributes, useState } from "react";
import { cn } from "@/lib/utils";

export default function FallbackImage({
  className,
  width,
  height,
  alt,
  ...props
}: ImgHTMLAttributes<HTMLImageElement>) {
  const [error, setError] = useState(false);

  if (error)
    return (
      <div
        className={cn(
          "flex items-center justify-center border bg-muted text-muted-foreground @container-size",
          className,
        )}
        style={{ width, height }}
        role="img"
        aria-label={alt}
      >
        <ImageOff className="w-[min(40cqw,40cqh)]" />
      </div>
    );

  return (
    <img
      className={className}
      width={width}
      height={height}
      alt={alt}
      onError={() => setError(true)}
      {...props}
    />
  );
}

"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * next/image that swaps to `fallback` when the photo can't be loaded
 * (offline, blocked network, image removed from the CDN…).
 */
export function ImageWithFallback({
  src,
  alt,
  sizes,
  fallback,
  priority,
  className,
}: {
  src: string;
  alt: string;
  sizes: string;
  fallback: ReactNode;
  priority?: boolean;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  // The error event can fire before React hydrates; catch that case too.
  useEffect(() => {
    const img = imgRef.current;
    if (img && img.complete && img.naturalWidth === 0) setFailed(true);
  }, []);

  if (failed) return <>{fallback}</>;
  return (
    <Image
      ref={imgRef}
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      onError={() => setFailed(true)}
      className={cn("object-cover", className)}
    />
  );
}

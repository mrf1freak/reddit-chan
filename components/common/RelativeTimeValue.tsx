"use client";

import { formatDistanceToNow } from "date-fns";
import type { HTMLProps } from "react";

export default function RelativeTimeValue({
  timestamp,
  ...props
}: HTMLProps<HTMLSpanElement> & { timestamp: number }) {
  return (
    <span {...props} suppressHydrationWarning>
      {formatDistanceToNow(new Date(timestamp * 1000))}
    </span>
  );
}

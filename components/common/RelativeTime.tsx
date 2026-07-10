import { type HTMLProps, Suspense } from "react";
import RelativeTimeValue from "./RelativeTimeValue";

export default function RelativeTime({
  timestamp,
  ...props
}: HTMLProps<HTMLSpanElement> & { timestamp: number }) {
  return (
    <Suspense fallback={<span {...props}>...</span>}>
      <RelativeTimeValue timestamp={timestamp} {...props} />
    </Suspense>
  );
}

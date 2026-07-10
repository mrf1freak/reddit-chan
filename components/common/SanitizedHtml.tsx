import { Suspense } from "react";
import SanitizedHtmlValue from "./SanitizedHtmlValue";

type Props = {
  html: string;
  className?: string;
};

export default function SanitizedHtml({ html, className }: Props) {
  return (
    <Suspense fallback={<div className={className} />}>
      <SanitizedHtmlValue html={html} className={className} />
    </Suspense>
  );
}

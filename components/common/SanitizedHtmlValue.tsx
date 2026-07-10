type Props = {
  html: string;
  className?: string;
};

export default function SanitizedHtmlValue({ html, className }: Props) {
  return (
    <div
      // biome-ignore lint/security/noDangerouslySetInnerHtml: Purified
      dangerouslySetInnerHTML={{ __html: html }}
      className={className}
      suppressHydrationWarning
    />
  );
}

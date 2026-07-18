import * as Flags from "country-flag-icons/react/3x2";

export default function CountryFlag({
  code,
  name,
}: {
  code: string;
  name?: string;
}) {
  const cc = code.toUpperCase();
  // biome-ignore lint/performance/noDynamicNamespaceImportAccess: country code is only known at runtime, can't be a static named import
  const Flag = Flags[cc as keyof typeof Flags];
  if (!Flag) return null;
  return (
    <Flag
      title={name ?? cc}
      className="h-3.5 w-auto shrink-0 rounded-xs outline"
    />
  );
}

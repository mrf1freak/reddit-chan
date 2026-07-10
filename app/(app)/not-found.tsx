import { CompassIcon } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="flex flex-1 items-center justify-center p-8">
      <div className="flex max-w-sm flex-col items-center gap-6 text-center">
        <div className="flex size-14 items-center justify-center rounded-full bg-muted text-muted-foreground">
          <CompassIcon className="size-7" />
        </div>
        <div className="space-y-2">
          <p className="text-sm font-medium text-muted-foreground">404</p>
          <h1 className="text-xl font-semibold whitespace-nowrap">
            Page not found
          </h1>
          <p className="text-sm text-muted-foreground">
            This board or thread doesn&apos;t exist, or it has 404&apos;d and
            been archived.
          </p>
        </div>
        <Button render={<Link href="/" prefetch={false} />}>
          Back to boards
        </Button>
      </div>
    </div>
  );
}

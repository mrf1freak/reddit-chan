import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function BoardLoading() {
  return (
    <div className="p-8">
      <Skeleton className="mb-6 h-9 w-24" />
      <Card className="py-0 gap-0">
        {Array.from({ length: 10 }).map((_, i) => (
          <div
            key={i.toString()}
            className="flex border-t border-border px-4 py-3 first:border-t-0"
          >
            <Skeleton className="mr-4 h-16 w-20 shrink-0" />
            <div className="flex w-full flex-col justify-between gap-2">
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-2/3" />
              <div className="mt-2 flex flex-row items-end justify-between">
                <Skeleton className="h-3.5 w-16" />
                <Skeleton className="h-3.5 w-12" />
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function ThreadLoading() {
  return (
    <div className="w-full p-8">
      <div className="mb-6 flex items-center gap-2">
        <Skeleton className="h-4 w-12" />
        <Skeleton className="h-4 w-2" />
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-2" />
        <Skeleton className="h-4 w-40" />
      </div>

      <Card className="mb-6">
        <CardContent className="flex flex-1 gap-2">
          <Skeleton className="h-32 w-32 shrink-0" />
          <div className="flex w-full flex-col gap-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </CardContent>
        <CardFooter>
          <Skeleton className="h-3.5 w-20" />
        </CardFooter>
      </Card>

      <Card className="py-0 gap-0">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i.toString()}
            className="border-t border-border p-4 first:border-t-0"
          >
            <Skeleton className="mb-2 h-3 w-32" />
            <div className="flex flex-row gap-4">
              <Skeleton className="h-20 w-20 shrink-0" />
              <div className="flex w-full flex-col gap-2">
                <Skeleton className="h-3.5 w-full" />
                <Skeleton className="h-3.5 w-4/5" />
              </div>
            </div>
          </div>
        ))}
      </Card>
    </div>
  );
}

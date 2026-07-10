import { FourChan } from "lib/4chan";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import SanitizedHtml from "@/components/common/SanitizedHtml";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export const metadata: Metadata = {
  title: "RedditChan",
  description: "RedditChan",
};

export default async function Home() {
  "use cache";
  cacheLife("days");
  const boards = await FourChan.boards();

  return (
    <div className="w-full p-8">
      <h1 className="mb-6 text-4xl">Boards</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {boards.map(({ board, title, meta_description }) => (
          <Link href={`/${board}`} key={board} prefetch={false}>
            <Card className="h-full transition-colors hover:bg-accent">
              <CardHeader>
                <CardTitle>
                  /{board}/ - {title}
                </CardTitle>
                <CardDescription>
                  <SanitizedHtml html={meta_description} />
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
}

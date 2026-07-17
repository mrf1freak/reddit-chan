import PostStats from "components/post/PostStats";
import { FourChan } from "lib/4chan";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import { postThumbnailLink } from "utils/post";
import FallbackImage from "@/components/common/FallbackImage";
import RelativeTime from "@/components/common/RelativeTime";
import SanitizedHtml from "@/components/common/SanitizedHtml";
import { Card } from "@/components/ui/card";

export async function generateStaticParams() {
  return [{ board: "__placeholder__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ board: string }>;
}): Promise<Metadata> {
  "use cache";
  cacheLife("days");

  const { board } = await params;
  const boards = await FourChan.boards().catch(() => undefined);
  if (!boards) return notFound();

  const info = boards.find((b) => b.board === board);

  return {
    title: `/${board}/ - ${info?.title ?? "Catalog"}`,
    description: info?.meta_description,
  };
}

export default async function Catalog({
  params,
}: {
  params: Promise<{ board: string }>;
}) {
  "use cache";
  cacheLife("minutes");
  const { board } = await params;

  if (board === "__placeholder__") return notFound();

  const threads = await FourChan.threads(board).catch(() => undefined);
  if (!threads) return notFound();

  return (
    <div className="p-4 md:p-8">
      <h1 className="mb-6 text-4xl font-light">/{board}/</h1>
      <Card className="py-0 gap-0">
        {threads.map(({ tim, com, time, no, replies, images }) => (
          <Link
            href={`/${board}/thread/${no}`}
            prefetch={false}
            className="group flex border-t border-border px-4 items-stretch py-3 transition-colors first:border-t-0 hover:bg-accent"
            key={tim}
          >
            {tim && (
              <FallbackImage
                src={postThumbnailLink(board, tim)}
                alt=""
                className="mr-4 w-20 shrink-0 max-h-20 min-h-10 object-cover"
                referrerPolicy="no-referrer"
                loading="lazy"
              />
            )}

            <div className="flex w-full flex-col justify-between">
              <SanitizedHtml html={com || ""} className="text-foreground" />
              <div className="flex flex-row items-end justify-between mt-2">
                <PostStats post={{ replies, images }} />
                <RelativeTime
                  timestamp={time}
                  className="text-xs text-muted-foreground"
                />
              </div>
            </div>
          </Link>
        ))}
      </Card>
    </div>
  );
}

import PostStats from "components/post/PostStats";
import PostThumbnailImage from "components/post/PostThumbnailImage";
import { FourChan } from "lib/4chan";
import type { Metadata } from "next";
import { cacheLife } from "next/cache";
import Link from "next/link";
import { notFound } from "next/navigation";
import SanitizedHtml from "@/components/common/SanitizedHtml";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { postTitle } from "@/utils/post";
import AddToRecentThread from "./components/AddToRecentThread";
import Reply from "./components/Reply";
import { ThreadProvider } from "./components/ThreadContext";

export async function generateStaticParams() {
  return [{ board: "__placeholder__", thread: "__placeholder__" }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ board: string; thread: string }>;
}): Promise<Metadata> {
  "use cache";
  cacheLife("days");

  const { board, thread } = await params;

  if (board === "__placeholder__" || thread === "__placeholder__")
    return notFound();

  const threadId = Number(thread);
  const result = await FourChan.thread(board, threadId).catch(() => undefined);
  if (!result) return notFound();
  const { posts } = result;

  const post = posts[threadId] || {};

  const title = postTitle(post);
  return {
    title: `/${board}/ - ${title}`,
    referrer: "no-referrer",
  };
}

export default async function Thread({
  params,
}: {
  params: Promise<{ board: string; thread: string }>;
}) {
  "use cache";
  cacheLife("hours");
  const { board, thread: threadString } = await params;
  if (board === "__placeholder__" || threadString === "__placeholder__")
    return notFound();
  const thread = Number(decodeURIComponent(threadString));

  const result = await FourChan.thread(board, thread).catch(() => undefined);
  if (!result) return notFound();
  const { posts, replies } = result;

  const OP_ID = thread;
  const OP_POST = posts[OP_ID];
  const OP_TEXT = OP_POST?.com || "";

  function OP() {
    if (typeof OP_POST === "undefined") return null;

    return (
      <Card className="mb-6">
        <CardContent className="flex flex-1 gap-4">
          <PostThumbnailImage post={OP_POST} board={board} />
          <SanitizedHtml html={OP_TEXT} className="text-base" />
        </CardContent>
        <CardFooter>
          <PostStats post={OP_POST} />
        </CardFooter>
      </Card>
    );
  }

  function Replies() {
    if (typeof replies[OP_ID] === "undefined") return null;

    return (
      <Card className="py-0 gap-0">
        {replies[OP_ID]?.map((post, i) => (
          <Reply
            key={post.id}
            depth={0}
            className={i === 0 ? "border-0" : ""}
            {...post}
          />
        ))}
      </Card>
    );
  }

  return (
    <ThreadProvider value={{ posts, replies, board }}>
      <div className="w-full p-4 md:p-8">
        <Breadcrumb className="mb-6">
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink render={<Link href="/" prefetch={false} />}>
                Home
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink
                render={<Link href={`/${board}`} prefetch={false} />}
              >
                /{board}/
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage className="max-w-56 sm:max-w-96 truncate">
                {postTitle(OP_POST) || "Thread"}
              </BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <OP />
        <Replies />
        {OP_POST && (
          <AddToRecentThread
            thread={{
              com: OP_POST.com || "",
              no: OP_POST.no,
              tim: OP_POST.tim || 0,
            }}
            board={board}
          />
        )}
      </div>
    </ThreadProvider>
  );
}

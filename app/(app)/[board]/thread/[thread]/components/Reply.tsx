"use client";
import PostThumbnailImage from "components/post/PostThumbnailImage";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import type { ReplyItem } from "utils/parser";
import RelativeTime from "@/components/common/RelativeTime";
import SanitizedHtml from "@/components/common/SanitizedHtml";
import { cn } from "@/lib/utils";
import { useThread } from "./ThreadContext";

const DEPTH_COLORS = ["#ef476f", "#FFD166", "#06D6A0", "#118AB2", "#073B4C"];

function colorForDepth(depth: number): string {
  if (depth === 0) return "transparent";
  return DEPTH_COLORS[(depth - 1) % DEPTH_COLORS.length];
}

type Props = ReplyItem & {
  depth: number;
  className?: string;
};

export default function Reply({ id, reply, depth, className }: Props) {
  const { posts, replies, board } = useThread();
  const [hidden, setHidden] = useState(false);

  const post = posts[id];
  if (!post) return null;

  const children = replies[id] || [];
  const hasChildren = children.length > 0;

  return (
    <div className={twMerge("border-t border-border", className)}>
      {/** biome-ignore lint/a11y/useSemanticElements: Nested buttons */}
      <div
        className="w-full cursor-pointer border-l-4 border-solid p-4 text-left transition-colors hover:bg-accent"
        style={{ borderColor: colorForDepth(depth) }}
        onClick={() => {
          if (hasChildren) setHidden((v) => !v);
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter" || (e.key === " " && hasChildren)) {
            e.preventDefault();
            setHidden((v) => !v);
          }
        }}
        role="button"
        tabIndex={0}
      >
        <div className="mb-2 flex items-center gap-1 py-1 text-sm text-muted-foreground">
          {hasChildren && (
            <ChevronRight
              className={cn(
                "h-3.5 w-3.5 shrink-0 transition-transform",
                !hidden && "rotate-90",
              )}
            />
          )}
          {post.name !== "Anonymous" && `${post.name} - `}
          <span className="text-xs">No. {id}</span>
          <span className="text-xs" title={post.now}>
            {" "}
            - <RelativeTime timestamp={post.time} />
          </span>
          {hidden && (
            <span className="text-xs italic">
              · {children.length} {children.length === 1 ? "reply" : "replies"}{" "}
              hidden
            </span>
          )}
        </div>
        <div className="flex flex-row">
          <PostThumbnailImage post={post} board={board} className="mr-4" />
          <SanitizedHtml html={reply} className="whitespace-normal text-sm" />
        </div>
      </div>
      {children.length > 0 && (
        <div className={cn("ml-6 border-l border-border", hidden && "hidden")}>
          {children.map((child) => (
            <Reply key={child.id} {...child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

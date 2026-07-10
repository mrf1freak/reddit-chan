"use client";

import type { Post } from "lib/4chan";
import { createContext, type ReactNode, useContext, useMemo } from "react";
import type { RepliesById } from "utils/parser";

type ThreadContextValue = {
  posts: Record<number, Post>;
  replies: RepliesById;
  board: string;
};

const ThreadContext = createContext<ThreadContextValue | null>(null);

export function ThreadProvider({
  value,
  children,
}: {
  value: ThreadContextValue;
  children: ReactNode;
}) {
  return (
    <ThreadContext.Provider value={value}>{children}</ThreadContext.Provider>
  );
}

export function useThread(): ThreadContextValue & { media: Post[] } {
  const context = useContext(ThreadContext);
  if (context === null) {
    throw new Error("useThread must be used within a ThreadProvider");
  }

  const media = useMemo(
    () =>
      Object.values(context.posts)
        .filter((post) => typeof post.tim !== "undefined")
        .sort((a, b) => a.no - b.no),
    [context.posts],
  );

  return { ...context, media };
}

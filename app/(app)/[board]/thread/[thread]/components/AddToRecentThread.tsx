"use client";

import useRecentThreads from "hooks/useRecentThreads";
import { useEffect } from "react";

export default function AddToRecentThread({
  thread,
  board,
}: {
  thread: { no: number; com: string; tim?: number };
  board: string;
}) {
  const { add } = useRecentThreads();
  useEffect(() => {
    add(thread, board);
  }, [add, board, thread]);
  return null;
}

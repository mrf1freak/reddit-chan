import { useLocalStorage } from "@mantine/hooks";
import { useCallback } from "react";
import z from "zod";

const THREAD_KEY = "threads";

const schema = z
  .object({
    board: z.string(),
    com: z.string(),
    no: z.number(),
    tim: z.number(),
  })
  .array();

type Thread = z.infer<typeof schema>[number];

function deserialize(value: string | undefined): Thread[] {
  if (!value) return [];

  try {
    return schema.parse(JSON.parse(value));
  } catch {
    return [];
  }
}

export default function useRecentThreads() {
  const [threads, setThreads, removeThreads] = useLocalStorage<Thread[]>({
    key: THREAD_KEY,
    defaultValue: [],
    deserialize,
  });

  const remove = useCallback(
    (no: number) => {
      setThreads((threads) => threads.filter((item) => item.no !== no));
    },
    [setThreads],
  );

  const add = useCallback(
    (thread: { no: number; com: string; tim: number }, board: string) => {
      setThreads((threads) => {
        const alreadyAdded = threads.some(
          (item) => item.no === thread.no && item.board === board,
        );
        if (alreadyAdded) return threads;

        const { com, no, tim } = thread;
        return [{ com, no, board, tim }, ...threads];
      });
    },
    [setThreads],
  );

  const clear = useCallback(() => {
    removeThreads();
  }, [removeThreads]);

  return { threads, remove, add, clear };
}

"use client";

import { getHotkeyHandler } from "@mantine/hooks";
import { useEffect, useState } from "react";
import { postThumbnailLink } from "utils/post";
import { useThread } from "@/app/(app)/[board]/thread/[thread]/components/ThreadContext";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const VIDEO_EXTENSIONS = new Set([".webm", ".mp4"]);

type Props = {
  initialId: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export default function MediaGalleryDialog({
  initialId,
  open,
  onOpenChange,
}: Props) {
  const { board, media } = useThread();
  const [activeId, setActiveId] = useState(initialId);

  useEffect(() => {
    if (open) setActiveId(initialId);
  }, [open, initialId]);

  useEffect(() => {
    if (!open) return;
    const step = (delta: number) => {
      const ids = media
        .filter((post) => typeof post.tim !== "undefined")
        .map((post) => post.no);
      setActiveId((current) => {
        const i = ids.indexOf(current);
        return i === -1 ? current : (ids[i + delta] ?? current);
      });
    };
    const handler = getHotkeyHandler([
      ["ArrowLeft", () => step(-1)],
      ["ArrowRight", () => step(1)],
    ]);
    // capture phase: fire before the dialog's key handling swallows arrows
    document.addEventListener("keydown", handler, true);
    return () => document.removeEventListener("keydown", handler, true);
  }, [open, media]);

  useEffect(() => {
    if (!open) return;
    setTimeout(() => {
      document.getElementById(`gallery-thumb-${activeId}`)?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
        inline: "center",
      });
    }, 100);
  }, [open, activeId]);

  const active = media.find((post) => post.no === activeId) ?? media[0];
  if (!active || typeof active.tim === "undefined") return null;

  const isVideo = VIDEO_EXTENSIONS.has(active.ext ?? "");

  const src = `https://i.4cdn.org/${board}/${active.tim}${active.ext ?? ""}`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed top-0 left-0 flex h-screen w-screen max-w-none p-0 translate-x-0 translate-y-0 flex-col gap-4 rounded-none bg-background/50 supports-backdrop-filter:backdrop-blur-lg sm:max-w-none">
        <DialogTitle className="sr-only">
          {active.filename}
          {active.ext}
        </DialogTitle>
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: Escape already closes the dialog */}
        {/* biome-ignore lint/a11y/noStaticElementInteractions: click-to-dismiss backdrop, not an interactive element */}
        <div
          className="flex min-h-0 flex-1 items-center justify-center overflow-hidden rounded-lg"
          onClick={(e) => {
            if (e.target === e.currentTarget) onOpenChange(false);
          }}
        >
          {isVideo ? (
            // biome-ignore lint/a11y/useMediaCaption: We do not control the video
            <video
              key={active.tim}
              src={src}
              controls
              autoPlay
              loop
              className="max-h-full max-w-full"
            />
          ) : (
            <img
              key={active.tim}
              src={src}
              alt={active.filename}
              referrerPolicy="no-referrer"
              className="max-h-full max-w-full object-contain"
            />
          )}
        </div>
        {media.length > 1 && (
          <ScrollArea className="w-full whitespace-nowrap bg-card">
            <div className="flex gap-2 pb-4 pt-1 px-2">
              {media.map((post) => {
                if (typeof post.tim === "undefined") return null;
                return (
                  <button
                    key={post.no}
                    id={`gallery-thumb-${post.no}`}
                    type="button"
                    onClick={() => setActiveId(post.no)}
                    className={cn(
                      "shrink-0 overflow-hidden rounded-md ring-2 ring-transparent transition-opacity",
                      post.no === active.no
                        ? "ring-primary"
                        : "opacity-50 hover:opacity-100",
                    )}
                  >
                    <img
                      src={postThumbnailLink(board, post.tim)}
                      alt={post.filename}
                      referrerPolicy="no-referrer"
                      className="size-16 object-cover"
                    />
                  </button>
                );
              })}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        )}
      </DialogContent>
    </Dialog>
  );
}

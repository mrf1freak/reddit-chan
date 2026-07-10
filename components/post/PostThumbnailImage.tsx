"use client";

import filesize from "filesize";
import type { Post } from "lib/4chan";
import { useState } from "react";
import { postThumbnailLink } from "utils/post";
import MediaGalleryDialog from "@/components/post/MediaGalleryDialog";
import FallbackImage from "../common/FallbackImage";

type Props = {
  post: Pick<
    Post,
    "no" | "tim" | "tn_w" | "tn_h" | "filename" | "ext" | "fsize"
  >;
  board: string;
  className?: string;
};

export default function PostThumbnailImage(props: Props) {
  const { no, tim, tn_w, tn_h, filename, ext, fsize } = props.post;
  const { board, className } = props;
  const [open, setOpen] = useState(false);

  if (typeof tim === "undefined") return null;

  return (
    <div className={className} style={{ width: tn_w }}>
      <a
        href={`https://i.4cdn.org/${board}/${tim}${ext ?? ""}`}
        target="_blank"
        rel="noopener noreferrer"
        onClick={(e) => {
          if (e.ctrlKey || e.metaKey || e.shiftKey || e.button !== 0) return;
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
        className="pointer-events-auto block w-fit cursor-pointer"
      >
        <FallbackImage
          src={postThumbnailLink(board, tim)}
          width={tn_w}
          height={tn_h}
          alt={filename}
          referrerPolicy="no-referrer"
          loading="lazy"
        />
      </a>
      <div className="max-w-xs text-xs text-muted-foreground font-mono mt-2 wrap-break-word">
        {filename}
        {ext}
      </div>
      <div className="text-xs text-muted-foreground font-mono">
        {ext?.toUpperCase().substring(1)} - {filesize(fsize ?? 0, { round: 0 })}
      </div>
      <MediaGalleryDialog initialId={no} open={open} onOpenChange={setOpen} />
    </div>
  );
}

import type { Post } from "lib/4chan";
import { ImageIcon, MessageSquareIcon } from "lucide-react";

type Props = {
  post: Pick<Post, "replies" | "images">;
};

export default function PostStats(props: Props) {
  const { replies, images } = props.post;
  return (
    <div className="flex items-center gap-3 text-xs text-muted-foreground">
      <div className="flex items-center gap-1">
        <MessageSquareIcon className="size-3.5" />
        <span>{replies}</span>
      </div>
      <div className="flex items-center gap-1">
        <ImageIcon className="size-3.5" />
        <span>{images}</span>
      </div>
    </div>
  );
}

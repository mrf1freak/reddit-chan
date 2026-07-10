import DOMPurify from "isomorphic-dompurify";
export function postThumbnailLink(board: string, tim: number): string {
  return `https://i.4cdn.org/${board}/${tim}s.jpg`;
}

export function postTitle({ com, sub }: { com?: string; sub?: string }) {
  return (
    sub ||
    DOMPurify.sanitize(com || "", {
      RETURN_DOM_FRAGMENT: true,
    }).textContent?.trim() ||
    ""
  );
}

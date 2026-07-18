import { describe, expect, test } from "bun:test";
import type { Post } from "lib/4chan";
import { postDictionary, postReplies, threadReplies } from "utils/parser";

// 4chan anchor as it arrives in `com`: entities are literal &gt;, not chars.
const link = (target: number) =>
  `<a href="#p${target}" class="quotelink">&gt;&gt;${target}</a>`;

describe("postReplies", () => {
  test("reply to another post", () => {
    const r = postReplies(999, `${link(123)}<br>hello world`, 100);
    expect(r).toEqual({ 123: [{ id: 999, reply: "hello world" }] });
  });

  test("no quote link falls back to OP", () => {
    const r = postReplies(999, "just a comment", 100);
    expect(r).toEqual({ 100: [{ id: 999, reply: "just a comment" }] });
  });

  test("reply to multiple posts", () => {
    const r = postReplies(999, `${link(1)}${link(2)}<br>both of you`, 100);
    expect(r).toEqual({
      1: [{ id: 999, reply: "both of you" }],
      2: [{ id: 999, reply: "both of you" }],
    });
  });

  test("self-quote is skipped", () => {
    const r = postReplies(999, `${link(999)}<br>me`, 100);
    expect(r).toEqual({});
  });

  test("separate replies to different posts", () => {
    const r = postReplies(999, `${link(1)}<br>hi<br>${link(2)}<br>bye`, 100);
    expect(r[1]).toEqual([{ id: 999, reply: "hi<br>" }]);
    expect(r[2]).toEqual([{ id: 999, reply: "bye" }]);
  });

  test("separate replies to different posts with inline link", () => {
    const r = postReplies(
      999,
      `${link(1)}<br>hi, this is some text ${link(2)} bye`,
      100,
    );
    expect(r[1]).toEqual([{ id: 999, reply: "hi, this is some text " }]);
    expect(r[2]).toEqual([{ id: 999, reply: " bye" }]);
  });

  test("quote link with no trailing text still records the target", () => {
    const r = postReplies(999, link(123), 100);
    expect(r).toEqual({ 123: [{ id: 999, reply: " " }] });
  });
});

describe("threadReplies", () => {
  test("aggregates replies across posts and skips comment-less posts", () => {
    const posts = [
      { no: 1, com: undefined },
      { no: 2, com: `${link(1)}<br>first` },
      { no: 3, com: `${link(1)}<br>second` },
    ] as unknown as Post[];

    const r = threadReplies(posts, 1);
    expect(r[1]).toEqual([
      { id: 2, reply: "first" },
      { id: 3, reply: "second" },
    ]);
  });
});

describe("postDictionary", () => {
  test("indexes posts by number", () => {
    const posts = [{ no: 5 }, { no: 9 }] as unknown as Post[];
    const dict = postDictionary(posts);
    expect(dict[5].no).toBe(5);
    expect(dict[9].no).toBe(9);
  });
});

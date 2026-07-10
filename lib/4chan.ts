import axios from "axios";
import { postDictionary, threadReplies } from "utils/parser";
import z from "zod";

const api = axios.create({
  baseURL: "https://a.4cdn.org/",
});

const postSchema = z.object({
  no: z.number(),
  now: z.string(),
  name: z.string(),
  sub: z.string().optional(),
  com: z.string().optional(),
  time: z.number(),
  tim: z.number().optional(),
  tn_w: z.number().optional(),
  tn_h: z.number().optional(),
  filename: z.string().optional(),
  ext: z.string().optional(),
  fsize: z.number().optional(),
  replies: z.number().optional(),
  images: z.number().optional(),
});

export type Post = z.infer<typeof postSchema>;

export const FourChan = {
  async boards() {
    const { data } = await api.get("boards.json");
    const schema = z.object({
      boards: z.array(
        z.object({
          board: z.string(),
          title: z.string(),
          meta_description: z.string(),
        }),
      ),
    });
    const parsed = schema.parse(data);
    return parsed.boards;
  },

  async threads(board: string) {
    const { data } = await api.get(`${board}/catalog.json`);
    const schema = z
      .object({
        threads: z
          .object({
            no: z.number(),
            now: z.string(),
            com: z.string().optional(),
            time: z.number(),
            tim: z.number().optional(),
            replies: z.number(),
            images: z.number(),
          })
          .array(),
      })
      .array();

    const parsed = schema.parse(data);
    return parsed.flatMap(({ threads }) => threads);
  },
  async thread(board: string, id: number) {
    const { data } = await api.get(`${board}/thread/${id}.json`);
    const schema = z.object({
      posts: z.array(postSchema),
    });

    const { posts } = schema.parse(data);

    const replies = threadReplies(posts, id);
    const dictionary = postDictionary(posts);

    return { replies, posts: dictionary };
  },
};

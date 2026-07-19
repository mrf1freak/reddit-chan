import { PostHog } from "posthog-node";

export const posthog = new PostHog(
  process.env.NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN ?? "",
  {
    host: "https://us.i.posthog.com", // your PostHog region
    flushAt: 1, // ponytail: flush every event; serverless has no long-lived process to batch
  },
);

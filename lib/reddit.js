import snoowrap from "snoowrap";

const r = new snoowrap({
  userAgent: process.env.REDDIT_USER_AGENT,
  clientId: process.env.REDDIT_CLIENT_ID,
  clientSecret: process.env.REDDIT_CLIENT_SECRET,
  refreshToken: process.env.REDDIT_REFRESH_TOKEN,
});

const getPosts = async ({ subreddit, limit = 1, after = "" }) => {
  const result = await r.getSubreddit(subreddit).getHot({ limit, after });
  const posts = result
    .filter((post) => !post.stickied)
    .map((post) => ({
      title: post.title,
      subreddit: post.subreddit.display_name,
      url: post.url,
      id: `t3_${post.id}`,
    }));
  return posts;
};

export default r;
export { getPosts };
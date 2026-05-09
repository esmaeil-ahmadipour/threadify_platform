import type { PostWithData } from "@/db/queries/posts";
import Link from "next/link";
import paths from "@/paths";
import { EmptyState } from "../shared/EmptyState";

interface PostListProps {
  fetchData: () => Promise<PostWithData[]>;
  topicSlug?: string;
}

export default async function PostList({
  fetchData,
  topicSlug,
}: PostListProps) {
  const posts = await fetchData();
  // Simulate delay (optional, remove in production)
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  if (posts.length === 0) {
    return <EmptyState topicSlug={topicSlug || ""} />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => {
        const postTopicSlug = post.topic.slug;

        if (!postTopicSlug) {
          throw new Error("Need a slug to link to a post");
        }

        return (
          <article
            key={post.id}
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
          >
            <Link href={paths.postShow(postTopicSlug, post.id)}>
              <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
                {post.title}
              </h2>
            </Link>

            <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
              {post.content}
            </p>

            <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <span>By {post.user.name || "Anonymous"}</span>
              </div>
              <div className="flex items-center gap-4">
                <span>{post._count.comments} comments</span>
                <time dateTime={post.createdAt.toISOString()}>
                  {new Date(post.createdAt).toLocaleDateString()}
                </time>
              </div>
            </div>
          </article>
        );
      })}
    </div>
  );
}

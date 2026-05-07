import Link from "next/link";
import paths from "@/paths";

interface PostCardProps {
  post: {
    id: string;
    title: string;
    content: string;
    createdAt: Date;
    user: {
      name: string | null;
      image: string | null;
    };
  };
  topicSlug: string;
}

export function PostCard({ post, topicSlug }: PostCardProps) {
  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow">
      <Link href={paths.postShow(topicSlug, post.id)}>
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2 hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
          {post.title}
        </h2>
      </Link>
      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-2">
        {post.content}
      </p>
      <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <div className="flex items-center gap-2">
          {post.user.image && (
            <img
              src={post.user.image}
              alt={post.user.name || "User"}
              className="w-6 h-6 rounded-full"
            />
          )}
          <span>{post.user.name || "Anonymous"}</span>
        </div>
        <time dateTime={post.createdAt.toISOString()}>
          {new Date(post.createdAt).toLocaleDateString()}
        </time>
      </div>
    </article>
  );
}

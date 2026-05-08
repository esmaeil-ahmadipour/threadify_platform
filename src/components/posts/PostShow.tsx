import { notFound } from "next/navigation";
import { db } from "@/db";
import { Avatar } from "@heroui/react";

interface PostShowProps {
  postId: string;
}

export default async function PostShow({ postId }: PostShowProps) {
  const post = await db.post.findFirst({
    where: { id: postId },
    include: {
      user: true,
      topic: true,
    },
  });

  if (!post) {
    notFound();
  }

  return (
    <article className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
      {/* Post Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 px-6 py-4">
        <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white">
          {post.title}
        </h1>

        <div className="flex items-center gap-3 mt-3 text-sm text-gray-500 dark:text-gray-400">
          <div className="flex items-center gap-2">
            <Avatar.Root className="cursor-pointer hover:opacity-80 transition-opacity">
              <Avatar.Image src={post.user?.image || ""} />
              <Avatar.Fallback>
                {post.user?.name?.[0] || post.user?.email?.[0] || "U"}
              </Avatar.Fallback>
            </Avatar.Root>
            <span className="font-medium text-gray-700 dark:text-gray-300">
              {post.user?.name || "Anonymous"}
            </span>
          </div>

          <span>•</span>

          <time dateTime={post.createdAt.toISOString()}>
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </time>

          <span>•</span>

          <span>in {post.topic?.slug}</span>
        </div>
      </div>

      {/* Post Content */}
      <div className="px-6 py-6">
        <div className="prose prose-gray dark:prose-invert max-w-none">
          <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap">
            {post.content}
          </p>
        </div>
      </div>

      {/* Post Footer */}
      {post.updatedAt > post.createdAt && (
        <div className="border-t border-gray-200 dark:border-gray-700 px-6 py-3 bg-gray-50 dark:bg-gray-900/50">
          <p className="text-xs text-gray-400 dark:text-gray-500">
            Last updated: {new Date(post.updatedAt).toLocaleDateString()}
          </p>
        </div>
      )}
    </article>
  );
}

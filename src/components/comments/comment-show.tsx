import Image from "next/image";
import CommentCreateForm from "@/components/comments/comment-create-form";
import { fetchCommentsByPostId } from "@/db/queries/comments";

interface CommentShowProps {
  commentId: string;
  postId: string;
}

export default async function CommentShow({
  commentId,
  postId,
}: CommentShowProps) {
  const comments = await fetchCommentsByPostId(postId);
  const comment = comments.find((c) => c.id === commentId);

  if (!comment) {
    return null;
  }

  const children = comments.filter((c) => c.parentId === commentId);
  const renderedChildren = children.map((child) => {
    return <CommentShow key={child.id} commentId={child.id} postId={postId} />;
  });

  // Format date nicely
  const formattedDate = new Date(comment.createdAt).toLocaleDateString(
    "en-US",
    {
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  );

  return (
    <article
      className="group p-4 rounded-lg shadow-sm transition-all duration-200
                 border border-gray-200 dark:border-gray-700
                 bg-white dark:bg-gray-900/50
                 hover:shadow-md hover:border-gray-300 dark:hover:border-gray-600"
    >
      <div className="flex gap-3">
        {/* Avatar Section */}
        <div className="flex-shrink-0">
          {comment.user.image ? (
            <div className="relative">
              <Image
                src={comment.user.image}
                alt={comment.user.name || "User avatar"}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover
                         ring-2 ring-offset-2 
                         ring-gray-200 dark:ring-gray-700
                         ring-offset-white dark:ring-offset-gray-900
                         shadow-sm transition-transform duration-200
                         group-hover:scale-105"
                priority={false}
              />
              {/* Optional: Online status indicator */}
              <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-white dark:ring-gray-900" />
            </div>
          ) : (
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center
                         bg-gradient-to-br from-gray-100 to-gray-200 
                         dark:from-gray-700 dark:to-gray-800
                         ring-2 ring-offset-2 
                         ring-gray-200 dark:ring-gray-700
                         ring-offset-white dark:ring-offset-gray-900
                         shadow-sm"
            >
              <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">
                {comment.user.name?.[0]?.toUpperCase() || "?"}
              </span>
            </div>
          )}
        </div>

        {/* Comment Content */}
        <div className="flex-1 space-y-2 min-w-0">
          {/* Header with metadata */}
          <div className="flex items-center gap-2 flex-wrap">
            <p className="text-sm font-semibold text-gray-900 dark:text-white">
              {comment.user.name || "Anonymous"}
            </p>
            <span className="text-xs text-gray-500 dark:text-gray-400">
              {formattedDate}
            </span>
            {comment.updatedAt > comment.createdAt && (
              <span className="text-xs text-gray-400 dark:text-gray-500">
                · edited
              </span>
            )}
          </div>

          {/* Comment Body */}
          <div className="prose prose-sm dark:prose-invert max-w-none">
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap break-words">
              {comment.content}
            </p>
          </div>

          {/* Actions */}
          <div className="pt-1">
            <CommentCreateForm postId={comment.postId} parentId={comment.id} />
          </div>
        </div>
      </div>

      {/* Nested Comments (Replies) */}
      {renderedChildren.length > 0 && (
        <div className="mt-4 pl-4 space-y-4 border-l-2 border-gray-200 dark:border-gray-700">
          {renderedChildren}
        </div>
      )}
    </article>
  );
}

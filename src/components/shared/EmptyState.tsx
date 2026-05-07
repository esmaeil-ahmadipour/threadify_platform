import Link from "next/link";
import paths from "@/paths";

interface EmptyStateProps {
  topicSlug: string;
  message?: string;
  buttonText?: string;
}

export function EmptyState({
  topicSlug,
  message = "No posts yet. Be the first to create a post!",
  buttonText = "Create First Post",
}: EmptyStateProps) {
  return (
    <div className="text-center py-12 bg-gray-50 dark:bg-gray-800 rounded-lg">
      <p className="text-gray-500 dark:text-gray-400">{message}</p>
      <Link
        href={paths.postCreate(topicSlug)}
        className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
      >
        {buttonText}
      </Link>
    </div>
  );
}

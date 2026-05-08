import Link from "next/link";
import PostShow from "@/components/posts/PostShow";
import CommentList from "@/components/comments/comment-list";
import CommentCreateForm from "@/components/comments/comment-create-form";
import paths from "@/paths";
import { Button } from "@heroui/react";

interface PostShowPageProps {
  params: Promise<{
    slug: string;
    postId: string;
  }>;
}

export default async function PostShowPage({ params }: PostShowPageProps) {
  const { slug, postId } = await params;

  return (
    <div className="max-w-4xl mx-auto space-y-6 p-4">
      {/* Back Button */}
      <div>
        <Link href={paths.topicShow(slug)}>
          <Button
            variant="outline"
            size="sm"
            className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
          >
            <p> Back to {slug}</p>
          </Button>
        </Link>
      </div>

      {/* Post Content */}
      <PostShow postId={postId} />

      {/* Comments Section */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="border-b border-gray-200 dark:border-gray-700 px-6 py-4 bg-gray-50 dark:bg-gray-900/50">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
            Join the Discussion
          </h2>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Share your thoughts and engage with the community
          </p>
        </div>

        <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
          <CommentCreateForm postId={postId} startOpen />

          <CommentList postId={postId} />
        </div>
      </div>
    </div>
  );
}
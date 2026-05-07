"use client";

import Link from "next/link";
import paths from "@/paths";
import PostCreateForm from "@/components/posts/PostCreateForm";

interface TopicSidebarProps {
  topic: {
    slug: string;
    description: string;
    createdAt: Date;
  };
  postsCount: number;
}

export function TopicSidebar({ topic, postsCount }: TopicSidebarProps) {
  return (
    <div className="col-span-1 space-y-6">
      {/* Topic Info Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          About this topic
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {topic.description}
        </p>
      </div>

      {/* Actions Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-3">
          Actions
        </h3>
        <PostCreateForm topicSlug={topic.slug} />
      </div>

      {/* Stats Card */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-4">
        <h3 className="font-semibold text-gray-900 dark:text-white mb-2">
          Statistics
        </h3>
        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Posts:</span>
            <span className="font-semibold text-gray-900 dark:text-white">
              {postsCount}
            </span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-600 dark:text-gray-400">Created:</span>
            <span className="text-gray-600 dark:text-gray-400">
              {new Date(topic.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

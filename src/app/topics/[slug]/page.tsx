import { db } from "@/db";
import { notFound } from "next/navigation";
import { TopicHeader } from "@/components/topics/TopicHeader";
import PostCreateForm from "@/components/posts/PostCreateForm";
import PostList from "@/components/posts/PostList";
import { fetchPostsByTopicSlug } from "@/db/queries/posts";

interface TopicShowPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function TopicShowPage({ params }: TopicShowPageProps) {
  const { slug } = await params;

  // Fetch topic and its posts
  const topic = await db.topic.findUnique({
    where: { slug },
    include: {
      posts: {
        include: {
          user: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  });

  // If topic doesn't exist, show 404
  if (!topic) {
    notFound();
  }

  const { posts } = topic;

  return (
    <div className="grid grid-cols-4 gap-6 p-4">
      {/* Main content - Posts list */}
      <div className="col-span-3 space-y-6">
        <TopicHeader slug={topic.slug} description={topic.description} />
        <PostList fetchData={() => fetchPostsByTopicSlug(slug)} />
      </div>

      {/* Sidebar - Replaced with PostCreateForm while keeping beautiful styling */}
      <div className="space-y-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <h3 className="text-lg font-semibold mb-3">Create New Post</h3>
          <PostCreateForm topicSlug={slug} />{" "}
          {/* Fixed: changed 'slug' to 'topicSlug' */}
        </div>

        {/* Topic Stats Card */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-4">
          <div className="text-sm text-gray-600 dark:text-gray-400">
            <p>Total Posts: {posts.length}</p>
            <p className="mt-2">
              Created: {new Date(topic.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

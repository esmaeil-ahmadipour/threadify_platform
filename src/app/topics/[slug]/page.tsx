import { db } from "@/db";
import { notFound } from "next/navigation";
import { TopicHeader } from "@/components/topics/TopicHeader";
import { TopicPostsList } from "@/components/topics/TopicPostsList";
import { TopicSidebar } from "@/components/topics/TopicSidebar";

interface TopicShowPageProps {
  params: {
    slug: string;
  };
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
        <TopicPostsList posts={posts} topicSlug={slug} />
      </div>

      {/* Sidebar */}
      <TopicSidebar topic={topic} postsCount={posts.length} />
    </div>
  );
}

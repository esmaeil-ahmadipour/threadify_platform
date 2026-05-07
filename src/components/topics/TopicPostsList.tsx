import { EmptyState } from "@/components/shared/EmptyState";
import { PostCard } from "./PostCard";

interface Post {
  id: string;
  title: string;
  content: string;
  createdAt: Date;
  user: {
    name: string | null;
    image: string | null;
  };
}

interface TopicPostsListProps {
  posts: Post[];
  topicSlug: string;
}

export function TopicPostsList({ posts, topicSlug }: TopicPostsListProps) {
  if (posts.length === 0) {
    return <EmptyState topicSlug={topicSlug} />;
  }

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} topicSlug={topicSlug} />
      ))}
    </div>
  );
}

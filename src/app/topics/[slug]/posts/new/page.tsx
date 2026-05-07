import PostCreateForm from "@/components/posts/PostCreateForm";

interface PostCreatePageProps {
  params: {
    slug: string;
  };
}

export default async function PostCreatePage({ params }: PostCreatePageProps) {
  const { slug } = await params;

  return (
    <div className="flex justify-center items-center min-h-[80vh]">
      <PostCreateForm topicSlug={slug} />
    </div>
  );
}

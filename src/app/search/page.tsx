import { PostListLoading } from "@/components/loading/PostListLoading";
import PostList from "@/components/posts/PostList";
import { fetchPostsBySearchTerm } from "@/db/queries/posts";
import { redirect } from "next/navigation";
import { Suspense } from "react";

interface SearchPageProps {
  searchParams: Promise<{
    term: string;
  }>;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { term } = await searchParams;

  if (typeof term !== "string" || !term || !term.trim()) {
    redirect("/");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
        Search Results for: {term}
      </h1>

      {/* Add your search results component here */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm p-6">
        <p className="text-gray-600 dark:text-gray-400 pb-4">
          Showing results for: {term}
        </p>

        <Suspense fallback={<PostListLoading />}>
          <PostList fetchData={() => fetchPostsBySearchTerm(term)} />
        </Suspense>
      </div>
    </div>
  );
}

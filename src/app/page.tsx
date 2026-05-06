import TopicCreateForm from "@/components/topics/TopicCreateForm";
import { TopicsList } from "@/components/topics/TopicsList";
export default function Home() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4">
      {/* Main content */}
      <div className="md:col-span-3 space-y-4">
        <h1 className="text-xl font-semibold">Top Posts</h1>

        {/* <PostList /> */}
      </div>

      {/* Sidebar */}
      <aside className="md:col-span-1 space-y-4">
        <TopicCreateForm />
        <TopicsList />
      </aside>
    </div>
  );
}

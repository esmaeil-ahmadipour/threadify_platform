import TopicCreateForm from "@/components/topics/TopicCreateForm";

export default function Home() {
  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {/* Main content */}
      <div className="col-span-3 space-y-4">
        <h1 className="text-xl font-semibold">Top Posts</h1>

        {/* TODO: Posts list component */}
        {/* <PostList /> */}
      </div>

      {/* Sidebar */}
      <aside className="col-span-1">
        <TopicCreateForm />
      </aside>
    </div>
  );
}

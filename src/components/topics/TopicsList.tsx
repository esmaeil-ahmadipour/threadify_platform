import { db } from "@/db";
import paths from "@/paths";
import { Chip } from "@heroui/react";
import Link from "next/link";

export async function TopicsList() {
  const topicsList = await db.topic.findMany();

  const renderTopics = topicsList.map((topic) => (
    <Link key={topic.id} href={paths.topicShow(topic.slug)} className="block">
      <div className="transition-transform hover:scale-[1.03] hover:opacity-90 active:scale-[0.97]">
        <Chip
          color="warning"
          variant="primary"
          className="
          cursor-pointer
          max-w-[140px]
          px-3 py-1.5
          text-sm font-medium
          bg-yellow-500/20 text-yellow-700
          dark:bg-yellow-500/30 dark:text-yellow-200
          hover:bg-yellow-500/30 hover:shadow-sm
          dark:hover:bg-yellow-500/40
        "
        >
          <span className="truncate block">{topic.slug}</span>
        </Chip>
      </div>
    </Link>
  ));

  return (
    <div
      className="
        border border-gray-200 dark:border-gray-700
        rounded-xl p-5
        bg-white dark:bg-gray-900
        shadow-sm
      "
    >
      <h2
        className="
          text-lg font-semibold mb-4 pb-1
          text-gray-800 dark:text-gray-100
          border-b border-gray-200 dark:border-gray-700
        "
      >
        Topics
      </h2>

      <div className="flex flex-wrap gap-2">{renderTopics}</div>
    </div>
  );
}

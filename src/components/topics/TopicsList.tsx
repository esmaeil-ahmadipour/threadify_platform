import { Suspense } from "react";
import { db } from "@/db";
import paths from "@/paths";
import { Chip, Skeleton } from "@heroui/react";
import Link from "next/link";

interface SectionContainerProps {
  title: string;
  children: React.ReactNode;
  className?: string;
}

function SectionContainer({
  title,
  children,
  className = "",
}: SectionContainerProps) {
  return (
    <div
      className={`
        border border-gray-200 dark:border-gray-700
        rounded-xl p-5
        bg-white dark:bg-gray-900
        shadow-sm
        ${className}
      `}
    >
      <h2
        className="
          text-lg font-semibold mb-4 pb-1
          text-gray-800 dark:text-gray-100
          border-b border-gray-200 dark:border-gray-700
        "
      >
        {title}
      </h2>
      {children}
    </div>
  );
}

// Loading skeleton - shows chip-shaped skeletons
function TopicsListSkeleton() {
  return (
    <SectionContainer title="Topics">
      <div className="flex flex-wrap gap-2">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <Skeleton key={i} className="rounded-full">
            <Chip
              color="warning"
              variant="primary"
              className="
                cursor-pointer
                max-w-[140px]
                px-3 py-1.5
                text-sm font-medium
                bg-yellow-500/20
                dark:bg-yellow-500/30
                opacity-0
              "
            >
              <span className="truncate block">Loading</span>
            </Chip>
          </Skeleton>
        ))}
      </div>
    </SectionContainer>
  );
}

// Actual content - shows real chips
async function TopicsListContent() {
  const topicsList = await db.topic.findMany();
  // Simulate delay (optional, remove in production)
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  return (
    <SectionContainer title="Topics">
      <div className="flex flex-wrap gap-2">
        {topicsList.map((topic) => (
          <Link
            key={topic.id}
            href={paths.topicShow(topic.slug)}
            className="block"
          >
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
        ))}
      </div>
    </SectionContainer>
  );
}

// Main export with Suspense
export function TopicsList() {
  return (
    <Suspense fallback={<TopicsListSkeleton />}>
      <TopicsListContent />
    </Suspense>
  );
}

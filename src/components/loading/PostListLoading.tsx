import { Skeleton } from "@heroui/react";

export function PostListLoading() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow"
        >
          <div className="space-y-3">
            {/* Title skeleton */}
            <Skeleton className="rounded-lg w-2/3">
              <div className="h-7 rounded-lg bg-gray-200 dark:bg-gray-500"></div>
            </Skeleton>

            {/* Content skeleton - line-clamp-2 style */}
            <div className="space-y-2">
              <Skeleton className="rounded-lg w-full">
                <div className="h-4 rounded-lg bg-gray-100 dark:bg-gray-500"></div>
              </Skeleton>
            </div>

            {/* Footer skeleton - matches flex layout */}
            <div className="flex items-center justify-between pt-2">
              <div className="flex items-center gap-2">
                <Skeleton className="rounded-lg w-32">
                  <div className="h-4 rounded-lg bg-gray-200 dark:bg-gray-500"></div>
                </Skeleton>
              </div>

              <div className="flex items-center gap-4">
                <Skeleton className="rounded-lg w-20">
                  <div className="h-4 rounded-lg bg-gray-200 dark:bg-gray-500"></div>
                </Skeleton>
                <Skeleton className="rounded-lg w-24">
                  <div className="h-4 rounded-lg bg-gray-200 dark:bg-gray-500"></div>
                </Skeleton>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

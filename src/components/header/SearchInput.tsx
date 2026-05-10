"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import * as actions from "@/actions";

// Inner component that uses useSearchParams
function SearchInputInner() {
  const searchParams = useSearchParams();
  const defaultInputValue = searchParams.get("term") || "";

  return (
    <form action={actions.search}>
      <input
        type="text"
        name="term"
        placeholder="Search..."
        defaultValue={defaultInputValue}
        className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
      />
    </form>
  );
}

// Wrapper with Suspense boundary
export function SearchInput() {
  return (
    <Suspense
      fallback={
        <input
          type="text"
          placeholder="Search..."
          disabled
          className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 opacity-50"
        />
      }
    >
      <SearchInputInner />
    </Suspense>
  );
}

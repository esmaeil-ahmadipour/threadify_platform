"use client";

import { useState } from "react";

export function SearchInput() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    // Add your search logic here (e.g., router.push, API call, etc.)
  };

  return (
    <input
      type="text"
      placeholder="Search..."
      value={searchQuery}
      onChange={handleSearch}
      className="w-full px-4 py-2 rounded-lg border border-default-200 bg-default-100 text-foreground placeholder:text-default-400 focus:outline-none focus:ring-2 focus:ring-primary"
    />
  );
}

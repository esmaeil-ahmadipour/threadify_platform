import Link from "next/link";

export default function NotFound() {
  return (
    <div className="text-center py-12">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">
        Not Found
      </h2>
      <p className="mb-4 text-gray-600 dark:text-gray-400">
        Could not find the requested resource
      </p>
      <Link
        href="/"
        className="text-blue-600 dark:text-blue-400 hover:underline"
      >
        Return Home
      </Link>
    </div>
  );
}

interface TopicHeaderProps {
  slug: string;
  description: string;
}

export function TopicHeader({ slug, description }: TopicHeaderProps) {
  return (
    <div className="border-b border-gray-200 dark:border-gray-700 pb-4">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
        {slug}
      </h1>
      <p className="text-gray-600 dark:text-gray-400 mt-2">{description}</p>
    </div>
  );
}

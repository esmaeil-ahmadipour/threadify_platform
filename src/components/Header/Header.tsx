import Link from "next/link";
 import { AuthButtons } from "./AuthButtons";
import { SearchInput } from "./SearchInput";
import IconImage from "../IconImage";

export default function Header() {
  return (
    <nav className="sticky top-0 z-40 w-full border-b border-separator bg-background/70 backdrop-blur-lg shadow mb-6">
      <header className="mx-auto flex h-16 max-w-7xl items-center justify-between px-6">
        {/* Brand / Logo */}

        <div className="flex items-center gap-2">
          <IconImage
            src="/icon.png"
            containerSize={64}
            fitToSquare
            rounded
            roundedSize="lg"
            extraSpace
            noBorder
          />
          <Link
            href="/"
            className="font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent hover:from-purple-600 hover:to-blue-600 transition-all duration-300"
          >
            Threadify
          </Link>
        </div>

        {/* Desktop Search */}
        <div className="hidden md:block flex-1 max-w-md mx-4">
          <SearchInput />
        </div>

        {/* Auth Section */}
        <div className="flex items-center gap-3">
          <AuthButtons  />
        </div>
      </header>

      {/* Mobile Search */}
      <div className="md:hidden px-6 pb-3">
        <SearchInput />
      </div>
    </nav>
  );
}

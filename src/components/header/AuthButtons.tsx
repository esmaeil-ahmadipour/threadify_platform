"use client";

import {
  Button,
  Avatar,
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@heroui/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "../../app/actions";
import { Skeleton } from "../Skleton";

export function AuthButtons() {
  const { data: session, status } = useSession();
  const isAuthenticated = status === "authenticated";
  const isLoading = status === "loading";

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        <Skeleton className="w-10 h-10 rounded-full" />
      </div>
    );
  }

  if (isAuthenticated && session?.user) {
    return (
      <Popover>
        <PopoverTrigger>
          <Avatar.Root className="cursor-pointer hover:opacity-80 transition-opacity">
            <Avatar.Image src={session.user.image || ""} />
            <Avatar.Fallback>
              {session.user.name?.[0] || session.user.email?.[0] || "U"}
            </Avatar.Fallback>
          </Avatar.Root>
        </PopoverTrigger>
        <PopoverContent placement="left">
          <div className="p-4 min-w-[200px]">
            <div className="mb-4 border-b pb-3">
              <p className="font-medium">{session.user.name || "User"}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                {session.user.email}
              </p>
            </div>
            <form action={signOut}>
              <Button type="submit" variant="danger" className="w-full">
                Sign Out
              </Button>
            </form>
          </div>
        </PopoverContent>
      </Popover>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <form action={signIn}>
        <Button type="submit" variant="danger">
          Sign In
        </Button>
      </form>
      <form action={signIn}>
        <Button type="submit" variant="primary">
          Sign Up
        </Button>
      </form>
    </div>
  );
}

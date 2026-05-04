"use client";

import { Button, Avatar } from "@heroui/react";
import { useSession } from "next-auth/react";
import { signIn, signOut } from "../../app/actions";
import { Skeleton } from "../skleton";

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
      <form action={signOut}>
        <Avatar.Root className="cursor-pointer hover:opacity-80 transition-opacity">
          <Avatar.Image src={session.user.image || ""} />
          <Avatar.Fallback>
            {session.user.name?.[0] || session.user.email?.[0] || "U"}
          </Avatar.Fallback>
        </Avatar.Root>
      </form>
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

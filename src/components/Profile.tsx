"use client";

import { useSession } from "next-auth/react";
import { Button } from "@heroui/react";
import { signIn, signOut } from "../app/actions";
import { Skeleton } from "./skleton";

export default function Profile() {
  const { data: session, status } = useSession();
  const isSignedIn = status === "authenticated";

  if (status === "loading") {
    return (
      <div className="text-center">
        {/* Avatar skeleton */}
        <Skeleton className="w-16 h-16 rounded-full mx-auto mb-4" />

        {/* Welcome text skeleton */}
        <div className="space-y-2 mb-4">
          <Skeleton className="w-48 h-6 mx-auto rounded-md" />
        </div>

        {/* Email text skeleton */}
        <Skeleton className="w-56 h-4 mx-auto mb-4 rounded-md" />

        {/* Button skeleton */}
        <Skeleton className="w-24 h-10 mx-auto rounded-full" />
      </div>
    );
  }
  return isSignedIn ? (
    <div className="text-center">
      {session?.user?.image && (
        <img
          src={session.user.image}
          alt="avatar"
          className="w-16 h-16 rounded-full mx-auto mb-4"
        />
      )}
      <p className="text-lg mb-4">
        👋 Welcome,{" "}
        <strong>{session?.user?.name || session?.user?.email}</strong>
      </p>
      <p className="text-sm text-gray-500 mb-4">
        Logged in with {session?.user?.email}
      </p>
      <form action={signOut}>
        <Button type="submit" variant="danger">
          Sign Out
        </Button>
      </form>
    </div>
  ) : (
    <form action={signIn}>
      <Button type="submit" variant="primary">
        Sign In with GitHub
      </Button>
    </form>
  );
}

import { auth } from "@/utils/auth";
import { Button } from "@heroui/react";
import { signIn, signOut } from "./actions";
import Profile from "@/components/Profile";

export default async function Home() {
  const session = await auth();

  return (
    <>
      <Profile />
    </>
  );
}

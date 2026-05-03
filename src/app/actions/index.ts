"use server";

import { signIn as authSignIn, signOut as authSignOut } from "@/utils/auth";

export async function signIn() {
  await authSignIn("github", { redirectTo: "/" });
}

export async function signOut() {
  await authSignOut({ redirectTo: "/" });
}

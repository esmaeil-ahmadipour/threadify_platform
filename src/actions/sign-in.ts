"use server";

import { signIn as authSignIn } from "@/utils/auth";

export async function signIn() {
  await authSignIn("github", { redirectTo: "/" });
}

"use server";

import { auth } from "@/utils/auth";
import { z } from "zod";
import type { Post } from "@prisma/client";
import { db } from "@/db";
import paths from "@/paths";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createPostSchema = z.object({
  title: z
    .string()
    .min(3, { message: "Title must be at least 3 characters" })
    .max(100, { message: "Title must be less than 100 characters" }),
  content: z
    .string()
    .min(10, { message: "Content must be at least 10 characters" })
    .max(1000, { message: "Content must be less than 1000 characters" }),
});

export interface CreatePostFormState {
  errors: {
    title?: string[];
    content?: string[];
    _form?: string[];
  };
}

export async function createPost(
  formState: CreatePostFormState,
  formData: FormData,
  topicSlug: string,
): Promise<CreatePostFormState> {
  // Simulate delay (optional, remove in production)
  // await new Promise((resolve) => setTimeout(resolve, 1500));

  // Validate form data
  const result = createPostSchema.safeParse({
    title: formData.get("title"),
    content: formData.get("content"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  // Check authentication
  const session = await auth();
  if (!session || !session.user || !session.user.id) {
    return {
      errors: {
        _form: ["You must be signed in to create a post."],
      },
    };
  }

  // Get the topic by slug
  const topic = await db.topic.findUnique({
    where: { slug: topicSlug },
  });

  if (!topic) {
    return {
      errors: {
        _form: ["Topic not found."],
      },
    };
  }

  let post: Post;

  try {
    post = await db.post.create({
      data: {
        title: result.data.title,
        content: result.data.content,
        userId: session.user.id, // Now guaranteed to be a string
        topicId: topic.id,
      },
    });
  } catch (err: unknown) {
    if (err instanceof Error) {
      return {
        errors: {
          _form: [err.message],
        },
      };
    } else {
      return {
        errors: {
          _form: ["Something went wrong while creating the post."],
        },
      };
    }
  }

  // Revalidate the topic show page to show the new post
  revalidatePath(paths.topicShow(topicSlug));

  // Redirect to the new post page
  redirect(paths.postShow(topicSlug, post.id));
}

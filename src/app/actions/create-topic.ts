"use server";
import { z } from "zod";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3, { message: "Name must be at least 3 characters" })
    .regex(/^[a-z-]+$/, {
      message: "Use lowercase letters and hyphens only, no spaces",
    }),
  description: z
    .string()
    .max(250, { message: "Description must be under 250 characters" })
    .min(10, { message: "Description must be at least 10 characters" }),
});

export async function createTopic(formData: FormData) {
  // Extract form data
  const name = formData.get("name") as string;
  const description = formData.get("description") as string;

  // Validate
  const result = createTopicSchema.safeParse({
    name,
    description,
  });

  // Handle validation errors
  if (!result.success) {
    const errors = result.error.flatten().fieldErrors;
    console.error("Validation failed:", errors);

    // Return errors to the client
    return {
      errors: {
        name: errors.name?.[0],
        description: errors.description?.[0],
      },
    };
  }

  // If validation passes, proceed with creating the topic
  const { name: validName, description: validDescription } = result.data;

  // TODO: Save to database
  console.log("Creating topic:", {
    name: validName,
    description: validDescription,
  });

  // TODO: Revalidate the homepage
  revalidatePath("/");

  // Optional: redirect after successful creation
  // redirect("/");

  // Return success
  return { success: true };
}

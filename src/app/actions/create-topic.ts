"use server";

import { auth } from "@/utils/auth";
import { z } from "zod";
import type { Topic } from "@prisma/client";
import { db } from "@/db";
import paths from "@/paths";
import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";

const createTopicSchema = z.object({
  name: z
    .string()
    .min(3)
    .regex(/[a-z-]/, {
      message: "Must be lowercase letters or dashes without spaces",
    }),
  description: z.string().min(10),
});

interface CreateTopicFormState {
  errors: {
    name?: string[];
    description?: string[];
    _form?: string[];
  };
}

export async function createTopic(
  formState: CreateTopicFormState,
  formData: FormData,
): Promise<CreateTopicFormState> {
  const result = createTopicSchema.safeParse({
    name: formData.get("name"),
    description: formData.get("description"),
  });

  if (!result.success) {
    return {
      errors: result.error.flatten().fieldErrors,
    };
  }

  const session = await auth();
  if (!session || !session.user) {
    return {
      errors: {
        _form: ["You must be signed in to do this."],
      },
    };
  }

  let topic: Topic;

  try {
    topic = await db.topic.create({
      data: {
        slug: result.data.name,
        description: result.data.description,
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
          _form: ["Something wet wrong!"],
        },
      };
    }
  }
  revalidatePath("/");
  redirect(paths.topicShow(topic.slug));
}

// "use server";

// import { z } from "zod";
// import { revalidatePath } from "next/cache";

// const createTopicSchema = z.object({
//   name: z
//     .string()
//     .min(3, { message: "Name must be at least 3 characters" })
//     .regex(/^[a-z-]+$/, {
//       message: "Use lowercase letters and hyphens only, no spaces",
//     }),
//   description: z
//     .string()
//     .min(10, { message: "Description must be at least 10 characters" })
//     .max(250, { message: "Description must be under 250 characters" }),
// });

// type CreateTopicState = {
//   errors: { name: string; description: string };
//   success?: boolean;
// };

// export async function createTopic(
//   prevState: CreateTopicState,
//   formData: FormData,
// ): Promise<CreateTopicState> {
//   const name = formData.get("name") as string;
//   const description = formData.get("description") as string;

//   const result = createTopicSchema.safeParse({ name, description });

//   if (!result.success) {
//     const errors = result.error.flatten().fieldErrors;
//     return {
//       errors: {
//         name: errors.name?.[0] || "",
//         description: errors.description?.[0] || "",
//       },
//     };
//   }

//   const { name: validName, description: validDescription } = result.data;

//   // TODO: Save to database
//   console.log("Creating topic:", {
//     name: validName,
//     description: validDescription,
//   });

//   revalidatePath("/");

//   return { success: true, errors: { name: "", description: "" } };
// }

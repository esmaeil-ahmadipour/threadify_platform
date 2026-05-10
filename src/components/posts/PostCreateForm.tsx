"use client";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Form,
  TextField,
  TextArea,
  Input,
} from "@heroui/react";
import { useActionState, useState, startTransition } from "react";
import * as actions from "@/actions";
import type { CreatePostFormState } from "@/actions/create-post";

// --------------------------------------------------------------
// Inner component that holds the form logic.
// It gets a new key every time the popover opens → fresh state.
// --------------------------------------------------------------
function PostForm({
  onClose,
  topicSlug,
}: {
  onClose: () => void;
  topicSlug: string;
}) {
  const [formState, action, isPending] = useActionState(
    (state: CreatePostFormState, formData: FormData) =>
      actions.createPost(state, formData, topicSlug),
    {
      errors: {},
    } as CreatePostFormState,
  );

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="w-96 p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Create a Post in {topicSlug}
      </h3>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Title Field */}
        <div>
          <TextField
            name="title"
            aria-label="Title"
            isRequired
            isInvalid={!!formState.errors.title}
            isDisabled={isPending}
          >
            <Input
              placeholder="Post title"
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </TextField>
          {formState.errors.title && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {formState.errors.title?.join(", ")}
            </p>
          )}
        </div>

        {/* Content Field */}
        <div>
          <TextField
            name="content"
            isRequired
            aria-label="Content"
            isInvalid={!!formState.errors.content}
            isDisabled={isPending}
          >
            <TextArea
              placeholder="Write your post content..."
              rows={6}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </TextField>
          {formState.errors.content && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {formState.errors.content?.join(", ")}
            </p>
          )}
        </div>

        {formState.errors._form && (
          <div className="text-red-500 dark:text-red-400 text-sm mt-1">
            {formState.errors._form?.join(", ")}
          </div>
        )}

        <div className="flex gap-2 justify-end mt-2">
          <Button
            variant="outline"
            onPress={onClose}
            className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            variant="primary"
            isPending={isPending}
            className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
          >
            {isPending ? "Creating..." : "Submit"}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// --------------------------------------------------------------
// Main component – manages popover open/close and a key that
// forces a fresh instance of PostForm every time.
// --------------------------------------------------------------
interface PostCreateFormProps {
  topicSlug: string;
}

export default function PostCreateForm({ topicSlug }: PostCreateFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [formKey, setFormKey] = useState(0);

  const openPopover = () => {
    setFormKey((prev) => prev + 1);
    setIsOpen(true);
  };

  const closePopover = () => {
    setIsOpen(false);
  };

  return (
    <Popover isOpen={isOpen} onOpenChange={(open) => !open && closePopover()}>
      <PopoverTrigger>
        <Button
          variant="primary"
          onPress={openPopover}
          className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
        >
          Create a Post
        </Button>
      </PopoverTrigger>
      <PopoverContent placement="bottom end">
        <PostForm key={formKey} onClose={closePopover} topicSlug={topicSlug} />
      </PopoverContent>
    </Popover>
  );
}

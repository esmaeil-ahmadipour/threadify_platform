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
import * as actions from "@/app/actions";
 
// --------------------------------------------------------------
// Inner component that holds the form logic.
// It gets a new key every time the popover opens → fresh state.
// --------------------------------------------------------------
function TopicForm({ onClose }: { onClose: () => void }) {
  const [formState, action, isPending] = useActionState(actions.createTopic, {
    errors: {},
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    startTransition(() => {
      action(formData);
    });
  }

  return (
    <div className="w-80 p-4 bg-white dark:bg-gray-800 rounded-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-900 dark:text-white">
        Create a Topic
      </h3>

      <Form onSubmit={handleSubmit} className="flex flex-col gap-4">
        {/* Name Field */}
        <div>
          <TextField
            name="name"
            aria-label="Name"
            isRequired
            isInvalid={!!formState.errors.name}
            isDisabled={isPending}
          >
            <Input
              placeholder="my-topic-name"
              className="w-full bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </TextField>
          {formState.errors.name && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {formState.errors.name?.join(", ")}
            </p>
          )}
        </div>

        {/* Description Field */}
        <div>
          <TextField
            name="description"
            isRequired
            aria-label="Description"
            isInvalid={!!formState.errors.description}
            isDisabled={isPending}
          >
            <TextArea
              placeholder="Describe your topic..."
              rows={4}
              className="bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            />
          </TextField>
          {formState.errors.description && (
            <p className="text-red-500 dark:text-red-400 text-sm mt-1">
              {formState.errors.description?.join(", ")}
            </p>
          )}
        </div>

        {/* {state.success && (
          <Description className="text-green-600 dark:text-green-400 text-center">
            ✓ Topic created successfully! You can create another topic.
          </Description>
        )} */}

        {formState.errors._form ? (
          <div className="text-red-500 dark:text-red-400 text-sm mt-1">
            {formState.errors._form?.join(", ")}
          </div>
        ) : null}

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
// forces a fresh instance of TopicForm every time.
// --------------------------------------------------------------
export default function TopicCreateForm() {
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
          Create a Topic
        </Button>
      </PopoverTrigger>
      <PopoverContent placement="bottom end">
        <TopicForm key={formKey} onClose={closePopover} />
      </PopoverContent>
    </Popover>
  );
}

"use client";

import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  Label,
  Input,
  TextArea,
} from "@heroui/react";

import { createTopic } from "../../app/actions";

export default function TopicCreateForm() {
  const handleSubmit = async (formData: FormData) => {
    const result = await createTopic(formData);
  };

  return (
    <Popover>
      <PopoverTrigger>
        <Button variant="primary">Create a Topic</Button>
      </PopoverTrigger>

      <PopoverContent placement="left">
        <div className="p-6 w-80 bg-white dark:bg-gray-900 rounded-xl shadow-lg border border-gray-200 dark:border-gray-900 transition-colors duration-200">
          {/* Header */}
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
            Create a Topic
          </h3>

          {/* Form */}
          <form className="flex flex-col gap-5 mt-4" action={handleSubmit}>
            {/* Name */}
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Name
              </Label>
              <Input
                name="name"
                placeholder="Name"
                variant="primary"
                color="primary"
                className="mt-1 w-full"
              />
            </div>

            {/* Description */}
            <div>
              <Label className="text-sm font-medium text-gray-900 dark:text-gray-300">
                Description
              </Label>
              <TextArea
                name="description"
                placeholder="Describe your topic"
                variant="primary"
                color="primary"
                className="mt-1 w-full"
              />
            </div>

            {/* Submit */}
            <Button
              type="submit"
              variant="primary"
              className="w-full font-semibold mt-2"
            >
              Submit
            </Button>
          </form>
        </div>
      </PopoverContent>
    </Popover>
  );
}

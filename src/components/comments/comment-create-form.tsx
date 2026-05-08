"use client";

import {
  startTransition,
  useActionState,
  useEffect,
  useRef,
  useState,
} from "react";
import { Button, TextArea, TextField } from "@heroui/react";
import * as actions from "@/app/actions";
import FormButton from "../common/form-button";
import { CommentIcon } from "@/components/icons/CommentIcon";
import { WriteIcon } from "@/components/icons/WriteIcon";
import { CloseIcon } from "@/components/icons/CloseIcon";
import { SendIcon } from "@/components/icons/SendIcon";

interface CommentCreateFormProps {
  postId: string;
  parentId?: string;
  startOpen?: boolean;
}

export default function CommentCreateForm({
  postId,
  parentId,
  startOpen,
}: CommentCreateFormProps) {
  const [open, setOpen] = useState(startOpen ?? false);
  const ref = useRef<HTMLFormElement | null>(null);

  const [formState, action, isPending] = useActionState(
    actions.createComment.bind(null, { postId, parentId }),
    { errors: {} },
  );

  useEffect(() => {
    if (!formState.success) return;

    ref.current?.reset();

    if (!startOpen && open) {
      startTransition(() => {
        setOpen(false);
      });
    }
  }, [formState.success, startOpen, open]);

  const closeForm = () => {
    if (isPending) return;
    setOpen(false);
  };

  const form = (
    <form action={action} ref={ref} className="mt-4">
      <div className="space-y-3">
        <TextField
          name="content"
          isRequired
          aria-label="Content"
          isInvalid={!!formState.errors.content}
          isDisabled={isPending}
          className="w-full"
        >
          <TextArea
            className="min-h-[110px] rounded-xl bg-white dark:bg-gray-900 text-gray-900 dark:text-white shadow-sm ring-1 ring-inset ring-gray-200 dark:ring-gray-700 transition placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400"
            placeholder="Write your comment..."
            rows={4}
          />
        </TextField>

        {formState.errors._form && (
          <div className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-600 dark:border-red-800 dark:bg-red-950/30 dark:text-red-300">
            {formState.errors._form?.join(", ")}
          </div>
        )}

        <div className="flex items-center justify-end gap-2 pt-1">
          <Button
            size="lg"
            variant="outline"
            onPress={closeForm}
            isDisabled={isPending}
          >
            Cancel <CloseIcon size={14} />
          </Button>

          <FormButton isLoading={isPending}>
            Post Comment <SendIcon size={14} />
          </FormButton>
        </div>
      </div>
    </form>
  );

  return (
    <div className="w-full">
      {!open ? (
        <Button size="sm" variant="outline" onPress={() => setOpen(true)}>
          Write a comment... <WriteIcon size={16} />
        </Button>
      ) : (
        <div className="rounded-2xl border border-gray-200 bg-gray-50/80 p-4 shadow-sm backdrop-blur-sm dark:border-gray-700 dark:bg-gray-900/40">
          <div className="mb-3 flex items-center gap-2">
            <CommentIcon
              size={20}
              className="text-gray-500 dark:text-gray-400"
            />
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {parentId ? "Reply to comment" : "Add your comment"}
            </span>
          </div>

          {form}
        </div>
      )}
    </div>
  );
}

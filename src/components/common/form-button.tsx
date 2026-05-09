"use client";
import { Button } from "@heroui/react";

interface FormButtonProps {
  children: React.ReactNode;
  isLoading: boolean;
}

export default function FormButton({ children, isLoading }: FormButtonProps) {
  return (
    <Button
      type="submit"
      isPending={isLoading}
      className="bg-blue-600 dark:bg-blue-500 text-white hover:bg-blue-700 dark:hover:bg-blue-600"
    >
      {children}
    </Button>
  );
}

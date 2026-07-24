"use client";

import { toastStyles } from "@/lib/toast.style";
import { useState } from "react";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "../ui/alert-dialog";
import { Loader2, TriangleAlert } from "lucide-react";

interface ConfirmDeleteDialogProps {
  /** The trigger element — e.g. Trash2 icon button */
  children: React.ReactNode;
  /** What's being deleted, used in the default copy: "vehicle", "booking", "customer" etc. */
  itemLabel: string;
  /** Optional identifier shown in the description, e.g. plate number or booking ID */
  itemName?: string;
  /** Override the title entirely if the default doesn't fit */
  title?: string;
  /** Override the description entirely if the default doesn't fit */
  description?: string;
  /** Called when the user confirms. Throw to keep the dialog open and surface an error toast. */
  onConfirm: () => Promise<void> | void;
  /** Called after a successful delete, e.g. to refresh a list or close a parent modal */
  onDeleted?: () => void;
  confirmLabel?: string;
  cancelLabel?: string;
  disabled?: boolean;
}

const ConfirmDeleteDialog = ({
  children,
  itemLabel,
  itemName,
  title,
  description,
  onConfirm,
  onDeleted,
  confirmLabel = "Delete",
  cancelLabel = "Cancel",
  disabled = false,
}: ConfirmDeleteDialogProps) => {
  const [open, setOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const resolvedTitle = title ?? `Delete this ${itemLabel}?`;
  const resolvedDescription =
    description ??
    (itemName
      ? `This will permanently remove ${itemName}. This action cannot be undone.`
      : `This will permanently remove this ${itemLabel}. This action cannot be undone.`);

  const handleConfirm = async () => {
    setIsDeleting(true);
    try {
      await onConfirm();
      toast.success(
        `${itemLabel.charAt(0).toUpperCase()}${itemLabel.slice(1)} deleted successfully.`,
        { position: "bottom-right", style: toastStyles.success },
      );
      setOpen(false);
      onDeleted?.();
    } catch (error: unknown) {
      toast.error(
        error instanceof Error
          ? error.message
          : `Unable to delete this ${itemLabel}. Please try again.`,
        { position: "bottom-right", style: toastStyles.error },
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={disabled ? undefined : setOpen}>
      <AlertDialogTrigger
        disabled={disabled}
        render={children as React.ReactElement<React.ComponentProps<"button">>}
      />

      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-full bg-red-300 sm:mx-0">
            <TriangleAlert className="h-5 w-5 text-red-700" />
          </div>
          <AlertDialogTitle>{resolvedTitle}</AlertDialogTitle>
          <AlertDialogDescription>{resolvedDescription}</AlertDialogDescription>
        </AlertDialogHeader>

        <AlertDialogFooter>
          <AlertDialogCancel disabled={isDeleting} variant="ghost">
            {cancelLabel}
          </AlertDialogCancel>
          <AlertDialogAction
            className="bg-red-500/10 text-red-600 hover:bg-red-500/20 focus-visible:border-red-500/40 focus-visible:ring-red-500/20 dark:bg-red-500/20 dark:hover:bg-red-500/30 dark:focus-visible:ring-red-500/40"
            disabled={isDeleting}
            onClick={handleConfirm}
          >
            {isDeleting ? (
              <span className="flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" />
                Deleting...
              </span>
            ) : (
              confirmLabel
            )}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDeleteDialog;

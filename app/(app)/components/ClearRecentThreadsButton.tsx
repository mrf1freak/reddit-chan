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
} from "@/components/ui/alert-dialog";
import { SidebarGroupAction } from "@/components/ui/sidebar";

type Props = {
  onClear: () => void;
};

export function ClearRecentThreadsButton({ onClear }: Props) {
  return (
    <AlertDialog>
      <AlertDialogTrigger
        render={
          <SidebarGroupAction
            title="Clear all"
            className="text-xs text-muted-foreground whitespace-nowrap mr-2"
          />
        }
      >
        Clear All
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Clear all recent threads?</AlertDialogTitle>
          <AlertDialogDescription>
            This removes every thread from your recent threads list. This
            can&apos;t be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction onClick={onClear}>Clear All</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

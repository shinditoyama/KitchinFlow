import { AlertTriangleIcon, TrashIcon } from "@repo/ui";
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
} from "@repo/ui/components/alert-dialog";
import { Button } from "@repo/ui/components/button";
import { Spinner } from "@repo/ui/components/spinner";

interface AlertModalProps {
  name: string;
  isDeleting: boolean;
  onDelete: () => void;
}

export function AlertModal({ name, isDeleting, onDelete }: AlertModalProps) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <TrashIcon />
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader className="place-items-center! items-center">
          <div className="bg-destructive/10 mx-auto size-12 flex items-center justify-center rounded-full">
            <AlertTriangleIcon className="text-destructive size-6" />
          </div>
          <AlertDialogTitle className="font-bold">
            Você tem certeza absoluta?
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Esta ação não pode ser desfeita. Isso excluirá permanentemente o
            item <strong>{name}</strong> do registro.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isDeleting}
            onClick={onDelete}
          >
            {isDeleting ? <Spinner /> : "Sim, excluir"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

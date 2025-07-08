import type { IDog } from "../interface";
import Dialog from "./Dialog";
import { useDeleteDog } from "../hooks/useDogs";

type IDeleteDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dog: IDog;
};

const DeleteDialog: React.FC<IDeleteDialogProps> = ({
  isOpen,
  setIsOpen,
  dog,
}: IDeleteDialogProps) => {
  const { mutate: deleteDog, isPending } = useDeleteDog();

  const handleDeleteCancel = () => {
    setIsOpen(false);
  };

  const handleDeleteConfirm = () => {
    deleteDog(dog.id!, {
      onSuccess: () => {
        setIsOpen(false);
      },
    });
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Are you sure?"
      body={
        <p className="text-gray-600">
          This action is irreversible and will permanently delete this breed.
        </p>
      }
      confirmLoading={isPending}
      onCancel={handleDeleteCancel}
      onConfirm={handleDeleteConfirm}
    />
  );
};
export default DeleteDialog;

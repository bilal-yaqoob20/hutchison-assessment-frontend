import Dialog from "./Dialog";
import ChipInput from "./ChipInput";
import type { IDog } from "../interface";
import { useState } from "react";
import { useEditDog } from "../hooks/useDogs";

type IEditDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
  dog: IDog;
};

const EditDialog: React.FC<IEditDialogProps> = ({
  isOpen,
  setIsOpen,
  dog,
}: IEditDialogProps) => {
  const { mutate: editDog, isPending } = useEditDog();
  const [subBreeds, setSubBreeds] = useState<string[]>(dog.subBreeds || []);

  const handleEditCancel = () => {
    setIsOpen(false);
  };

  const handleEditConfirm = async () => {
    editDog(
      { id: dog.id!, subBreeds },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Edit Sub Breed"
      body={
        <div>
          <ChipInput
            chips={subBreeds}
            setChips={setSubBreeds}
            label="Sub Breeds"
            placeholder={
              subBreeds.length ? "" : "Add sub breeds (Press Enter to add)"
            }
          />
        </div>
      }
      onCancel={handleEditCancel}
      onConfirm={handleEditConfirm}
      confirmLoading={isPending}
    />
  );
};
export default EditDialog;

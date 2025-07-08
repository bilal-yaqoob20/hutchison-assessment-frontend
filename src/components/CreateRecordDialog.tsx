import { useState } from "react";
import ChipInput from "./ChipInput";
import Dialog from "./Dialog";
import { useCreateDog } from "../hooks/useDogs";
import InputField from "./InputField";

type ICreateDialogProps = {
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
};

const CreateDialog: React.FC<ICreateDialogProps> = ({
  isOpen,
  setIsOpen,
}: ICreateDialogProps) => {
  const { mutate: createDog, isPending } = useCreateDog();
  const [breedInput, setBreedInput] = useState<string>("");
  const [subBreeds, setSubBreeds] = useState<string[]>([]);
  const [isCreateDisabled, setIsCreateDisabled] = useState<boolean>(true);

  const handleCreateConfirm = async () => {
    createDog(
      { breed: breedInput, subBreeds },
      {
        onSuccess: () => {
          setIsOpen(false);
        },
      }
    );
  };

  const handleCreateCancel = () => {
    setIsOpen(false);
  };

  const handleBreedInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setIsCreateDisabled(event.target.value.trim() === "");
    setBreedInput(event.target.value);
  };

  return (
    <Dialog
      isOpen={isOpen}
      title="Add Breed"
      body={
        <>
          <InputField
            value={breedInput}
            onChange={handleBreedInputChange}
            label="Breed"
            required
          />
          <ChipInput
            setChips={setSubBreeds}
            chips={subBreeds}
            label="Sub Breeds"
            placeholder={
              subBreeds.length ? "" : "Add sub breeds (Press Enter to add)"
            }
          />
        </>
      }
      onCancel={handleCreateCancel}
      onConfirm={handleCreateConfirm}
      confirmLoading={isPending}
      confirmDisabled={isCreateDisabled}
    />
  );
};
export default CreateDialog;

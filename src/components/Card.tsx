import React, { useState } from "react";
import Button from "./Button";
import { Pencil, Trash2 } from "lucide-react";
import EditDialog from "./EditDialog";
import DeleteDialog from "./DeleteDialog";
import type { IDog } from "../interface";

type ICardProps = {
  dog: IDog;
};

const Card: React.FC<ICardProps> = ({ dog }: ICardProps) => {
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [isEditDialogOpen, setEditDialogOpen] = useState(false);

  const handleDeleteClick = () => {
    setDeleteDialogOpen(true);
  };

  const handleEditClick = () => {
    setEditDialogOpen(true);
  };

  return (
    <div>
      {isEditDialogOpen && (
        <EditDialog
          isOpen={isEditDialogOpen}
          setIsOpen={setEditDialogOpen}
          dog={dog}
        />
      )}
      {isDeleteDialogOpen && (
        <DeleteDialog
          isOpen={isDeleteDialogOpen}
          setIsOpen={setDeleteDialogOpen}
          dog={dog}
        />
      )}

      <div className="flex items-center justify-between bg-blue-100 text-blue-900 rounded-2xl px-6 py-4 shadow-md transition-transform transform-gpu origin-center duration-200 ease-in-out hover:scale-[1.02] hover:shadow-lg m-5">
        <div>
          <div className="text-lg font-semibold">{dog.breed}</div>
          <div className="flex flex-wrap items-center gap-2 mt-2">
            {dog.subBreeds.map((subBreed, index) => (
              <div key={index} className="flex items-center gap-1">
                <div className="flex items-center p-2 bg-blue-500 text-white rounded-2xl">
                  <p className="text-sm">{subBreed}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <Button
            label="Edit"
            onClick={handleEditClick}
            icon={Pencil}
            variant="primary"
          />
          <Button
            label="Delete"
            onClick={handleDeleteClick}
            icon={Trash2}
            variant="danger"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;

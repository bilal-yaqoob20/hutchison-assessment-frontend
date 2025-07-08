import React from "react";
import Button from "./Button";

type DialogProps = {
  isOpen: boolean;
  title: string;
  body: React.ReactNode;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
  confirmLoading?: boolean;
  confirmDisabled?: boolean;
};

const Dialog: React.FC<DialogProps> = ({
  isOpen,
  title,
  body,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  onCancel,
  confirmDisabled,
  confirmLoading,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-gray-500/75">
      <div className="bg-white rounded-xl p-6 shadow-lg w-full max-w-md space-y-3">
        <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
        {body}
        <div className="flex justify-end space-x-3">
          <Button label={cancelLabel} onClick={onCancel} />
          <Button
            disabled={confirmDisabled}
            loading={confirmLoading}
            label={confirmLabel}
            onClick={onConfirm}
            variant="primary"
          />
        </div>
      </div>
    </div>
  );
};

export default Dialog;

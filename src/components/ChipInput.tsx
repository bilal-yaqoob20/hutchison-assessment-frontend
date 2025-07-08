import { CircleX } from "lucide-react";
import { useState } from "react";

type ChipInputProps = {
  chips: string[];
  setChips: (chips: string[]) => void;
  label: string;
  placeholder?: string;
};

const ChipInput: React.FC<ChipInputProps> = ({
  chips,
  setChips,
  label,
  placeholder,
}: ChipInputProps) => {
  const [inputValue, setInputValue] = useState<string>("");

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(event.target.value);
  };

  const handleInputKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && inputValue.trim() !== "") {
      setChips([...chips, inputValue.trim()]);
      setInputValue("");
    }
  };

  const handleRemoveChip = (chipToRemove: string) => {
    setChips(chips.filter((chip) => chip !== chipToRemove));
  };

  return (
    <div className="flex flex-col space-y-1">
      <label className="text-sm font-medium text-gray-700">{label}</label>
      {chips.map((chip, index) => (
        <div key={index} className="flex items-center gap-1">
          <div className="flex items-center gap-1 p-2 bg-blue-500 text-white rounded-2xl">
            <CircleX
              onClick={() => handleRemoveChip(chip)}
              size={16}
              className="cursor-pointer"
            />
            <p className="text-sm">{chip}</p>
          </div>
        </div>
      ))}
      <input
        type="text"
        value={inputValue}
        onChange={handleInputChange}
        onKeyDown={handleInputKeyDown}
        className="px-4 py-2 rounded-md border text-sm focus:outline-none focus:ring-2 border-gray-300 focus:ring-blue-400"
        placeholder={placeholder}
      />
    </div>
  );
};

export default ChipInput;

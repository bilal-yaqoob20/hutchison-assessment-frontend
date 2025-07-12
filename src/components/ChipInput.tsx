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
      <div className="flex flex-wrap items-center gap-2 px-3 py-2 border rounded-md border-gray-300 focus-within:ring-2 focus-within:ring-blue-400">
        {chips.map((chip, index) => (
          <div
            key={index}
            className="flex items-center gap-1 px-2 py-1 bg-blue-500 text-white rounded-full text-sm"
          >
            <CircleX
              onClick={() => handleRemoveChip(chip)}
              size={16}
              className="cursor-pointer"
            />
            <p className="text-sm">{chip}</p>
          </div>
        ))}
        <input
          type="text"
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleInputKeyDown}
          className="flex-grow min-w-[120px] outline-none border-none text-sm bg-transparent"
          placeholder={placeholder}
        />
      </div>
    </div>
  );
};

export default ChipInput;

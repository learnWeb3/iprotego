export interface RadioGroupProps {
  selectedOptionId: string;
  options: { id: string; label: string }[];
  onclick: (id: string) => void;
}

export function RadioGroup({
  selectedOptionId,
  options,
  onclick = (id) => {},
}: RadioGroupProps) {
  return (
    <div className="flex">
      {options.map((option: { id: string; label: string }) => (
        <div className="flex items-center me-4" key={option.id}>
          <input
            type="radio"
            value=""
            defaultChecked={selectedOptionId === option.id}
            className="w-4 h-4 text-gray-600 bg-gray-[#E1FECF] border-gray-[#E1FECF] focus:ring-gray-[#E1FECF] focus:ring-2 accent-[#E1FECF]"
            onClick={() => onclick(option.id)}
          />
          <label className="ms-2 text-sm font-medium">{option.label}</label>
        </div>
      ))}
    </div>
  );
}

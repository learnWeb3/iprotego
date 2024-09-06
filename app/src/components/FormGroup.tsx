import { HTMLInputTypeAttribute } from "react";

export interface FormGroupProps {
  label: string;
  id: string;
  type: HTMLInputTypeAttribute | undefined;
  placeholder: string;
}

export function FormGroup({ label, id, type, placeholder }: FormGroupProps) {
  return (
    <div className="w-full">
      <label className="block text-gray-700 text-sm font-bold mb-2">
        {label}
      </label>
      <input
        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        id={id}
        type={type}
        placeholder={placeholder}
      />
    </div>
  );
}

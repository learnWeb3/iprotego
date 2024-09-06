export interface ButtonProps {
  label: string;
  onclick: () => void;
}

export function Button({ label, onclick }: ButtonProps) {
  return (
    <button
      onClick={onclick}
      className="bg-white hover:bg-gray-200 text-gray-800 font-bold py-2 px-4 rounded w-full"
    >
      {label}
    </button>
  );
}

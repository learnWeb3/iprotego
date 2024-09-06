import { mdiClose } from "@mdi/js";
import Icon from "@mdi/react";

export interface ClearMetadataProps {
  setMetadataFile: (value: any) => void;
}
export function ClearMetadata({ setMetadataFile }: ClearMetadataProps) {
  return (
    <div className="flex items-center justify-between p-4 gap-4 w-full bg-white">
      <p className="text-gray-800 text-sm">
        Metadata have been set, you can clear it by clicking the button on the
        right
      </p>
      <span
        onClick={() => setMetadataFile(null)}
        className="hover:text-red-600"
      >
        <Icon path={mdiClose} size={1} color={"inherit"} />
      </span>
    </div>
  );
}

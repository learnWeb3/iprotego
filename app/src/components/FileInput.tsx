import Icon from "@mdi/react";
import { mdiClose, mdiCloudUpload } from "@mdi/js";
import { ChangeEvent } from "react";
import { errorToast } from "@/lib/toast.helpers";

export interface FileInputProps {
  label: string;
  file: File | null;
  setFile: (file: File | null) => void;
  authorizedFormats: string[];
}

export function FileInput({
  label,
  file = null,
  setFile = (file: File | null) => {},
  authorizedFormats = [],
}: FileInputProps) {
  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (event?.target?.files?.length) {
      authorizedFormats.includes(event.target.files[0].type)
        ? setFile(event.target.files[0] as unknown as File)
        : errorToast(
            `invalid file type ${
              event.target.files[0].type
            }, expected one of ${authorizedFormats.join(", ")}`
          );
    }
  }

  return (
    <>
      <div className="relative w-full h-10 bg-white rounded-md cursor-pointer">
        {!file ? (
          <>
            <input
              className="opacity-0 absolute top-0 left-0 z-[0] h-full w-full cursor-pointer"
              type="file"
              onChange={handleChange}
            />
            <button className="cursor-pointer font-medium w-full h-full absolute top-0 left-0 z-[1] pointer-events-none text-gray-800 flex items-center gap-4 p-4 justify-center">
              <p> {label}</p>
              <Icon path={mdiCloudUpload} size={1} />
            </button>
          </>
        ) : (
          <div className="text-gray-800 h-full w-full flex items-center justify-between p-4">
            <p>{file.name}</p>
            <span onClick={() => setFile(null)} className="hover:text-red-600">
              <Icon path={mdiClose} size={1} color={"inherit"} />
            </span>
          </div>
        )}
      </div>
      <p className="mt-1 text-sm text-gray-500"></p>
    </>
  );
}

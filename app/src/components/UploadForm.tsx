import { FileUploader, FileUploaderSuccess } from "./FileUploader";
import { useState } from "react";

export function UploadForm() {
  const [successfullUploads, setSuccessfullUploads] = useState<any[]>([]);

  return (
    <div className="grid grid-cols-12 gap-4 text-white w-full">
      <div className="grid grid-cols-12 gap-4 col-span-12 content-start">
        <div className="col-span-12">
          <h2 className="text-2xl">Transmettre mon permis de conduire</h2>
        </div>

        <div className="col-span-12">
          {successfullUploads?.length ? (
            <FileUploaderSuccess
              successfullUploads={successfullUploads}
              close={() => setSuccessfullUploads([])}
            />
          ) : (
            <FileUploader
              allowedFileTypes={["application/pdf", "image/jpeg", "image/jpg"]}
              endpoint={process.env.NEXT_PUBLIC_UPLOAD_API_ENDPOINT as string}
              onUploadSuccess={setSuccessfullUploads}
            />
          )}
        </div>
      </div>
    </div>
  );
}

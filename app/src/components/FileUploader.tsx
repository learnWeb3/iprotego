import React, { useEffect, useState } from "react";
import Uppy from "@uppy/core";
import { Dashboard } from "@uppy/react";
import XHR from "@uppy/xhr-upload";
import "@uppy/core/dist/style.min.css";
import "@uppy/dashboard/dist/style.min.css";
import { Button } from "./Button";
import { errorToast, successToast } from "@/lib/toast.helpers";
import { mdiCheckAll, mdiCloudArrowUpOutline, mdiDownload } from "@mdi/js";
import Icon from "@mdi/react";
import French from "@uppy/locales/lib/fr_FR";

export function FileUploaderNotAvailable() {
  return (
    <div className="h-[50vh] w-full text-gray-800 bg-white flex items-center justify-center cursor-not-allowed">
      <div className="flex flex-col gap-4 items-center">
        <Icon path={mdiCloudArrowUpOutline} size={2.5} color={"inherit"} />
        <p className="text-lg">Please set up file metadata first</p>
      </div>
    </div>
  );
}

export interface FileUploaderSuccessProps {
  successfullUploads: any[];
  close: () => void;
}

export function FileUploaderSuccess({
  successfullUploads = [],
  close = () => {},
}: FileUploaderSuccessProps) {
  return (
    <div className="h-[50vh] w-full text-gray-800 bg-white flex items-center justify-center cursor-not-allowed">
      <div className="flex flex-col gap-4 items-center">
        <Icon path={mdiCheckAll} size={2.5} color={"inherit"} />

        <ul>
          <li className="py-4">Le fichier nous à été transmis avec succès.</li>
        </ul>

        <Button onclick={close} label="Clear data" />
      </div>
    </div>
  );
}

export interface FileUploaderProps {
  endpoint: string;
  onUploadSuccess: (files: any[]) => void;
  allowedFileTypes: string[];
}

export function FileUploader({
  endpoint,
  onUploadSuccess = (files: any[]) => {
    console.log(files);
  },
  allowedFileTypes = ["application/pdf", "image/jpeg", "image/jpg"],
}: FileUploaderProps) {
  const [uppy] = useState(() =>
    new Uppy({
      locale: French,
      restrictions: {
        maxNumberOfFiles: 1,
        minNumberOfFiles: 1,
        allowedFileTypes,
      },
    }).use(XHR, {
      endpoint: "",
      formData: true,
      fieldName: "data",
      bundle: false,
      method: "POST",
      headers: (file) => {
        const oidcData = JSON.parse(
          sessionStorage.getItem("oidc.default") as string
        );

        return {
          authorization: `Bearer ${oidcData.tokens.accessToken}`,
        };
      },
      getResponseError(responseText, response) {
        return new Error(JSON.parse(responseText).message);
      },
    })
  );

  useEffect(() => {
    function handleComplete(result: { successful: any; failed: any }) {
      console.log("successful files:", result.successful);
      console.log("failed files:", result.failed);
      if (result?.failed?.length) {
        for (const failedResult of result.failed) {
          errorToast(failedResult.error);
        }
      }
      if (result?.successful?.length) {
        for (const successfullResult of result.successful) {
          const details = successfullResult?.response?.body?.rowErrors?.length
            ? ` details: ${successfullResult?.response?.body?.rowErrors?.join(
                ", "
              )}`
            : "";
          const message =
            `File ${successfullResult.name} uploaded with success` + details;
          successToast(message);
        }
      }
      if (result?.successful?.length) {
        onUploadSuccess((result?.successful as unknown as any[]) || []);
      }
    }

    function handleFileAdded(file: any) {
      console.log(file);
      // uppy.setFileMeta(file.id, {
      //   metadata,
      // });
      uppy.getPlugin("XHRUpload")?.setOptions({
        endpoint: `${endpoint}`,
      });
    }

    if (uppy) {
      uppy.on("complete", handleComplete);
      uppy.on("file-added", handleFileAdded);
    }
    return () => {
      uppy.off("complete", handleComplete);
    };
  }, [uppy]);

  return (
    <div className="col-span-12">
      <Dashboard uppy={uppy} height={"75vh"} width={"100%"} />
    </div>
  );
}

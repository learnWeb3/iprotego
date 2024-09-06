import Layout from "../components/Layout";
import {
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";
import { UploadForm } from "@/components/UploadForm";
import { OidcSecure } from "@axa-fr/react-oidc";
import { RegisterCustomer } from "@/components/RegisterCustomer";

export interface HomePageProps {
  textConverterApiEndpoint: string;
}

export default function HomePage({ textConverterApiEndpoint }: HomePageProps) {
  return (
    <OidcSecure>
      <RegisterCustomer>
        <div className="grid grid-cols-12 gap-4">
          <div className="col-span-12 flex items-center bg-[#161F2D] p-4">
            <UploadForm />
          </div>
        </div>
      </RegisterCustomer>
    </OidcSecure>
  );
}

HomePage.getLayout = function getLayout(
  page:
    | string
    | number
    | boolean
    | ReactElement<any, string | JSXElementConstructor<any>>
    | Iterable<ReactNode>
    | ReactPortal
    | null
    | undefined
) {
  return <Layout>{page}</Layout>;
};

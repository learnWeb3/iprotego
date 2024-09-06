import { registerCustomer } from "@/services/api.service";
import { useOidcAccessToken } from "@axa-fr/react-oidc";
import { PropsWithChildren, useEffect } from "react";
export interface RegisterCustomerProps extends PropsWithChildren {}

export function RegisterCustomer({ children }: RegisterCustomerProps) {
  const { accessToken } = useOidcAccessToken();
  useEffect(() => {
    accessToken && registerCustomer(accessToken);
  }, [accessToken]);
  return children;
}

import React from "react";
import { Error } from "../components/Error";

export default function Error403() {
  return (
    <Error
      label="403 error"
      description="Forbidden"
      message="Sorry, it seems you do not have the correct access right to consult this resource or perform this action. If you think it's a mistake please contact your administrator"
    />
  );
}

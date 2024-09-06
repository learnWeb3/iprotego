import React from "react";
import { Error } from "../components/Error";

export default function Error401() {
  return (
    <Error
      label="401 error"
      description="Unauthorized"
      message="Sorry, it seems you do not have the correct access right to consult this resource or perform this action. If you think it's a mistake please contact your administrator"
    />
  );
}

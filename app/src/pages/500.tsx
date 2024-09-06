import React from "react";
import { Error } from "../components/Error";

export default function Error500() {
  return (
    <Error
      label="500 error"
      description="Internal Server Error"
      message="An unexpected error has occured, please wait a moment and retry, if the error persists feel free to contact support"
    />
  );
}

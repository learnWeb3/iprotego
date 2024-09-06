import React from "react";
import { Error } from "../components/Error";

export default function Error404() {
  return (
    <Error
      label="404 error"
      description="Page not found"
      message="Sorry, the page you are looking for doesn't exist."
    />
  );
}

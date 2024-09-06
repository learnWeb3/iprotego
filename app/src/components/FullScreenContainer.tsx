import { PropsWithChildren } from "react";
export interface FullScreenContainerProps extends PropsWithChildren {
  alignContent?: "center";
}
export function FullScreenContainer({
  children,
  alignContent = "center",
}: FullScreenContainerProps) {
  const alignContentStyles = {
    center: "flex justify-center items-center",
  };
  return (
    <div className={`h-screen ${alignContentStyles[alignContent]}`}>
      {children}
    </div>
  );
}

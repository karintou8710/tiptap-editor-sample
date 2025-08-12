import React from "react";

interface DragIconProps {
  width?: number;
  height?: number;
}

export const DragIcon: React.FC<DragIconProps> = ({
  width = 20,
  height = 20,
}) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="currentColor"
      viewBox="0 0 24 24"
      width={width}
      height={height}
    >
      <circle cx="7" cy="7" r="1.6" />
      <circle cx="7" cy="12" r="1.6" />
      <circle cx="7" cy="17" r="1.6" />
      <circle cx="13" cy="7" r="1.6" />
      <circle cx="13" cy="12" r="1.6" />
      <circle cx="13" cy="17" r="1.6" />
    </svg>
  );
};

export default DragIcon;

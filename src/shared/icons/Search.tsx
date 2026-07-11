import type { SVGProps } from "react";

export const SvgSearch = (props: SVGProps<SVGSVGElement>) => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      {...props}
    >
      <path
        d="M14.0008 14L11.1074 11.1067"
        stroke="#B5B5B5"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M7.33333 12.6667C10.2789 12.6667 12.6667 10.2789 12.6667 7.33333C12.6667 4.38781 10.2789 2 7.33333 2C4.38781 2 2 4.38781 2 7.33333C2 10.2789 4.38781 12.6667 7.33333 12.6667Z"
        stroke="#B5B5B5"
        strokeWidth="1.33333"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        "text-display-1",
        "text-display-2",
        "text-display-3",
        "text-title-1",
        "text-title-2",
        "text-title-3",
        "text-heading-1",
        "text-heading-2",
        "text-headline-1",
        "text-headline-2",
        "text-body-1-normal",
        "text-body-1-reading",
        "text-body-2-normal",
        "text-body-2-reading",
        "text-label-1-normal",
        "text-label-1-reading",
        "text-label-2",
        "text-caption-1",
        "text-caption-2",
      ],
      "text-color": [
        "text-label-normal",
        "text-label-strong",
        "text-label-alternative",
        "text-label-neutral",
        "text-label-assistive",
        "text-label-disable",

        "text-primary-normal",
        "text-primary-strong",
        "text-primary-heavy",

        "text-status-positive",
        "text-status-cautionary",
        "text-status-negative",

        "text-static-white",
        "text-static-black",

        "text-inverse-primary",
        "text-inverse-background",
        "text-inverse-label",

        "text-accent-fg-red",
        "text-accent-fg-red-orange",
        "text-accent-fg-orange",
        "text-accent-fg-lime",
        "text-accent-fg-green",
        "text-accent-fg-cyan",
        "text-accent-fg-light-blue",
        "text-accent-fg-blue",
        "text-accent-fg-violet",
        "text-accent-fg-purple",
        "text-accent-fg-pink",
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

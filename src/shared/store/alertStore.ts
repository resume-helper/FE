import { create } from "zustand";

type AlertButtonOptions = {
  label: string;
  variant?: "normal" | "assistive" | "negative";
};

export type AlertOptions = {
  title: string;
  content: string;
  confirm: AlertButtonOptions;
  cancel: AlertButtonOptions;
  direction?: "normal" | "reverse";
  heading?: boolean;
};

type AlertStore = {
  open: boolean;
  options: AlertOptions | null;
  resolve: ((result: "confirm" | "cancel") => void) | null;
  show: (options: AlertOptions) => Promise<"confirm" | "cancel">;
  close: (result: "confirm" | "cancel") => void;
};

export const useAlertStore = create<AlertStore>((set, get) => ({
  open: false,
  options: null,
  resolve: null,

  show: (options) => {
    return new Promise((resolve) => {
      set({ open: true, options, resolve });
    });
  },

  close: (result) => {
    get().resolve?.(result);
    set({ open: false, options: null, resolve: null });
  },
}));

export function useAlert() {
  const alert = useAlertStore((store) => store.show);
  return alert;
}

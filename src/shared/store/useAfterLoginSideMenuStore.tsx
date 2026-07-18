"use client";

import { create } from "zustand";

interface USE_AFTER_LOGIN_SIDE_MENU_STORE {
  isSideMenu: boolean;
  ToggleSideMenuCallback: () => void;
}

export const useAfterLoginSideMenuStore =
  create<USE_AFTER_LOGIN_SIDE_MENU_STORE>((set) => ({
    isSideMenu: true,
    ToggleSideMenuCallback() {
      set((prev) => ({
        isSideMenu: !prev.isSideMenu,
      }));
    },
  }));

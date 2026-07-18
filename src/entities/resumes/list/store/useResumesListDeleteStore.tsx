"use client";

import { create } from "zustand";

interface USE_RESUMES_LIST_DELETE_STORE {
  isDelete: boolean;
  delelteIds: Map<number, true>;
  SetIsDelete: (is: boolean) => void;
  CheckDeleteIdsCallback: (checked: boolean, id: number) => void;
}

export const useResumesListDeleteStore = create<USE_RESUMES_LIST_DELETE_STORE>(
  (set) => ({
    isDelete: false,
    delelteIds: new Map(),
    SetIsDelete(is) {
      set((state) => ({
        isDelete: is,
        delelteIds: is ? state.delelteIds : new Map(),
      }));
    },
    CheckDeleteIdsCallback(checked, id) {
      set((state) => {
        const newDeleteIds = new Map(state.delelteIds);

        if (checked) {
          newDeleteIds.set(id, true);
        } else {
          newDeleteIds.delete(id);
        }

        return { delelteIds: newDeleteIds };
      });
    },
  })
);

"use client";

import { create } from "zustand";

interface USE_RESUMES_DELETE_STORE {
  /** 삭제모드 여부 */
  isDelete: boolean;

  /** 삭제할 이력서 id */
  deleteIds: Map<number, true>;

  /** 삭제할 이력서 id */
  CheckedDeleteIdsCallback: (id: number, checked: boolean) => void;

  /** 삭제모드 on/off */
  ToggleResumsesDelete: (is: boolean) => void;

  /** 스토어 초기화 */
  ResetDeleteStore: () => void;
}

export const useResumsesDeleteStore = create<USE_RESUMES_DELETE_STORE>(
  (set) => ({
    isDelete: false,
    deleteIds: new Map(),
    ToggleResumsesDelete(is) {
      if (is) {
        set({ isDelete: true });
      } else {
        set({
          isDelete: false,
          deleteIds: new Map(),
        });
      }
    },
    CheckedDeleteIdsCallback(id, checked) {
      set((prev) => {
        /** 기존 Map을 직접 변경하지 않기 위해 새 Map 생성 */
        const map = new Map(prev.deleteIds);

        if (checked) {
          map.set(id, true);
        } else {
          if (map.has(id)) map.delete(id);
        }

        return {
          deleteIds: map,
        };
      });
    },

    ResetDeleteStore() {
      set({
        isDelete: false,
        deleteIds: new Map(),
      });
    },
  })
);

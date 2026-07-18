"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { type Resolver, useForm } from "react-hook-form";

import {
  API_CLIENT_BLOCK_DRAFTS_DELETE,
  API_CLIENT_BLOCK_DRAFTS_GET,
  API_CLIENT_BLOCK_DRAFTS_LIST,
  API_CLIENT_BLOCK_DRAFTS_SAVE,
  API_CLIENT_BLOCKS_SAVE,
} from "@/entities/blocks/editor/api/api.client.blocks.editor";
import {
  BLOCK_CONTENT_SCHEMAS,
  type EditorBlockType,
} from "@/entities/blocks/editor/model/blockContentSchemas";
import {
  BLOCK_EDITOR_TYPES,
  BLOCK_TYPE_LABELS,
  getRepresentativeTitle,
} from "@/entities/blocks/editor/model/blockEditorMeta";
import { useSessionHook } from "@/entities/auth/social-login/hook/useSessionHook";
import { BLOCK_EDIT_STASH_KEY } from "@/features/BlocksLibraryList";
import { useAlertStore } from "@/shared/store/alertStore";

import { BlockContentForm } from "./forms";

const DRAFTS_QUERY_KEY = "blockDrafts";

export default function BlockEditorView({
  editBlock = null,
}: {
  editBlock?: BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT> | null;
}) {
  const [activeType, setActiveType] = useState<EditorBlockType>(
    (editBlock?.type as EditorBlockType) ?? "BASIC_INFO"
  );
  // 리마운트 강제용 — 같은 타입이라도 임시저장 불러오기 시 폼을 새로 그린다
  const [formEpoch, setFormEpoch] = useState(0);
  const [loadedDraft, setLoadedDraft] = useState<BLOCK_DRAFT_DETAIL | null>(
    null
  );

  const changeType = (type: EditorBlockType) => {
    setActiveType(type);
    setLoadedDraft(null);
    setFormEpoch((n) => n + 1);
  };

  const loadDraft = (draft: BLOCK_DRAFT_DETAIL) => {
    setLoadedDraft(draft);
    setFormEpoch((n) => n + 1);
  };

  return (
    <section className="mx-auto flex w-full max-w-[720px] flex-col gap-[24px] p-[32px]">
      <h2 className="text-heading-1-bold">
        {editBlock ? "블록 수정" : "블록 만들기"}
      </h2>

      {/* 블록 유형 선택 (기획 8.2.1) — 수정모드에선 유형이 고정된다 */}
      {!editBlock && (
        <nav className="flex flex-wrap gap-[8px]">
          {BLOCK_EDITOR_TYPES.map((type) => (
            <button
              key={type}
              type="button"
              onClick={() => changeType(type)}
              className={`text-label-1-normal-medium h-[36px] rounded-[8px] border px-[12px] ${
                activeType === type
                  ? "border-primary-normal bg-primary-normal text-white"
                  : "border-line-normal-normal text-label-normal"
              }`}
            >
              {BLOCK_TYPE_LABELS[type]}
            </button>
          ))}
        </nav>
      )}

      <BlockEditorFormBody
        key={`${activeType}-${formEpoch}`}
        type={activeType}
        editBlock={editBlock}
        loadedDraft={loadedDraft}
        onLoadDraft={loadDraft}
      />
    </section>
  );
}

function BlockEditorFormBody({
  type,
  editBlock,
  loadedDraft,
  onLoadDraft,
}: {
  type: EditorBlockType;
  editBlock: BLOCK_LIST_ITEM<BLOCK_LIST_CONTENT> | null;
  loadedDraft: BLOCK_DRAFT_DETAIL | null;
  onLoadDraft: (draft: BLOCK_DRAFT_DETAIL) => void;
}) {
  const router = useRouter();
  const queryClient = useQueryClient();
  const showAlert = useAlertStore((s) => s.show);
  const { user } = useSessionHook();
  const [draftListOpen, setDraftListOpen] = useState(false);

  const form = useForm<Record<string, unknown>>({
    // 블록 타입별 스키마가 런타임에 바뀌므로 (key 리마운트) 정적 제네릭 대신 단언
    resolver: zodResolver(BLOCK_CONTENT_SCHEMAS[type]) as unknown as Resolver<
      Record<string, unknown>
    >,
    defaultValues:
      loadedDraft?.contentJson ??
      (editBlock?.contentJson as Record<string, unknown> | undefined) ??
      // 기본 정보: 소셜 로그인 이메일 자동 입력 (기획 4-3)
      (type === "BASIC_INFO"
        ? { email: user?.email ?? "" }
        : type === "EDUCATION"
          ? {}
          : {}),
  });
  const { isDirty } = form.formState;

  // 이탈 방지 (기획 8.2.8) — 미저장 변경사항 있을 때 브라우저 이탈 경고
  useEffect(() => {
    if (!isDirty) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty]);

  const { data: drafts } = useQuery({
    queryKey: [DRAFTS_QUERY_KEY, type, loadedDraft?.id],
    queryFn: () =>
      API_CLIENT_BLOCK_DRAFTS_LIST({ type, currentDraftId: loadedDraft?.id }),
  });
  const draftCount = drafts?.length ?? 0;

  const invalidateDrafts = () =>
    queryClient.invalidateQueries({ queryKey: [DRAFTS_QUERY_KEY, type] });

  // 임시저장 (기획 8.2.3 — 대표 제목만 있으면 저장 가능, 불러온 항목은 덮어쓰기)
  const draftSave = useMutation({
    mutationFn: async () => {
      const content = form.getValues() as Record<string, unknown>;
      const title = getRepresentativeTitle(type, content);
      if (!title) {
        await showAlert({
          title: "제목을 입력해주세요",
          content: `${BLOCK_TYPE_LABELS[type]} 블록의 대표 제목을 입력해야 임시저장할 수 있어요.`,
          confirm: { label: "확인" },
          cancel: { label: "닫기", variant: "assistive" },
        });
        return null;
      }
      return API_CLIENT_BLOCK_DRAFTS_SAVE({
        draftId: loadedDraft?.id,
        blockType: type,
        title,
        contentJson: content,
      });
    },
    onSuccess: (saved) => {
      if (saved) invalidateDrafts();
    },
  });

  // 최종 저장 (기획 8.2.7 — 저장 후 목록 이동, 불러온 임시저장은 자동 삭제 8.2.6)
  const blockSave = useMutation({
    mutationFn: async (content: Record<string, unknown>) => {
      const title = getRepresentativeTitle(type, content);
      const saved = await API_CLIENT_BLOCKS_SAVE({
        blockId: editBlock?.id,
        blockType: type,
        title: title || BLOCK_TYPE_LABELS[type],
        contentJson: content,
      });
      if (loadedDraft) await API_CLIENT_BLOCK_DRAFTS_DELETE(loadedDraft.id);
      if (editBlock) window.sessionStorage.removeItem(BLOCK_EDIT_STASH_KEY);
      return saved;
    },
    onSuccess: () => {
      form.reset(form.getValues()); // dirty 해제 → 이탈 경고 없이 이동
      router.push("/r/blocks");
    },
    onError: async () => {
      await showAlert({
        title: "저장에 실패했어요",
        content: "입력값을 확인한 뒤 다시 시도해주세요.",
        confirm: { label: "확인" },
        cancel: { label: "닫기", variant: "assistive" },
      });
    },
  });

  const onLoadDraftClick = async (draftId: number) => {
    const draft = await API_CLIENT_BLOCK_DRAFTS_GET(draftId);
    setDraftListOpen(false);
    onLoadDraft(draft);
  };

  return (
    <form
      className="flex flex-col gap-[20px]"
      onSubmit={form.handleSubmit((content) =>
        blockSave.mutate(content as Record<string, unknown>)
      )}
    >
      {/* 임시저장 | N (기획 8.2.3 — N 클릭 시 목록 모달, 수정모드 제외) */}
      <div
        className={`${editBlock ? "hidden" : "flex"} text-label-1-normal-medium items-center justify-end gap-[4px]`}
      >
        <button
          type="button"
          onClick={() => draftSave.mutate()}
          disabled={draftSave.isPending}
          className="text-label-normal"
        >
          임시저장
        </button>
        <span className="text-line-normal-normal">|</span>
        <button
          type="button"
          onClick={() => setDraftListOpen(true)}
          className="text-primary-normal"
        >
          {draftCount}
        </button>
      </div>

      <BlockContentForm type={type} control={form.control} />

      <div className="mt-[12px] flex justify-end gap-[8px] [&>*]:h-[44px] [&>*]:min-w-[120px] [&>*]:rounded-[12px] [&>*]:font-[600]">
        <button
          type="button"
          className="border border-[#70737C29] px-[16px] text-[#171719]"
          onClick={async () => {
            if (isDirty) {
              const result = await showAlert({
                title: "작성을 그만둘까요?",
                content: "저장하지 않은 변경사항은 사라져요.",
                confirm: { label: "나가기", variant: "negative" },
                cancel: { label: "계속 작성" },
              });
              if (result !== "confirm") return;
            }
            router.push("/r/blocks");
          }}
        >
          취소
        </button>
        <button
          type="submit"
          disabled={blockSave.isPending}
          className="bg-[#0066FF] px-[16px] text-[#fff]"
        >
          저장 완료
        </button>
      </div>

      {draftListOpen && (
        <DraftListModal
          drafts={drafts ?? []}
          onClose={() => setDraftListOpen(false)}
          onSelect={onLoadDraftClick}
          onDelete={async (draftId) => {
            await API_CLIENT_BLOCK_DRAFTS_DELETE(draftId);
            invalidateDrafts();
          }}
        />
      )}
    </form>
  );
}

/** 임시저장 목록 모달 (기획 8.2.4 — [대표 제목 + 저장 시간], 현재 유형만) */
function DraftListModal({
  drafts,
  onClose,
  onSelect,
  onDelete,
}: {
  drafts: BLOCK_DRAFT_SUMMARY[];
  onClose: () => void;
  onSelect: (draftId: number) => void;
  onDelete: (draftId: number) => void;
}) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/40"
      onClick={onClose}
    >
      <div
        className="max-h-[480px] w-[400px] overflow-y-auto rounded-[16px] bg-white p-[24px]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-heading-2-bold mb-[16px]">임시저장 목록</h3>
        {drafts.length === 0 && (
          <p className="text-label-1-normal-medium text-label-alternative">
            임시저장된 항목이 없어요
          </p>
        )}
        <ul className="flex flex-col gap-[8px]">
          {drafts.map((draft) => (
            <li
              key={draft.id}
              className="flex items-center justify-between gap-[8px]"
            >
              <button
                type="button"
                className="flex flex-1 flex-col items-start rounded-[8px] p-[8px] text-left hover:bg-[#f4f4f5]"
                onClick={() => onSelect(draft.id)}
              >
                <span className="text-body-1-normal-medium">{draft.title}</span>
                <span className="text-label-2-medium text-label-alternative">
                  {new Date(draft.updatedAt).toLocaleString("ko-KR")}
                </span>
              </button>
              <button
                type="button"
                className="text-label-2-medium text-label-alternative"
                onClick={() => onDelete(draft.id)}
              >
                삭제
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

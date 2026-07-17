"use client";

import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

import {
  API_CLIENT_RESUMES_SAVE,
  API_CLIENT_RESUMES_VISIBILITY,
} from "@/entities/resumes/builder/api/api.client.resumes.builder";
import { BLOCK_TYPE_LABELS } from "@/entities/blocks/editor/model/blockEditorMeta";
import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";
import { useAlertStore } from "@/shared/store/alertStore";

import { BlockPickerModal } from "./BlockPickerModal";
import {
  RESUME_TEMPLATES,
  ResumePreview,
  type ResumeTemplate,
} from "./preview";

/** 섹션 고정 순서 (기획 9.2.2 — 섹션 자체는 순서 변경 불가) */
const SECTION_ORDER: EditorBlockType[] = [
  "BASIC_INFO",
  "SUMMARY",
  "INTRODUCTION",
  "SKILL",
  "CAREER",
  "PROJECT",
  "EDUCATION",
  "ACTIVITY",
  "CERTIFICATE",
];

type PickedBlock = {
  id: number;
  type: EditorBlockType;
  title: string;
  content: Record<string, unknown>;
};

export default function ResumeBuilderView({ mode }: { mode: RESUMSES_TYPES }) {
  const router = useRouter();
  const showAlert = useAlertStore((s) => s.show);

  const [title, setTitle] = useState("");
  const [template, setTemplate] = useState<ResumeTemplate>("A");
  const [picked, setPicked] = useState<PickedBlock[]>([]);
  const [pickerType, setPickerType] = useState<EditorBlockType | "ALL" | null>(
    null
  );
  const [savedResult, setSavedResult] = useState<RESUME_SAVE_RESULT | null>(
    null
  );
  const [isPublic, setIsPublic] = useState(false);

  const isDirty = picked.length > 0 || title.length > 0;

  // 이탈 방지 (기획 9.5.3)
  useEffect(() => {
    if (!isDirty || savedResult) return;
    const handler = (e: BeforeUnloadEvent) => {
      e.preventDefault();
    };
    window.addEventListener("beforeunload", handler);
    return () => window.removeEventListener("beforeunload", handler);
  }, [isDirty, savedResult]);

  const sections = useMemo(
    () =>
      SECTION_ORDER.map((type) => ({
        type,
        blocks: picked.filter((b) => b.type === type),
      })),
    [picked]
  );

  const moveBlock = (blockId: number, direction: -1 | 1) => {
    setPicked((prev) => {
      const block = prev.find((b) => b.id === blockId);
      if (!block) return prev;
      const siblings = prev.filter((b) => b.type === block.type);
      const idx = siblings.findIndex((b) => b.id === blockId);
      const swapWith = siblings[idx + direction];
      if (!swapWith) return prev;
      return prev.map((b) =>
        b.id === blockId ? swapWith : b.id === swapWith.id ? block : b
      );
    });
  };

  const save = useMutation({
    mutationFn: async () => {
      // 기본 정보 블록 필수 (기획 9.1.2)
      if (!picked.some((b) => b.type === "BASIC_INFO")) {
        await showAlert({
          title: "기본 정보 블록이 없어요",
          content:
            "기본 정보 블록은 필수예요. 먼저 기본 정보 블록을 추가해주세요.",
          confirm: { label: "확인" },
          cancel: { label: "닫기", variant: "assistive" },
        });
        return null;
      }
      if (!title.trim()) {
        await showAlert({
          title: "이력서 제목을 입력해주세요",
          content: "저장하려면 이력서 제목이 필요해요.",
          confirm: { label: "확인" },
          cancel: { label: "닫기", variant: "assistive" },
        });
        return null;
      }
      // 섹션 고정 순서 기준 전역 orderIndex 부여
      const ordered = SECTION_ORDER.flatMap((type) =>
        picked.filter((b) => b.type === type)
      );
      return API_CLIENT_RESUMES_SAVE({
        title: title.trim(),
        type: mode,
        blocks: ordered.map((b, i) => ({ blockId: b.id, orderIndex: i })),
      });
    },
    onSuccess: (result) => {
      if (!result) return;
      setSavedResult(result);
      setIsPublic(result.isPublic);
      if (mode === "PDF") router.push("/r/resumes/pdf");
    },
    onError: async () => {
      await showAlert({
        title: "저장에 실패했어요",
        content: "잠시 후 다시 시도해주세요.",
        confirm: { label: "확인" },
        cancel: { label: "닫기", variant: "assistive" },
      });
    },
  });

  const toggleVisibility = useMutation({
    mutationFn: (next: boolean) =>
      API_CLIENT_RESUMES_VISIBILITY({
        resumeId: savedResult!.id,
        isPublic: next,
      }),
    onSuccess: (result) => setIsPublic(result.isPublic),
  });

  const shareUrl = savedResult?.slug
    ? `${typeof window !== "undefined" ? window.location.origin : ""}/w/${savedResult.slug}`
    : null;

  return (
    <section className="mx-auto flex w-full max-w-[1200px] flex-col gap-[24px] p-[32px]">
      <h2 className="text-heading-1-bold">
        {mode === "PDF" ? "PDF" : "웹"} 이력서 만들기
      </h2>

      {/* 템플릿 선택 (기획 9-1) */}
      <div className="flex gap-[12px]">
        {RESUME_TEMPLATES.map((t) => (
          <button
            key={t.value}
            type="button"
            onClick={() => setTemplate(t.value)}
            className={`flex flex-col items-start rounded-[12px] border p-[12px] ${
              template === t.value
                ? "border-primary-normal ring-primary-normal ring-1"
                : "border-line-normal-normal"
            }`}
          >
            <span className="text-body-1-normal-bold">
              {t.label}
              {template === t.value && " ✓"}
            </span>
            <span className="text-label-2-medium text-label-alternative">
              {t.description}
            </span>
          </button>
        ))}
      </div>

      <input
        className="border-line-normal-normal text-body-1-normal-medium h-[48px] rounded-[12px] border px-[16px]"
        placeholder="이력서 제목을 입력해주세요"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="grid grid-cols-[minmax(320px,1fr)_minmax(0,1.4fr)] gap-[24px]">
        {/* 좌: 블록 선택 영역 */}
        <div className="flex flex-col gap-[16px]">
          {sections.map((section) => (
            <div
              key={section.type}
              className="border-line-normal-normal rounded-[12px] border p-[16px]"
            >
              <div className="mb-[8px] flex items-center justify-between">
                <span className="text-body-1-normal-bold">
                  {BLOCK_TYPE_LABELS[section.type]}
                </span>
                <button
                  type="button"
                  className="text-label-1-normal-medium text-primary-normal"
                  onClick={() => setPickerType(section.type)}
                >
                  + 추가
                </button>
              </div>
              {section.type === "BASIC_INFO" && section.blocks.length === 0 && (
                <p className="text-label-2-medium text-label-alternative">
                  기본 정보 블록이 없어요. 먼저 기본 정보 블록을 작성해보세요.
                </p>
              )}
              <ul className="flex flex-col gap-[6px]">
                {section.blocks.map((block, idx) => (
                  <li
                    key={block.id}
                    className="flex items-center justify-between rounded-[8px] bg-[#f7f7f8] px-[10px] py-[8px]"
                  >
                    <span className="text-label-1-normal-medium">
                      {block.title}
                    </span>
                    <span className="text-label-2-medium flex items-center gap-[6px]">
                      <button
                        type="button"
                        disabled={idx === 0}
                        onClick={() => moveBlock(block.id, -1)}
                        className="disabled:opacity-30"
                      >
                        ↑
                      </button>
                      <button
                        type="button"
                        disabled={idx === section.blocks.length - 1}
                        onClick={() => moveBlock(block.id, 1)}
                        className="disabled:opacity-30"
                      >
                        ↓
                      </button>
                      <button
                        type="button"
                        className="text-label-alternative"
                        onClick={() =>
                          setPicked((prev) =>
                            prev.filter((b) => b.id !== block.id)
                          )
                        }
                      >
                        제거
                      </button>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 우: 실시간 미리보기 */}
        <div className="border-line-normal-normal rounded-[12px] border bg-white p-[24px] print:border-0">
          <ResumePreview
            sections={sections.map((s) => ({
              type: s.type,
              blocks: s.blocks.map((b) => ({ id: b.id, content: b.content })),
            }))}
            template={template}
          />
        </div>
      </div>

      {/* 하단 액션 */}
      <div className="flex items-center justify-end gap-[8px]">
        {mode === "PDF" && (
          <button
            type="button"
            className="h-[44px] rounded-[12px] border border-[#70737C29] px-[16px] font-[600] text-[#171719]"
            onClick={() => window.print()}
          >
            PDF 다운로드
          </button>
        )}
        <button
          type="button"
          className="h-[44px] rounded-[12px] border border-[#70737C29] px-[16px] font-[600] text-[#171719]"
          onClick={async () => {
            if (isDirty && !savedResult) {
              const result = await showAlert({
                title: "빌더를 나갈까요?",
                content: "저장하지 않은 구성은 사라져요.",
                confirm: { label: "나가기", variant: "negative" },
                cancel: { label: "계속 작성" },
              });
              if (result !== "confirm") return;
            }
            router.push(mode === "PDF" ? "/r/resumes/pdf" : "/r/resumes/web");
          }}
        >
          {savedResult ? "목록으로" : "취소"}
        </button>
        {!savedResult && (
          <button
            type="button"
            disabled={save.isPending}
            className="h-[44px] rounded-[12px] bg-[#0066FF] px-[24px] font-[600] text-[#fff]"
            onClick={() => save.mutate()}
          >
            저장
          </button>
        )}
      </div>

      {/* 웹 이력서 — 저장 후 링크 설정 (기획 10-4) */}
      {mode === "WEB" && savedResult && (
        <div className="border-line-normal-normal flex flex-col gap-[12px] rounded-[12px] border p-[16px]">
          <div className="flex items-center justify-between">
            <span className="text-body-1-normal-bold">링크 공개</span>
            <button
              type="button"
              disabled={toggleVisibility.isPending}
              onClick={() => toggleVisibility.mutate(!isPublic)}
              className={`text-label-1-normal-medium h-[32px] rounded-[16px] px-[14px] ${
                isPublic
                  ? "bg-[#0066FF] text-white"
                  : "text-label-normal bg-[#e5e5e5]"
              }`}
            >
              {isPublic ? "공개" : "비공개"}
            </button>
          </div>
          {shareUrl && (
            <div className="flex items-center justify-between gap-[8px]">
              <span className="text-label-1-normal-medium text-label-alternative truncate">
                {shareUrl}
              </span>
              <button
                type="button"
                className="text-label-1-normal-medium text-primary-normal whitespace-nowrap"
                onClick={() => navigator.clipboard.writeText(shareUrl)}
              >
                링크 복사
              </button>
            </div>
          )}
        </div>
      )}

      {pickerType !== null && (
        <BlockPickerModal
          initialType={pickerType === "ALL" ? undefined : pickerType}
          excludedIds={picked.map((b) => b.id)}
          onClose={() => setPickerType(null)}
          onPick={(block) => {
            setPicked((prev) => [
              ...prev,
              {
                id: block.id,
                type: block.type as EditorBlockType,
                title: block.title,
                content: block.contentJson as unknown as Record<
                  string,
                  unknown
                >,
              },
            ]);
            setPickerType(null);
          }}
        />
      )}
    </section>
  );
}

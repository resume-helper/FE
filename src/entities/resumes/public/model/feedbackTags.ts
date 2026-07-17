import type { EditorBlockType } from "@/entities/blocks/editor/model/blockContentSchemas";

/**
 * 피드백 선택형 태그 — SSOT = BE `FeedbackTagCatalog`
 * (docs/planning/feedback-feature.md). 목록에 없는 태그는 BE 가 400 으로 거절한다.
 */
export const SECTION_FEEDBACK_TAGS: Partial<Record<EditorBlockType, string[]>> =
  {
    SUMMARY: [
      "핵심이 잘 담겼어요",
      "인상적이었어요",
      "차별점이 느껴져요",
      "너무 길어요",
      "강점이 잘 안 보여요",
      "차별점이 없어요",
    ],
    INTRODUCTION: [
      "개성이 느껴져요",
      "지원 의지가 보여요",
      "설득력 있어요",
      "직무 연관성이 낮아요",
      "구체성이 부족해요",
      "내용이 너무 많아요",
    ],
    SKILL: [
      "스택이 잘 정리됐어요",
      "역량이 잘 보여요",
      "직무에 잘 맞아요",
      "스택이 너무 많아요",
      "수준을 알기 어려워요",
      "직무 연관성이 낮아요",
    ],
    CAREER: [
      "성과가 잘 드러나요",
      "역할이 명확해요",
      "읽기 쉬웠어요",
      "성과 수치가 부족해요",
      "역할이 모호해요",
      "내용이 너무 많아요",
    ],
    PROJECT: [
      "기여도가 잘 보여요",
      "결과가 명확해요",
      "문제 해결 과정이 인상적이에요",
      "기여도가 불분명해요",
      "결과가 잘 안 보여요",
      "내용이 너무 많아요",
    ],
    EDUCATION: [
      "한눈에 파악돼요",
      "잘 정리됐어요",
      "정보가 부족해요",
      "불필요한 내용이 있어요",
    ],
    ACTIVITY: [
      "경험이 다양해요",
      "성장이 느껴져요",
      "직무 연관성이 높아요",
      "설명이 부족해요",
      "정리가 필요해요",
      "직무 연관성이 낮아요",
    ],
    CERTIFICATE: [
      "역량을 잘 뒷받침해요",
      "직무 연관성이 높아요",
      "설명이 부족해요",
      "직무 연관성이 낮아요",
    ],
  };

export const OVERALL_FEEDBACK_TAGS: string[] = [
  "전체적으로 잘 읽혀요",
  "강점이 잘 드러나요",
  "구성이 명확해요",
  "완성도가 높아요",
  "내용 보충이 필요해요",
  "핵심이 잘 안 보여요",
  "가독성이 아쉬워요",
  "직무 연관성이 낮아요",
];

/** 별점 0.5 단위 선택지 (1.0 ~ 5.0) */
export const RATING_STEPS = Array.from({ length: 9 }, (_, i) => 1 + i * 0.5);

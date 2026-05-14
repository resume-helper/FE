import {
  LogoKakaoColor,
  LogoNaverColor,
  LogoGoogleColor,
} from "@/shared/icons";

export const SOCIAL_CONFIG = {
  kakao: {
    label: "카카오톡 로그인",
    icon: LogoKakaoColor,
    className: "bg-kakao-bg text-kakao-text",
  },
  naver: {
    label: "네이버 로그인",
    icon: LogoNaverColor,
    className: "bg-naver-bg text-static-white",
  },
  google: {
    label: "구글 로그인",
    icon: LogoGoogleColor,
    className:
      "bg-background-normal text-label-neutral border border-google-border",
  },
} as const;

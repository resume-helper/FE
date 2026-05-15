import {
  LogoKakaoColor,
  LogoNaverColor,
  LogoGoogleColor,
} from "@/shared/icons";

export const SOCIAL_CONFIG = {
  kakao: {
    icon: LogoKakaoColor,
    className: "bg-kakao-bg text-kakao-text",
  },
  naver: {
    icon: LogoNaverColor,
    className: "bg-naver-bg text-static-white",
  },
  google: {
    icon: LogoGoogleColor,
    className:
      "bg-background-normal text-label-neutral border border-google-border",
  },
} as const;

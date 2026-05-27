import type { CSSProperties } from "react";
import { IconLogoKakaoColor, IconLogoGoogleColor } from "@wanteddev/wds-icon";
import LogoNaverColor from "@/features/auth/components/LogoNaverColor";

export const SOCIAL_CONFIG: Record<
  string,
  {
    icon: React.ComponentType<React.SVGProps<SVGSVGElement>>;
    style: CSSProperties;
  }
> = {
  kakao: {
    icon: IconLogoKakaoColor,
    style: { background: "#FEE500" },
  },
  naver: {
    icon: LogoNaverColor,
    style: { background: "#03C75A", color: "#FFFFFF" },
  },
  google: {
    icon: IconLogoGoogleColor,
    style: { background: "#FFFFFF", color: "#191919", borderColor: "#E0E0E0" },
  },
};

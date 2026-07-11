"use client";

import { BtnLogin } from "@/features/BtnLogin";
import { Logo } from "@/shared/ui/Logo";

export const BeforeLoginHeader = () => {
  return (
    <header className="h-[60px] border-b border-[#70737C29]">
      <div className="mx-auto flex h-full max-w-[1200px] items-center justify-between px-[20px]">
        <Logo />
        <div className="flex items-center">
          {/* <nav className="max-[768px]:hidden mr-[20px]">
                        <ul className="flex gap-[40px] text-[0.875rem] font-[600]">
                            <li><Link href="">About us</Link></li>
                            <li><Link href="">서비스</Link></li>
                            <li><Link href="">요금제</Link></li>
                            <li><Link href="">Blog</Link></li>
                        </ul>
                    </nav> */}
          <BtnLogin />
        </div>
      </div>
    </header>
  );
};

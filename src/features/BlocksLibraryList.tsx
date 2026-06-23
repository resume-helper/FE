"use client";

export const BlocksLibraryList = () => {
  return (
    <ol>
      {Array.from({ length: 7 }).map((_, i) => {
        return (
          <li
            className="flex h-[78px] items-center"
            key={`블록라이브러리-더미-${i}`}
          >
            <span className="h-[24px] w-[56px] shrink-0 rounded-[6px] bg-[#EBF7F9] text-center text-[0.75rem] leading-[24px] text-[#0098B2]">
              경력
            </span>
            <dl className="ml-[16px] max-w-[432px] min-w-[312px]">
              <dt className="truncate text-[1.0625rem] font-[500]">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Veritatis atque ab, reiciendis non iste impedit? Iusto, iure.
                Assumenda dignissimos repellendus minima eius? Nisi vero odio
                esse exercitationem obcaecati quam amet.
              </dt>
              <dd className="text-[0.8125rem] font-[400] text-[#37383C9C]">
                2026.06 - 2026.06
              </dd>
            </dl>
          </li>
        );
      })}
    </ol>
  );
};

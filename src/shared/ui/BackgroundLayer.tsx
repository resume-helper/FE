"use client";

interface BACKGROUND_LAYER extends LAYOUT_CHILD {
  onClickCallback?: () => void;
}

export const BackgroundLayer = ({
  children,
  onClickCallback,
}: BACKGROUND_LAYER) => {
  return (
    <div
      onClick={onClickCallback}
      className="fixed top-0 left-0 z-3 h-full w-full bg-[#1E1E1E99]"
    >
      {children}
    </div>
  );
};

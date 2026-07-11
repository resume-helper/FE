"use client";

import Image from "next/image";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";

// import { IconStar } from "@/shared/icon/Star"
import { BeforeLoginHeader } from "@/widgets/BeforeLoginHeader";
import { BeforeLoginFooter } from "@/widgets/BeforeLoginFooter";

const HomePageView = () => {
  return (
    <>
      <BeforeLoginHeader />
      <div className="mx-auto max-[768px]:max-w-[360px] min-[768px]:w-[768px] min-[1200px]:w-[1200px]">
        <h1 className="sr-only">렌딩 페이지</h1>
        <main className="mt-[60px] px-[20px] min-[1200px]:px-[40px]">
          <section
            className={`flex w-full flex-col justify-between gap-[24px] max-[767px]:items-center min-[767px]:flex-row`}
          >
            <h2 className="sr-only">메인 배너</h2>
            <div className="w-full text-center min-[768px]:w-[372px] min-[768px]:text-left min-[1200px]:w-[724px]">
              <dl className="font-[Pretendard]">
                <dt className="text-[1.25rem] leading-[133%] font-[700] tracking-[-2.7%] min-[768px]:text-[1.75rem] min-[1200px]:text-[2.25rem]">
                  이력서 작성부터 피드백까지, 한 번에
                </dt>
                <dd className="mt-[8px] text-[0.9375rem] leading-[145%] font-[400] tracking-[-0.02%] break-keep min-[767px]:text-[1.125rem]">
                  한 번 쌓은 경험 블록으로 PDF와 웹 이력서를 동시에 만들고, 실제
                  피드백까지 받아보세요
                </dd>
              </dl>
              <button className="mt-[24px] h-[48px] w-[126px] rounded-[12px] bg-[#0066FF] leading-[150%] font-[600] tracking-[0.57%] text-[#fff]">
                무료로 시작하기
              </button>
            </div>
            <article className="relative h-[360px] w-[320px] rounded-[24px] bg-[#F7F7F8] min-[768px]:w-[372px]">
              <h2 className="absolute top-1/2 left-1/2 -translate-1/2">
                콘텐츠영역
              </h2>
            </article>
          </section>
          <section className={`mt-[60px] w-full`}>
            <h2 className="sr-only">서비스 섹션</h2>
            <dl>
              <dt className="text-[1.25rem] font-[700] tracking-[-2.36%] text-[#171719] min-[768px]:text-[1.375rem] min-[1200px]:text-[1.75rem]">
                서비스
              </dt>
              <dd className="mt-[8px] text-[0.9375rem] font-[400] tracking-[-0.02%] text-[#171719] min-[768px]:text-[1rem] min-[1200px]:text-[1.125rem]">
                다음과 같은 기능들을 사용해 볼 수 있어요 원하는 기능을 선택해
                보세요 아마도 두줄까지는 사용할 것 같아요.
              </dd>
            </dl>
            <ul className="mt-[32px] flex gap-[20px] max-[768px]:flex-col max-[768px]:items-center">
              <li className="relative h-[170px] rounded-[16px] bg-[#F7F7F8] p-[16px] max-[768px]:w-[320px] max-[768px]:max-w-[320px] min-[768px]:h-[198px] min-[768px]:w-[229.33px] min-[1200px]:h-[204px] min-[1200px]:w-[360px]">
                <dl>
                  <dt className="font-[600] min-[1200px]:text-[1.25rem]">
                    컨텐츠 블록 (기능1)
                  </dt>
                  <dd className="min-[1200px]:text-[1rem]">
                    컨텐츠 블록에 대한 설명이 대략 두문장 정도 들어가요.
                  </dd>
                </dl>
                <div className="absolute right-[16px] bottom-[16px] size-[64px] rounded-[12px] bg-[#989BA2]"></div>
              </li>
              <li className="relative h-[170px] rounded-[16px] bg-[#F7F7F8] p-[16px] max-[768px]:w-[320px] max-[768px]:max-w-[320px] min-[768px]:h-[198px] min-[768px]:w-[229.33px] min-[1200px]:h-[204px] min-[1200px]:w-[360px]">
                <dl>
                  <dt className="font-[600] min-[1200px]:text-[1.25rem]">
                    컨텐츠 블록 (기능1)
                  </dt>
                  <dd className="min-[1200px]:text-[1rem]">
                    컨텐츠 블록에 대한 설명이 대략 두문장 정도 들어가요.
                  </dd>
                </dl>
                <div className="absolute right-[16px] bottom-[16px] size-[64px] rounded-[12px] bg-[#989BA2]"></div>
              </li>
              <li className="relative h-[170px] rounded-[16px] bg-[#F7F7F8] p-[16px] max-[768px]:w-[320px] max-[768px]:max-w-[320px] min-[768px]:h-[198px] min-[768px]:w-[229.33px] min-[1200px]:h-[204px] min-[1200px]:w-[360px]">
                <dl>
                  <dt className="font-[600] min-[1200px]:text-[1.25rem]">
                    컨텐츠 블록 (기능1)
                  </dt>
                  <dd className="min-[1200px]:text-[1rem]">
                    컨텐츠 블록에 대한 설명이 대략 두문장 정도 들어가요.
                  </dd>
                </dl>
                <div className="absolute right-[16px] bottom-[16px] size-[64px] rounded-[12px] bg-[#989BA2]"></div>
              </li>
            </ul>
          </section>
          <section className="mt-[60px] h-[477px] w-full bg-[#F7F7F8] pt-[32px]">
            <h2 className="text-center text-[1.25rem] font-[700] min-[768px]:text-[1.375rem] min-[1200px]:text-[1.75rem]">
              저희 서비스 사용 후기를 확인해 보세요
            </h2>
            <div className="m-[20px_48px] flex items-center justify-center gap-[8px] [&>button]:h-[32px] [&>button]:rounded-[8px] [&>button]:border [&>button]:text-[0.8125rem] [&>button]:leading-[32px] [&>button]:font-[600]">
              <button className="w-[76px] border-[#70737C29] text-[#171719]">
                회원가입
              </button>
              <button className="w-[123px] border-[#0066FF] bg-[#0066FF] text-[#fff]">
                지금바로 사용하기
              </button>
            </div>
            <article className="perspective-[1000px] transform-3d">
              <h2 className="sr-only">스와이프 박스</h2>

              <Swiper
                wrapperTag="ol"
                centeredSlides
                slidesPerView={"auto"}
                spaceBetween={16}
                loop
                className="relative translate-z-[-100px] before:absolute before:top-0 before:left-0 before:z-2 before:block before:h-full before:w-full before:backdrop-blur-[4px] before:content-['']"
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <SwiperSlide
                    tag="li"
                    key={index}
                    className="h-[175px] !w-[280px] rounded-[12px] bg-[#454545] p-[16px] text-[0.8125rem] tracking-[0.96%] text-[#fff] shadow-[0px_4px_12px_0px_#00000040] transition-transform"
                  >
                    <h3 className="text-[0.9375rem] tracking-[1.94%]">
                      아이디
                    </h3>
                    <p>나이 · 직업</p>
                    <div className="mt-[4px] flex gap-[4px]">
                      {/* <IconStar/>
                                        <IconStar/>
                                        <IconStar/>
                                        <IconStar/>
                                        <IconStar/> */}
                    </div>
                    <p className="mt-[17px] leading-[138%] font-[400]">
                      후기내용에 대해 간략하게 2줄 정도 작성 된 내용이 노출되는
                      구간 대략 1~3줄까지 노출되도 괜찮을 것 같다.
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                wrapperTag="ol"
                centeredSlides
                slidesPerView={"auto"}
                spaceBetween={16}
                loop
                className="relative top-[-45px] z-2"
              >
                {Array.from({ length: 8 }).map((_, index) => (
                  <SwiperSlide
                    tag="li"
                    key={index}
                    className="h-[175px] !w-[280px] rounded-[12px] bg-[#454545] p-[16px] text-[0.8125rem] tracking-[0.96%] text-[#fff] shadow-[0px_4px_12px_0px_#00000040] transition-transform"
                  >
                    <h3 className="text-[0.9375rem] tracking-[1.94%]">
                      아이디
                    </h3>
                    <p>나이 · 직업</p>
                    <div className="mt-[4px] flex gap-[4px]">
                      {/* <IconStar/>
                                        <IconStar/>
                                        <IconStar/>
                                        <IconStar/>
                                        <IconStar/> */}
                    </div>
                    <p className="mt-[17px] leading-[138%] font-[400]">
                      후기내용에 대해 간략하게 2줄 정도 작성 된 내용이 노출되는
                      구간 대략 1~3줄까지 노출되도 괜찮을 것 같다.
                    </p>
                  </SwiperSlide>
                ))}
              </Swiper>
            </article>
          </section>
          <section className="mt-[60px] w-full text-center">
            <h2 className="mb-[16px] text-center text-[1.25rem] leading-[136%] font-[600] min-[768px]:text-[1.375rem] min-[1200px]:text-[1.75rem]">
              [서비스명]에서 <br /> 이런 기능을 쓸 수 있어요
            </h2>
            <div className="flex w-full items-center justify-center gap-[9px] [&>button]:rounded-[8px] [&>button]:bg-[#F2F2F7] [&>button]:p-[7px] [&>button]:text-[0.8125rem] [&>button.on]:bg-[#0066FF] [&>button.on]:text-[#fff]">
              <button className="on">컨텐츠 블록</button>
              <button>PDF 이력서 빌더</button>
              <button>웹사이트 이력서 빌더</button>
            </div>
            <article className="mt-[24px] inline-flex h-[256px] flex-col items-center rounded-[20px] bg-[#F7F7F8] pt-[28px] min-[768px]:w-[500px]">
              <h2 className="sr-only">탭 콘텐츠</h2>
              <dl className="[&>dd]:text-[0.8125rem] [&>dd]:leading-[138%] [&>dd]:font-[400]">
                <dt className="mb-[8px] text-[1.0625rem] leading-[141%] font-[600]">
                  내 경력 모든 정보를 차곡차곡
                </dt>
                <dd>
                  경력에 대한 모든 정보를 차곡차곡 쌓아서 관리할 수 있어요.{" "}
                </dd>
                <dd>대략 2줄정도 들어갈 것 같아요.</dd>
              </dl>
              <div className="relative mt-auto inline-block h-[140px] w-[240px]">
                <Image
                  sizes="100vw"
                  src={"/landingPageImage1.png"}
                  alt="랜딩페이지 이미지"
                  fill
                  loading="eager"
                />
              </div>
            </article>
          </section>
        </main>
      </div>
      <BeforeLoginFooter />
    </>
  );
};

export default HomePageView;

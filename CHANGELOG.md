# 🚦 CHANGELOG

## 1.0.0 (2026-05-30)

### ✨ Features

- Alert 공통 컴포넌트 및 useAlert 훅, GlobalAlert 구현 ([#24](https://github.com/resume-helper/FE/issues/24)) ([6aa6b8b](https://github.com/resume-helper/FE/commit/6aa6b8b0b5b8601f9b023a3dd297b4ac5ce71783))
- Button 공통 컴포넌트 구현 ([#14](https://github.com/resume-helper/FE/issues/14)) ([0b78016](https://github.com/resume-helper/FE/commit/0b78016e78a0f0ec04b4f0ff63d141c7da879994))
- CheckBox 공통 컴포넌트 구현 ([#38](https://github.com/resume-helper/FE/issues/38)) ([9d10e59](https://github.com/resume-helper/FE/commit/9d10e59c077922e8fbc9d4eec6f583081ce47c14))
- CheckMark 공통 컴포넌트 구현 ([#37](https://github.com/resume-helper/FE/issues/37)) ([08cb707](https://github.com/resume-helper/FE/commit/08cb7076b3bba9eb55ad0e792567355f40705d25))
- Chip 공통 컴포넌트 구현 ([#20](https://github.com/resume-helper/FE/issues/20)) ([708dd54](https://github.com/resume-helper/FE/commit/708dd5482ee6c6574800b1f45a54f155d4f29171))
- IconButton 공통 컴포넌트 구현 ([#19](https://github.com/resume-helper/FE/issues/19)) ([3e7b6c1](https://github.com/resume-helper/FE/commit/3e7b6c14718f05fba618aee303e370806ef8c6e8))
- Popover 공통 컴포넌트 구현 ([#43](https://github.com/resume-helper/FE/issues/43)) ([f07e402](https://github.com/resume-helper/FE/commit/f07e4027b3a7d11089e126e9d11049848be3fcc4))
- Popup 공통 컴포넌트 구현 ([#9](https://github.com/resume-helper/FE/issues/9)) ([f5a1c63](https://github.com/resume-helper/FE/commit/f5a1c63268fd64c99ae8ed1662b6793a293ba837))
- SegmentedControl 공통 컴포넌트 구현 ([#39](https://github.com/resume-helper/FE/issues/39)) ([b64fb9c](https://github.com/resume-helper/FE/commit/b64fb9cee282fb3c34ee45234a12e1505b575885))
- Select 공통 컴포넌트 구현 ([#42](https://github.com/resume-helper/FE/issues/42)) ([3d52bad](https://github.com/resume-helper/FE/commit/3d52bad8139357ea96498ca20bb3156894346f1b))
- Skeleton 공통 컴포넌트 구현 ([#2](https://github.com/resume-helper/FE/issues/2)) ([ea02cc3](https://github.com/resume-helper/FE/commit/ea02cc309a8888c6dc0c403b811c9c503fafb645))
- sonner 기반 Toast 공통 컴포넌트 구현 ([#25](https://github.com/resume-helper/FE/issues/25)) ([ba3756b](https://github.com/resume-helper/FE/commit/ba3756bf4848dcda240d99a532c6524127f23ee3))
- Spinner 공통 컴포넌트 구현 ([#1](https://github.com/resume-helper/FE/issues/1)) ([49cb979](https://github.com/resume-helper/FE/commit/49cb979091fd40cd67935a2a2f3a562c0e9d85f0))
- TanStack Query Provider 설정 및 보일러플레이트 제거 ([784e1be](https://github.com/resume-helper/FE/commit/784e1be2a94f3bd8dc3bde9cba45cf4964b73376))
- TextArea 공통 컴포넌트 구현 ([#40](https://github.com/resume-helper/FE/issues/40)) ([f3c0f3c](https://github.com/resume-helper/FE/commit/f3c0f3cafad5cb18371e309949835371778dea29))
- TextButton 공통 컴포넌트 구현 ([#18](https://github.com/resume-helper/FE/issues/18)) ([9c9c8e0](https://github.com/resume-helper/FE/commit/9c9c8e08f62d15e5d8b98b4ec0a76f62d2876b41))
- TextField 공통 컴포넌트 구현 ([#41](https://github.com/resume-helper/FE/issues/41)) ([f44aaba](https://github.com/resume-helper/FE/commit/f44aababd5cae5d0ed8d90f1cae9ac80c3d24869))
- 공통 UI 컴포넌트 구현 (Avatar, Tooltip, Menu, Tab, ListCell, ProgressIndicator, Pagination, Category, ContentBadge) ([#16](https://github.com/resume-helper/FE/issues/16)) ([0ff5ba6](https://github.com/resume-helper/FE/commit/0ff5ba6b815c825529238a6ecb1c5e25a094eb48))
- 디자인 시스템 토큰 및 Pretendard 폰트 초기 설정 ([4b9d4e6](https://github.com/resume-helper/FE/commit/4b9d4e60ca46302e51e562e4f1aeb97983b21c1a))
- 소셜 로그인 플로우 및 헤더 컴포넌트 구현 ([#10](https://github.com/resume-helper/FE/issues/10)) ([0490f3c](https://github.com/resume-helper/FE/commit/0490f3ce2acf421d9c10a485cbadfb77a5f53ccd))

### 🐛 Bug Fixes

- ecosystem config를 .cjs로 변경 및 npm ci ignore-scripts 적용 ([76a4e20](https://github.com/resume-helper/FE/commit/76a4e20148e03823c1cece6cdb46ea603fbc9fa7))
- upload-artifact 경로 trailing slash 제거 (.next 디렉토리 보존) ([126357e](https://github.com/resume-helper/FE/commit/126357ea25870563ccd96d6032ff284f364046c8))
- 로그아웃 중복 클릭 방지 ([#11](https://github.com/resume-helper/FE/issues/11)) ([00f76ab](https://github.com/resume-helper/FE/commit/00f76abdaddcd01631d1cbb862e04b8ffca4e8a7))
- 빌드 아티팩트를 tar로 패키징해 경로 손실 문제 해결 ([f50061a](https://github.com/resume-helper/FE/commit/f50061a5e4a67fcad7ede92a6a1c7a7c0b411870))
- 소셜 로그인 후 뒤로가기 시 auth/me 호출 이슈 수정 ([#17](https://github.com/resume-helper/FE/issues/17)) ([e131b43](https://github.com/resume-helper/FE/commit/e131b433c82ce9ce77f37831bbb3e2c075cebe84))

### ♻️ Refactor

- Avatar 커스텀 사이즈 타입 제거 ([#21](https://github.com/resume-helper/FE/issues/21)) ([4497055](https://github.com/resume-helper/FE/commit/4497055b55c430b6cd1240e836c623a232418274))
- Avatar 커스텀 사이즈 타입 추가 및 아이콘 변경 ([#22](https://github.com/resume-helper/FE/issues/22)) ([b814a93](https://github.com/resume-helper/FE/commit/b814a937c3033f1b726430f72c49e38a84f9db91))
- Button 공통 컴포넌트 적용 ([#15](https://github.com/resume-helper/FE/issues/15)) ([7b0a186](https://github.com/resume-helper/FE/commit/7b0a186c4d78221ab0b1a1c3dc4dfedba0ca3b99))
- Category 하드코딩된 색상을 semantic 토큰으로 교체 ([#29](https://github.com/resume-helper/FE/issues/29)) ([6fb51d4](https://github.com/resume-helper/FE/commit/6fb51d41869212de839cd005ad04946d3722281b))
- ContentBadge 시맨틱 토큰 적용 ([#33](https://github.com/resume-helper/FE/issues/33)) ([03b4717](https://github.com/resume-helper/FE/commit/03b4717cd5ba6c01a8eda1daccc043afcf976bd3))
- ListCell 시맨틱 토큰 적용 ([#35](https://github.com/resume-helper/FE/issues/35)) ([17e54f0](https://github.com/resume-helper/FE/commit/17e54f0bbe530f9333da439659d88dd829b50cdb))
- Menu 시맨틱 토큰 적용 ([#36](https://github.com/resume-helper/FE/issues/36)) ([b386e65](https://github.com/resume-helper/FE/commit/b386e65b7ccf3d695c46acb64d4c12e742d09b7b))
- Pagination 시맨틱 토큰 적용 ([#31](https://github.com/resume-helper/FE/issues/31)) ([d4a31c3](https://github.com/resume-helper/FE/commit/d4a31c3227536338a6e018d334d6e858b48236ff))
- Popup 타이포그래피 토큰 업데이트 ([#27](https://github.com/resume-helper/FE/issues/27)) ([afa290a](https://github.com/resume-helper/FE/commit/afa290a4e859118587ed61051c17e6566b7420cc))
- ProgressIndicator 시맨틱 토큰 적용 ([#32](https://github.com/resume-helper/FE/issues/32)) ([809c848](https://github.com/resume-helper/FE/commit/809c848372231e894277459e4fc1d9fd709e10f6))
- PushBadge dot 컬러를 primary-normal 토큰으로 교체 ([#28](https://github.com/resume-helper/FE/issues/28)) ([f669ebc](https://github.com/resume-helper/FE/commit/f669ebcd68e7269c691662a7c48e415d7ee0659a))
- Spinner 컴포넌트를 Wanted 디자인 시스템 스펙에 맞게 교체 ([#7](https://github.com/resume-helper/FE/issues/7)) ([314edd1](https://github.com/resume-helper/FE/commit/314edd1104072175af63f135579e28562b489498))
- Tab 시맨틱 토큰 적용 ([#34](https://github.com/resume-helper/FE/issues/34)) ([00ab5c8](https://github.com/resume-helper/FE/commit/00ab5c846d12ba99df8b6efbaaf2e03992afeaea))
- Tooltip 시맨틱 토큰 적용 ([#30](https://github.com/resume-helper/FE/issues/30)) ([84e7604](https://github.com/resume-helper/FE/commit/84e76043913c1663bce5383173827e5308772054))
- 타이포그래피 토큰 폰트 굵기 포함 복합 클래스로 재정의 ([#26](https://github.com/resume-helper/FE/issues/26)) ([420c036](https://github.com/resume-helper/FE/commit/420c036c720fbf3123a9b7af05c05c0d247468a4))

### 💫 CI/CD

- commitlint, semantic-release ([9f1097e](https://github.com/resume-helper/FE/commit/9f1097ea2cfc245dc2a4ecd4a19ab196f6d1469e))
- main 브랜치 EC2 자동 배포 workflow 추가 ([ff08639](https://github.com/resume-helper/FE/commit/ff0863990306ebd84be05c48280a09337c6798bb))
- pnpm -> npm 변경 ([2b877cb](https://github.com/resume-helper/FE/commit/2b877cbcb2871f0b9d826d815627d687aa24dacf))
- PR 코드 품질 검사 workflow 추가 ([a56b1bf](https://github.com/resume-helper/FE/commit/a56b1bfdb9b47e7173a412c5f076a5345c1c975a))
- semantic-release 워크플로우 node 버전 22로 상향 ([3373986](https://github.com/resume-helper/FE/commit/3373986feaa6622269254cc66c0d777ea8556c6d))

# Resume Helper — Frontend

> Next.js + TypeScript 기반의 Resume Helper 프론트엔드입니다.

**Next.js** `16.2.4` · **React** `19.2.4` · **TypeScript** `5` · **Tailwind CSS** `4` · **Storybook** `10.4.1`

## Getting Started

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev
```

[http://localhost:3000](http://localhost:3000) 에서 결과를 확인할 수 있습니다.

### Storybook

```bash
# 로컬에서 Storybook 실행 (http://localhost:6006)
npm run storybook

# 정적 빌드
npm run build-storybook
```

### Scripts

| Script                   | 설명                                     |
| ------------------------ | ---------------------------------------- |
| `npm run dev`            | 개발 서버 실행                           |
| `npm run build`          | 프로덕션 빌드                            |
| `npm run lint`           | ESLint 검사                              |
| `npm run typecheck`      | 타입 검사 (`tsc --noEmit`)               |
| `npm run test`           | 유닛 테스트 (Vitest)                     |
| `npm run test:storybook` | 스토리 기반 브라우저 테스트 (Playwright) |
| `npm run storybook`      | Storybook 개발 서버                      |
| `npm run chromatic`      | Chromatic 시각 회귀 테스트 게시          |

## Commit Message Convention

커밋 메시지는 일관성과 명확성을 위해 다음 형식을 따릅니다. (`commitlint` 로 강제)

```
<type>(<scope>): <message>
```

- **`<type>`**: 커밋 유형. 아래 중 하나여야 합니다.
- **`<scope>`** _(선택)_: 영향을 받는 모듈, 파일, 기능 등의 범위.
- **`<message>`**: 간결하고 명확한 변경 설명.

| Type       | Description                                 |
| ---------- | ------------------------------------------- |
| `feat`     | 새로운 기능, 개선, 기능 추가                |
| `fix`      | 버그 수정 또는 이슈 해결                    |
| `perf`     | 성능 개선을 위한 코드 최적화                |
| `refactor` | 동작 변경 없는 코드 구조 개선               |
| `style`    | 코드 포맷팅, 스타일 컨벤션 (동작 변경 없음) |
| `docs`     | 문서 수정                                   |
| `test`     | 테스트 코드 추가/수정/리팩터링              |
| `chore`    | 잡무, 유지보수, 의존성 관리                 |
| `revert`   | 이전 변경 되돌리기                          |
| `move`     | 파일/디렉터리/코드를 새 위치로 이동         |
| `remove`   | 불필요한 코드/파일/디렉터리 삭제            |
| `ci`       | CI/CD 설정 변경                             |

### Example Commit Messages

```
feat(auth): add user login functionality
fix(api): resolve data processing error
style(css): update styling for the login page
docs(readme): update project description
test(unit): add tests for user management module
chore(deps): update package dependencies
revert: revert previous commit
move(src): move model classes to a new directory
remove(deprecated): remove unused functions
ci(github): update CI workflow configuration
```

## Chromatic

이 프로젝트의 Storybook은 Chromatic에서 확인할 수 있습니다. (PR 및 `main` push 시 자동 게시)

- **Storybook (main):** https://main--6a1b0d15e443b4184c13e123.chromatic.com
- **Builds 대시보드:** https://www.chromatic.com/builds?appId=6a1b0d15e443b4184c13e123

## CHANGELOG

릴리스 노트는 [`semantic-release`](https://semantic-release.gitbook.io/) 가 커밋 컨벤션을 기반으로 자동 생성합니다.
변경 내역은 [CHANGELOG.md](./CHANGELOG.md) 에서 확인할 수 있습니다.

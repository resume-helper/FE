"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  Button,
  FlexBox,
  TextButton,
  Typography,
  Chip,
  FormField,
  FormLabel,
  FormControl,
  DatePicker,
  TextField,
  TextArea,
  TextAreaContent,
  Select,
  OptionGroup,
  Option,
  Checkbox,
  Label,
} from "@wanteddev/wds";
import {
  IconCheck,
  IconChevronLeft,
  IconMinus,
  IconPlus,
} from "@wanteddev/wds-icon";

type BlockType =
  | "경력"
  | "프로젝트"
  | "기술스택"
  | "자기소개"
  | "학력"
  | "수상・자격"
  | "활동・교육";

const BLOCK_TYPES: BlockType[] = [
  "경력",
  "프로젝트",
  "기술스택",
  "자기소개",
  "학력",
  "수상・자격",
  "활동・교육",
];

export default function Page() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<BlockType>("경력");

  return (
    <FlexBox flexDirection="column" gap="20px">
      <TextButton
        color="assistive"
        leadingContent={<IconChevronLeft />}
        onClick={() => router.push("/block-library")}
      >
        뒤로가기
      </TextButton>

      <FlexBox alignItems="center" justifyContent="space-between">
        <Typography variant="title1" weight="medium">
          {selectedType}
        </Typography>

        <FlexBox alignItems="center" gap="8px">
          <Button variant="outlined" color="assistive">
            임시저장ㅣ0
          </Button>
          <Button leadingContent={<IconCheck />}>저장</Button>
        </FlexBox>
      </FlexBox>

      <FlexBox alignItems="center" gap="10px">
        {BLOCK_TYPES.map((type) => (
          <Chip
            key={type}
            variant={selectedType === type ? "solid" : "outlined"}
            active={selectedType === type}
            onClick={() => setSelectedType(type)}
          >
            {type}
          </Chip>
        ))}
      </FlexBox>

      {selectedType === "경력" && (
        <FlexBox
          flexDirection="column"
          gap="20px"
          sx={{
            padding: "20px",
            background: "var(--semantic-background-elevated-normal)",
          }}
        >
          <FormField>
            <FormLabel required>회사명</FormLabel>
            <FormControl>
              <TextField placeholder="회사명" />
            </FormControl>
          </FormField>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>근무부서</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="근무부서" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>직무</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="직무" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>직급/직책</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="직급/직책" />
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>재직형태</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="선택해주세요.">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>입사년월</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>퇴사년월</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM" />
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox flexDirection="column" gap="8px">
            <TextButton color="assistive" leadingContent={<IconPlus />}>
              주요성과 추가
            </TextButton>

            <FormField>
              <FormLabel required>주요성과</FormLabel>
              <FormControl>
                <TextArea
                  width="100%"
                  placeholder={`- 담당 업무 중 핵심 내용을 구체적으로 작성하세요.\n- 어떤 역할을 맡았고 어떤 결과를 만들었는지 작성해보세요.\n- 수치화할 수 있는 성과나 개선 결과가 있다면 함께 작성해보세요.`}
                  leadingContent={
                    <TextAreaContent variant="characterCounter">
                      2000
                    </TextAreaContent>
                  }
                />
              </FormControl>
            </FormField>
          </FlexBox>

          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
            fullWidth
          >
            추가하기
          </Button>
        </FlexBox>
      )}

      {selectedType === "프로젝트" && (
        <FlexBox
          flexDirection="column"
          gap="20px"
          sx={{
            padding: "20px",
            background: "var(--semantic-background-elevated-normal)",
          }}
        >
          <FormField>
            <FormLabel required>프로젝트명</FormLabel>
            <FormControl>
              <TextField placeholder="프로젝트명" />
            </FormControl>
          </FormField>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>시작일</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM.DD" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>종료일</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM.DD" />
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel>기여도</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="기여도" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel>사용 기술스택</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="사용 기술스택" />
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox flexDirection="column" gap="8px">
            <FormField>
              <FormLabel>문제 해결 과정</FormLabel>
              <FormControl>
                <TextArea
                  width="100%"
                  placeholder={`- 프로젝트의 목적과 본인의 역할을 함께 작성하세요.\n- 진행 과정에서의 기여도나 협업 경험도 함께 정리해보세요.\n- 어떤 문제를 해결했고 어떤 결과를 만들었는지 구체적으로 작성해보세요.`}
                  leadingContent={
                    <TextAreaContent variant="characterCounter">
                      2000
                    </TextAreaContent>
                  }
                />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormControl>
                <TextField
                  width="100%"
                  placeholder="링크(GitHub, 배포, URL 등)"
                />
              </FormControl>
            </FormField>
          </FlexBox>

          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
            fullWidth
          >
            추가하기
          </Button>
        </FlexBox>
      )}

      {selectedType === "기술스택" && (
        <FlexBox
          flexDirection="column"
          gap="16px"
          sx={{
            padding: "20px",
            background: "var(--semantic-background-elevated-normal)",
          }}
        >
          <FormField>
            <FormLabel required>기술스택명</FormLabel>
            <FormControl>
              <TextField placeholder="기술목록" />
            </FormControl>
          </FormField>

          <FormField>
            <FormControl>
              <Select width="100%" placeholder="선택해주세요.">
                {new Array(3).fill(0).map((_, i) => (
                  <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                    {new Array(3).fill(0).map((__, j) => (
                      <Option key={j} value={`값 ${i} ${j}`}>
                        {`값 ${i} ${j}`}
                      </Option>
                    ))}
                  </OptionGroup>
                ))}
              </Select>
            </FormControl>
          </FormField>

          <FlexBox flexDirection="column" gap="8px">
            <FormField>
              <FormLabel required>활용범위</FormLabel>
              <FormControl>
                <TextArea
                  width="100%"
                  placeholder={`- 실제 업무나 프로젝트에서 사용한 기술과 도구를 작성하세요.\n- 익숙한 수준보다 ‘어떻게 활용했는지’를 중심으로 작성해보세요.\n- 사용 목적이나 활용 경험을 함께 작성하면 이해에 도움이 됩니다.`}
                  leadingContent={
                    <TextAreaContent variant="characterCounter">
                      2000
                    </TextAreaContent>
                  }
                />
              </FormControl>
            </FormField>
          </FlexBox>

          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
            fullWidth
          >
            추가하기
          </Button>
        </FlexBox>
      )}

      {selectedType === "자기소개" && (
        <FlexBox
          flexDirection="column"
          gap="16px"
          sx={{
            padding: "20px",
            background: "var(--semantic-background-elevated-normal)",
          }}
        >
          <FormField>
            <FormLabel required>자기소개서 제목</FormLabel>
            <FormControl>
              <TextField placeholder="자기소개서 제목" />
            </FormControl>
          </FormField>

          <FlexBox flexDirection="column" gap="8px">
            <FormField>
              <FormLabel required>상세내용</FormLabel>
              <FormControl>
                <TextArea
                  width="100%"
                  placeholder={`- 경험을 단순히 나열하기보다 본인의 강점과 방향성이 드러나도록 작성해보세요.\n- 지원 직무와 연결되는 경험이나 가치관을 함께 정리하면 좋습니다.\n- 구체적인 경험을 기반으로 작성할수록 설득력이 높아집니다.`}
                  leadingContent={
                    <TextAreaContent variant="characterCounter">
                      2000
                    </TextAreaContent>
                  }
                />
              </FormControl>
            </FormField>
          </FlexBox>

          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
            fullWidth
          >
            추가하기
          </Button>
        </FlexBox>
      )}

      {selectedType === "학력" && (
        <FlexBox
          flexDirection="column"
          gap="20px"
          sx={{
            padding: "20px",
            background: "var(--semantic-background-elevated-normal)",
          }}
        >
          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>학력구분</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="선택해주세요.">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>대학구분</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="선택해주세요.">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>학교명</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="근무부서" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>졸업여부</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="선택해주세요.">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>전공</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="전공" />
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>입학년월</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>졸업년월</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>지역</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="지역 선택">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel>추가전공</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="추가전공" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel>전공구분</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="전공구분">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel>학점</FormLabel>
              <FormControl>
                <TextField width="100%" placeholder="학점" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel>기준학점</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="기준학점">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel>지역</FormLabel>
              <FormControl>
                <Select width="100%" placeholder="지역 선택">
                  {new Array(3).fill(0).map((_, i) => (
                    <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                      {new Array(3).fill(0).map((__, j) => (
                        <Option key={j} value={`값 ${i} ${j}`}>
                          {`값 ${i} ${j}`}
                        </Option>
                      ))}
                    </OptionGroup>
                  ))}
                </Select>
              </FormControl>
            </FormField>
          </FlexBox>

          <FlexBox gap="8px">
            <Checkbox size="medium" id="small" />
            <Label htmlFor="small">편입</Label>
          </FlexBox>

          <FlexBox gap="8px">
            <Button
              variant="outlined"
              color="assistive"
              leadingContent={<IconMinus />}
            >
              추가전공
            </Button>
            <Button
              variant="outlined"
              color="assistive"
              leadingContent={<IconMinus />}
            >
              지역
            </Button>
          </FlexBox>

          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
            fullWidth
          >
            추가하기
          </Button>
        </FlexBox>
      )}

      {selectedType === "수상・자격" && (
        <FlexBox
          flexDirection="column"
          gap="16px"
          sx={{
            padding: "20px",
            background: "var(--semantic-background-elevated-normal)",
          }}
        >
          <FormField>
            <FormLabel required>수상・자격 구분</FormLabel>
            <FormControl>
              <Select width="100%" placeholder="선택해주세요.">
                {new Array(3).fill(0).map((_, i) => (
                  <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                    {new Array(3).fill(0).map((__, j) => (
                      <Option key={j} value={`값 ${i} ${j}`}>
                        {`값 ${i} ${j}`}
                      </Option>
                    ))}
                  </OptionGroup>
                ))}
              </Select>
            </FormControl>
          </FormField>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>수상・공모전명</FormLabel>
              <FormControl>
                <TextField placeholder="수상・공모전명" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>수상・공모일</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM" />
              </FormControl>
            </FormField>
          </FlexBox>

          <FormField sx={{ flex: 1 }}>
            <FormLabel required>수여・주최기관</FormLabel>
            <FormControl>
              <TextField placeholder="수여・주최기관" />
            </FormControl>
          </FormField>

          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
            fullWidth
          >
            추가하기
          </Button>
        </FlexBox>
      )}

      {selectedType === "활동・교육" && (
        <FlexBox
          flexDirection="column"
          gap="16px"
          sx={{
            padding: "20px",
            background: "var(--semantic-background-elevated-normal)",
          }}
        >
          <FormField>
            <FormLabel required>활동 구분 선택</FormLabel>
            <FormControl>
              <Select width="100%" placeholder="선택해주세요.">
                {new Array(3).fill(0).map((_, i) => (
                  <OptionGroup key={i} title={`그룹 ${i + 1}`}>
                    {new Array(3).fill(0).map((__, j) => (
                      <Option key={j} value={`값 ${i} ${j}`}>
                        {`값 ${i} ${j}`}
                      </Option>
                    ))}
                  </OptionGroup>
                ))}
              </Select>
            </FormControl>
          </FormField>

          <FormField sx={{ flex: 1 }}>
            <FormLabel required>기관/장소명</FormLabel>
            <FormControl>
              <TextField placeholder="기관/장소명" />
            </FormControl>
          </FormField>

          <FlexBox gap="8px">
            <FormField sx={{ flex: 1 }}>
              <FormLabel required>시작일</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM" />
              </FormControl>
            </FormField>

            <FormField sx={{ flex: 1 }}>
              <FormLabel required>종료일</FormLabel>
              <FormControl>
                <DatePicker width="100%" format="YYYY.MM" />
              </FormControl>
            </FormField>
          </FlexBox>

          <FormField>
            <FormLabel required>경험/활동 내역</FormLabel>
            <FormControl>
              <TextArea
                width="100%"
                placeholder={`- 직무와 관련된 교육, 대외활동, 스터디 경험 등을 작성해보세요.\n- 활동을 통해 배우거나 성장한 내용을 함께 정리하면 도움이 됩니다.\n- 단순 참여보다 맡았던 역할이나 기여도를 함께 작성해보세요.`}
                leadingContent={
                  <TextAreaContent variant="characterCounter">
                    2000
                  </TextAreaContent>
                }
              />
            </FormControl>
          </FormField>

          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
            fullWidth
          >
            추가하기
          </Button>
        </FlexBox>
      )}
    </FlexBox>
  );
}

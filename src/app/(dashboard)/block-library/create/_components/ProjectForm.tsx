import {
  Button,
  FlexBox,
  FormField,
  FormLabel,
  FormControl,
  DatePicker,
  TextField,
  TextArea,
  TextAreaContent,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

export function ProjectForm() {
  return (
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

        <FormField>
          <FormControl>
            <TextField width="100%" placeholder="링크(GitHub, 배포, URL 등)" />
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
  );
}

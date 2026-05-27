import {
  Button,
  FlexBox,
  TextButton,
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
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

export function CareerForm() {
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
  );
}

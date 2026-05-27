import {
  Button,
  FlexBox,
  FormField,
  FormLabel,
  FormControl,
  TextArea,
  TextAreaContent,
  TextField,
  Select,
  OptionGroup,
  Option,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

export function SkillsForm() {
  return (
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
              placeholder={`- 실제 업무나 프로젝트에서 사용한 기술과 도구를 작성하세요.\n- 익숙한 수준보다 '어떻게 활용했는지'를 중심으로 작성해보세요.\n- 사용 목적이나 활용 경험을 함께 작성하면 이해에 도움이 됩니다.`}
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

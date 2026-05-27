import {
  Button,
  FlexBox,
  FormField,
  FormLabel,
  FormControl,
  TextField,
  TextArea,
  TextAreaContent,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

export function IntroductionForm() {
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
  );
}

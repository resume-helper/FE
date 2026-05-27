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

export function SummaryForm() {
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
        <FormLabel required>기본소개 제목</FormLabel>
        <FormControl>
          <TextField placeholder="기본소개 제목" />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel required>상세내용</FormLabel>
        <FormControl>
          <TextArea
            width="100%"
            placeholder="본인을 간단히 소개해주세요."
            leadingContent={
              <TextAreaContent variant="characterCounter">2000</TextAreaContent>
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
  );
}

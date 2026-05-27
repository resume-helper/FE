import {
  Button,
  FlexBox,
  FormField,
  FormLabel,
  FormControl,
  TextField,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

export function BasicInfoForm() {
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
        <FormLabel required>이름</FormLabel>
        <FormControl>
          <TextField placeholder="이름" />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel required>이메일</FormLabel>
        <FormControl>
          <TextField placeholder="이메일" />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel required>전화번호</FormLabel>
        <FormControl>
          <TextField placeholder="전화번호" />
        </FormControl>
      </FormField>

      <FormField>
        <FormLabel>프로필 이미지</FormLabel>
        <FormControl>
          <Button
            variant="outlined"
            color="assistive"
            leadingContent={<IconPlus />}
          >
            이미지 업로드
          </Button>
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

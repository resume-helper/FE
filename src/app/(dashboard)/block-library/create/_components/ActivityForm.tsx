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
  Select,
  OptionGroup,
  Option,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

export function ActivityForm() {
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

      <FormField>
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

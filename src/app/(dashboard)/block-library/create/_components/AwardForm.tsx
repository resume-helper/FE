import {
  Button,
  FlexBox,
  FormField,
  FormLabel,
  FormControl,
  DatePicker,
  TextField,
  Select,
  OptionGroup,
  Option,
} from "@wanteddev/wds";
import { IconPlus } from "@wanteddev/wds-icon";

export function AwardForm() {
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

      <FormField>
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
  );
}

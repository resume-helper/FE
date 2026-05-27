import {
  Button,
  Checkbox,
  FlexBox,
  FormField,
  FormLabel,
  FormControl,
  DatePicker,
  Label,
  TextField,
  Select,
  OptionGroup,
  Option,
} from "@wanteddev/wds";
import { IconMinus, IconPlus } from "@wanteddev/wds-icon";

export function EducationForm() {
  return (
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
            <TextField width="100%" placeholder="학교명" />
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
        <Checkbox size="medium" id="education-transfer" />
        <Label htmlFor="education-transfer">편입</Label>
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
  );
}

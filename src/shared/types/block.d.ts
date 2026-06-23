declare global {
  /**
   * 블록타입
   *
   * CAREER :  경력
   * SKILL :  스킬
   * PROJECT :  프로젝트
   * EDUCATION :  학력
   * CERTIFICATE :  자격증
   * ACTIVITY :  활동
   * CUSTOM :  커스텀
   */
  type BLOCK_TYPE =
    | "BASIC_INFO"
    | `CAREER`
    | `SKILL`
    | `PROJECT`
    | `EDUCATION`
    | `CERTIFICATE`
    | `ACTIVITY`
    | `CUSTOM`;

  /**
   * 재직 형태
   *
   * FULL_TIME : 정규직
   * CONTRACT : 계약직
   * INTERN : 인턴
   * FREELANCER : 프리랜서
   */
  type EMPLOYMENT_TYPE = "FULL_TIME" | "CONTRACT" | "INTERN" | "FREELANCER";

  /**
   * 숙련도
   *
   * LOW : 하
   * MEDIUM : 중
   * HIGH : 상
   */
  type SKILL_PROFICIENCY = "LOW" | "MEDIUM" | "HIGH";

  /**
   * 학력구분
   *
   * COLLEGE_OR_ABOVE : 대학·대학원 이상 졸업
   * HIGH_SCHOOL : 고등학교 졸업
   * OTHER : 기타 학력
   */
  type EDUCATION_LEVEL = "COLLEGE_OR_ABOVE" | "HIGH_SCHOOL" | "OTHER";

  /**
   * 대학구분
   *
   * BACHELORS : 4년제
   * ASSOCIATE : 2·3년제
   * MASTERS : 대학원 석사
   * DOCTORATE : 대학원 박사
   */
  type UNIVERSITY_TYPE = "BACHELORS" | "ASSOCIATE" | "MASTERS" | "DOCTORATE";

  /**
   * 졸업여부
   *
   * GRADUATED : 졸업
   * ENROLLED : 재학
   * ON_LEAVE : 휴학
   * EXPECTED_GRADUATION : 졸업 예정
   * DROPPED_OUT : 중퇴
   * COMPLETED : 수료
   */
  type GRADUATION_STATUS =
    | "GRADUATED"
    | "ENROLLED"
    | "ON_LEAVE"
    | "EXPECTED_GRADUATION"
    | "DROPPED_OUT"
    | "COMPLETED";

  /**
   * 전공계열
   *
   * GENERAL : 인문계
   * SPECIALIZED_SCIENCE_FOREIGN : 특목고
   * VOCATIONAL_MEISTER : 특성화·마이스터고
   */
  type MAJOR_FIELD =
    | "GENERAL"
    | "SPECIALIZED_SCIENCE_FOREIGN"
    | "VOCATIONAL_MEISTER";

  /**
   * 전공구분
   *
   * DOUBLE_MAJOR : 복수전공
   * MINOR : 부전공
   */
  type MAJOR_TYPE = "DOUBLE_MAJOR" | "MINOR";

  /**
   * 이수 여부
   *
   * COMPLETED : 이수 완료
   * IN_PROGRESS : 이수 중
   * DISCONTINUED : 중단
   */
  type EDUCATION_COMPLETION_STATUS =
    | "COMPLETED"
    | "IN_PROGRESS"
    | "DISCONTINUED";

  /**
   * 수상·자격 구분
   *
   * AWARD_CONTEST : 수상·공모전
   * CERTIFICATE : 자격증
   * LANGUAGE : 어학
   * OTHER : 기타
   */
  type CERTIFICATE_TYPE =
    | "AWARD_CONTEST"
    | "CERTIFICATE"
    | "LANGUAGE"
    | "OTHER";

  /**
   * 활동 구분
   *
   * SCHOOL_ACTIVITY : 교내활동
   * EXTERNAL_ACTIVITY : 대외활동
   * INTERN : 인턴
   * EDUCATION_TRAINING : 교육 연수
   * OTHER : 기타
   */
  type ACTIVITY_TYPE =
    | "SCHOOL_ACTIVITY"
    | "EXTERNAL_ACTIVITY"
    | "INTERN"
    | "EDUCATION_TRAINING"
    | "OTHER";

  /** 경력 블록 필드 */
  interface CAREER_BLOCK_ITEM {
    /** 회사명 (등록시 필수) */
    companyName: string;

    /** 근무부서 (등록시 필수) */
    department: string;

    /** 직무 (등록시 필수) */
    jobTitle: string;

    /** 직급/직책 (등록시 필수) */
    position: string;

    /** 재직형태 (등록시 필수) */
    employmentType: EMPLOYMENT_TYPE;

    /** 입사년월 (등록시 필수) */
    startDate: string;

    /** 퇴사년월 (등록시 필수) */
    endDate: string;

    /** 주요성과 (등록시 필수) */
    achievements: string;
  }

  /** 프로젝트 블록 필드 */
  interface PROJECT_BLOCK_ITEM {
    /** 프로젝트 명 (등록시 필수) */
    projectName: string;

    /** 시작일 (등록시 필수) */
    startDate: string;

    /** 종료일 (등록시 필수) */
    endDate: string;

    /** 기여도 */
    contribution?: number;

    /** 사용 기술 스택 */
    techStacks?: string[];

    /** 문제 해결 과정 */
    problemSolving?: string;

    /** 링크 */
    link?: string;
  }

  /** 기술스택 블록 필드 */
  interface SKILL_BLOCK_ITEM {
    /** 기술스택명 (등록시 필수) */
    skillName: string;

    /** 숙련도 */
    proficiency?: SKILL_PROFICIENCY;

    /** 활용범위 (등록시 필수) */
    usageScope: string;
  }

  /** 자기소개서 블록 필드 */
  interface INTRODUCTION_BLOCK_ITEM {
    /** 자기소개서 제목 (등록시 필수) */
    title: string;

    /** 상세내용 (등록시 필수) */
    content: string;
  }

  /** 기본소개 블록 필드 */
  interface SUMMARY_BLOCK_ITEM {
    /** 기본소개 제목 (등록시 필수) */
    title: string;

    /** 상세내용 (등록시 필수) */
    content: string;
  }

  /** 학력 블록 필드 */
  interface EDUCATION_BLOCK_ITEM {
    /** 학력구분 (등록시 필수) */
    educationLevel: EDUCATION_LEVEL;

    /** 학력 유형 (조건부 필수) */
    educationType?: string;

    /** 대학구분 (등록시 필수) */
    universityType: UNIVERSITY_TYPE;

    /** 학교명 (조건부 필수) */
    schoolName?: string;

    /** 졸업여부 (조건부 필수) */
    graduationStatus?: GRADUATION_STATUS;

    /** 전공 (조건부 필수) */
    major?: string;

    /** 전공계열 */
    majorField?: MAJOR_FIELD;

    /** 입학년월 (조건부 필수) */
    startDate?: string;

    /** 졸업년월 (조건부 필수) */
    endDate?: string;

    /** 지역 */
    region?: string;

    /** 추가 전공 */
    doubleMajor?: string;

    /** 전공구분 */
    majorType?: MAJOR_TYPE;

    /** 학점 */
    gpa?: number;

    /** 기준학점 */
    gpaMax?: number;

    /** 편입여부 */
    isTransfer?: boolean;

    /** 대입 검정고시 여부 */
    isGed?: boolean;

    /** 이수 여부 (조건부 필수) */
    completed?: EDUCATION_COMPLETION_STATUS;

    /** 기관명 (조건부 필수) */
    institutionName?: string;
  }

  /** 수상·자격 블록 필드 */
  interface CERTIFICATE_BLOCK_ITEM {
    /** 수상·자격 구분 (등록시 필수) */
    certificateType: CERTIFICATE_TYPE;

    /** 수상·공모전명/자격증명/시험명/명칭 (등록시 필수) */
    name: string;

    /** 수상일/취득일 (등록시 필수) */
    issuedDate: string;

    /** 발급기관 (등록시 필수) */
    issuer: string;

    /** 구분 (조건부 필수) */
    category?: string;
  }

  /** 활동 블록 필드 */
  interface ACTIVITY_BLOCK_ITEM {
    /** 활동 구분 선택 (등록시 필수) */
    activityType: ACTIVITY_TYPE;

    /** 활동명 (등록시 필수) */
    activityName: string;

    /** 기관/장소명 (등록시 필수) */
    organizationName: string;

    /** 시작년월 (등록시 필수) */
    startDate: string;

    /** 종료년월 (등록시 필수) */
    endDate: string;

    /** 경험/활동 내역 (등록시 필수) */
    description: string;
  }

  /** 기본정보 블록 필드 */
  interface BASIC_INFO_BLOCK_ITEM {
    /** 이름 (등록시 필수) */
    name: string;

    /** 이메일 (등록시 필수) */
    email: string;

    /** 전화번호 (등록시 필수) */
    phoneNumber: string;

    /** 프로필 이미지 */
    profileImage: string;
  }
}

export {};

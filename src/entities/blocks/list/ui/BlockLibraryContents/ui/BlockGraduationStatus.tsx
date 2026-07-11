"use client";

export const BlockGraduationStatus = ({
  status,
}: {
  status: GRADUATION_STATUS | "";
}) => {
  return (
    <span>
      {status === "GRADUATED" && "졸업"}
      {status === "ENROLLED" && "재학"}
      {status === "ON_LEAVE" && "휴학"}
      {status === "EXPECTED_GRADUATION" && "졸업 예정"}
      {status === "DROPPED_OUT" && "중퇴"}
      {status === "COMPLETED" && "수료"}
    </span>
  );
};

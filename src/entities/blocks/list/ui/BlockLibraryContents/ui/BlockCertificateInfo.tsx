"use client";

interface BLOCK_CERTIFICATE_INFO {
  /** 기관처명 */
  issuer: string;

  /** 발급일자 */
  issuedDate: string;
}

export const BlockCertificateInfo = ({
  issuer,
  issuedDate,
}: BLOCK_CERTIFICATE_INFO) => {
  return (
    <span>
      {issuer}・{issuedDate}
    </span>
  );
};

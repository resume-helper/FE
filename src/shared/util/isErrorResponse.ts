export function IsErrorResponse(err: API_FAIL_RESPONSE) {
  return err !== null && "code" in err && "message" in err;
}

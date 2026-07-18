declare global {
  interface USER_MODEL {
    id: number;
    email: string;
    name: string;
    profileImageUrl: string;
  }

  type API_SERVER_ME = RESPONSE_MODEL<USER_MODEL>;
}

export {};

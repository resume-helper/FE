declare global {
  interface Response_Model<T> {
    success: boolean;
    data: T;
    message: string;
  }
}

export {};

export interface SuccessResponse {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data?: any;
  message: string;
}

export interface ErrorResponse {
  response: {
    data: {
      message: string;
    };
  };
}

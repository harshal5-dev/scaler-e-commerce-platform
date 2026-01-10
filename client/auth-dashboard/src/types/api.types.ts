
export type ApiErrorResponse = {
  message: string;
  validationErrors?: Record<string, string>;
  timestamp: string;
};
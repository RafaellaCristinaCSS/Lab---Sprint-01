export interface ApiListResponse<T> {
  data: T[];
  count: number;
}

export interface ApiDataResponse<T> {
  data: T;
}

export interface ApiMessageResponse<T> {
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  error: string;
  details?: string[];
}

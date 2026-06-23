export interface ApiDataResponse<T> {
  data: T;
}

export interface ApiListResponse<T> {
  data: T[];
  count: number;
}

export interface ApiMessageResponse<T> {
  message: string;
  data: T;
}

export interface ApiErrorResponse {
  error: string;
}

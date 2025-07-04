declare type Nullable<T> = T | null;

declare interface ApiResponse<T> {
  success: boolean;
  startTimestamp: number;
  endTimestamp: number;
  data: T;
}

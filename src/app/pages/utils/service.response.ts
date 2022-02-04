export interface ServiceResponse<T> {
  status: number;
  success: number;
  message: string;
  result: T;
}

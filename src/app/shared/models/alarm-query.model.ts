export interface AlarmQueryParams {
  from_date?: string;
  to_date?: string;
  severity?: number;
  tag?: string;
  limit?: number;
  offset?: number;
}
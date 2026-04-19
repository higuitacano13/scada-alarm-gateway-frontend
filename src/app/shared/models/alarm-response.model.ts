import { Alarm } from "./alarm.model";

export interface AlarmResponse {
  data: Alarm[];
  total: number;
  limit: number;
  offset: number;
}
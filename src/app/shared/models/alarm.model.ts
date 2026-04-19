export interface Alarm {
  id: number;
  tag: string;
  description: string;
  severity: number;
  status: string;
  event_time: string;
  source_system: string;
  created_at: string;
}

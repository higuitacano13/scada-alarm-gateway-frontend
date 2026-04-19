import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { AlarmResponse } from "../../shared/models/alarm-response.model";
import { environment } from "../../../environment/environment";

@Injectable({
  providedIn: 'root'
})
export class AlarmsService {
  constructor(private http: HttpClient) {}
private readonly apiUrl = `${environment.baseUrl}/alarms/`;

  getAlarms(params: any) {
    return this.http.get<AlarmResponse>(this.apiUrl, { params }
    );
  }
}
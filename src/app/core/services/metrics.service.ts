import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TopTagResponse } from '../../shared/models/top-tag-response.model';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class MetricsService {

  private baseUrl = `${environment.baseUrl}/metrics`;

  constructor(private http: HttpClient) {}

    getTopTags(params: {
    from_date?: string;
    to_date?: string;
    limit?: number;
    }) {
    let httpParams = new HttpParams();

    if (params.from_date) {
        httpParams = httpParams.set('from_date', params.from_date);
    }

    if (params.to_date) {
        httpParams = httpParams.set('to_date', params.to_date);
    }

    if (params.limit) {
        httpParams = httpParams.set('limit', params.limit.toString());
    }

    return this.http.get<TopTagResponse>(
        `${this.baseUrl}/top-tags`,
        { params: httpParams }
    );
    }
}
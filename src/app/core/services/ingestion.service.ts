import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environment/environment';

@Injectable({ providedIn: 'root' })
export class IngestionService {

  private baseUrl = `${environment.baseUrl}/ingestion`;

  constructor(private http: HttpClient) {}

  uploadDataset(file: File) {
    const formData = new FormData();
    formData.append('file', file);

    return this.http.post<any>(
      `${this.baseUrl}/load-dataset`,
      formData
    );
  }

  generateDataset(params: { size: number; file_format: 'json' | 'csv' }) {
    return this.http.post(
      `${this.baseUrl}/generate-dataset`,
      null,
      {
        params,
        responseType: 'blob',
        observe: 'response'
      }
    );
  }
}
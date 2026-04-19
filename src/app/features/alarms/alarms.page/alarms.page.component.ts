import { CommonModule } from '@angular/common';
import { Component, inject, ViewChild } from '@angular/core';

import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatPaginator } from '@angular/material/paginator';
import Swal from 'sweetalert2';

import { FormBuilder, FormGroup, FormsModule } from '@angular/forms';
import { AlarmsService } from '../../../core/services/alarms.service';
import { Alarm } from '../../../shared/models/alarm.model';

@Component({
  selector: 'app-alarms',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatButtonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatPaginator
  ],
  templateUrl: './alarms.page.component.html',
  styleUrl: './alarms.page.component.scss'
})
export class AlarmsPageComponent {

  form: FormGroup;
  displayedColumns: string[] = ['tag', 'severity', 'status', 'date'];
  dataSource = new MatTableDataSource<Alarm>([]);
  loading = false;

  total = 0;
  limit = 10;
  offset = 0;

  private readonly alarmsService = inject(AlarmsService);
  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private fb: FormBuilder
  ) 
  {
    this.form = this.fb.group({
      from_date: [],
      to_date: [],
      severity: [],
      tag: ['']
    });
  }

  applyFilters() {  
  
    this.offset = 0;
    if (this.paginator) {
      this.paginator.firstPage();
    }

    const value = this.form.value;

    const params: any = {
      limit: this.limit,
      offset: this.offset,
    };

    if (value.from_date) {
      params.from_date = value.from_date.toISOString();
    }

    if (value.to_date) {
      params.to_date = value.to_date.toISOString();
    }

    if (value.severity) {
      params.severity = value.severity;
    }

    if (value.tag) {
      params.tag = value.tag;
    }

    this.loading = true;
    this.dataSource.data = [];

    this.alarmsService.getAlarms(params).subscribe({
      next: (res) => {
        this.loading = false;
        this.dataSource.data = res.data;
        this.total = res.total;

        if (res.data.length === 0) {
          Swal.fire({
            icon: 'info',
            title: 'Sin resultados',
            text: 'No se encontraron alarmas con los filtros seleccionados',
            confirmButtonColor: '#1e3a5f'
          });
        }
      },
      error: () => {
        this.loading = false;
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No fue posible obtener las alarmas',
          confirmButtonColor: '#c62828'
        });
      }
    });
  }

getSeverityClass(severity: number): string {
  return `severity-${severity}`;
}

getSeverityLabel(severity: number): string {
  switch (severity) {
    case 1: return 'Crítica';
    case 2: return 'Alta';
    case 3: return 'Media';
    case 4: return 'Baja';
    default: return '-';
  }
}

onPageChange(event: any) {
  this.limit = event.pageSize;
  this.offset = event.pageIndex * event.pageSize;
  this.applyFilters();
}


}

import { isPlatformBrowser } from '@angular/common';
import { AfterViewInit, ChangeDetectorRef, Component, ElementRef, inject, Inject, PLATFORM_ID, ViewChild } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MetricsService } from '../../../core/services/metrics.service';
import Swal from 'sweetalert2';
import { TopTagMetric } from '../../../shared/models/metric.model';
import { FormControl, ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-metrics.page',
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule
  ],
  templateUrl: './metrics.page.component.html',
  styleUrl: './metrics.page.component.scss'
})
export class MetricsPageComponent implements AfterViewInit {

  @ViewChild('topTagsChart', { static: true })
  topTagsChart!: ElementRef;

  @ViewChild('distributionChart', { static: true })
  distributionChart!: ElementRef;

  private readonly metricsService = inject(MetricsService);
  private cdr = inject(ChangeDetectorRef);

  loading = false;
  metrics: TopTagMetric[] = [];

  fromDate = new FormControl<Date | null>(null);
  toDate = new FormControl<Date | null>(null);

  private readonly tagColors = [
    '#1f77b4',
    '#ff7f0e',
    '#2ca02c'
  ];


  constructor(
    @Inject(PLATFORM_ID) private platformId: Object
  ) {}

  private get tags(): string[] {
    return this.metrics.map(m => m.tag);
  }

  private get values(): number[] {
    return this.metrics.map(m => m.total_events);
  }

  ngAfterViewInit(): void {
    if (isPlatformBrowser(this.platformId)) {
      this.loadMetrics();
    }
  }


  async renderTopTagsChart() {
    const Plotly = await import('plotly.js-dist-min');
    Plotly.newPlot(
      this.topTagsChart.nativeElement,
      [{
        x: this.tags,
        y: this.values,
        type: 'bar',
        marker: { color: this.tagColors }
      }],
      {
        margin: { t: 30 },
        yaxis: { title: 'Total de Alarmas', autorange: true },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
      },
      { responsive: true }
    );
  }

  async renderDistributionChart() {
    const Plotly = await import('plotly.js-dist-min');

    Plotly.newPlot(
      this.distributionChart.nativeElement,
      [{
        labels: this.tags,
        values: this.values,
        type: 'pie',
        market: { colors: this.tagColors }
      }],
      {
        margin: { t: 30 },
        paper_bgcolor: 'transparent',
        plot_bgcolor: 'transparent'
      },
      { responsive: true }
    );
  }

  renderCharts() {
    this.renderTopTagsChart();
    this.renderDistributionChart();
  }

  loadMetrics(fromDate?: string, toDate?: string) {
    this.loading = true;

    const now = new Date();
    const startOfYear = new Date(now.getFullYear(), 0, 1);

    const params = {
      from_date: fromDate ?? startOfYear.toISOString(),
      to_date: toDate ?? now.toISOString(),
      limit: 10
    };

    this.metricsService.getTopTags(params).subscribe({
      next: (res) => {
        this.loading = false;

        console.log('Métricas recibidas:', res.data);

        if (!res.data?.length) {
          Swal.fire({
            icon: 'info',
            title: 'Sin datos',
            text: 'No hay métricas disponibles para el periodo seleccionado'
          });
          return;
        }

        this.metrics = res.data;

        this.cdr.detectChanges();
        this.renderCharts();
      },
      error: () => {
        this.loading = false;

        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'No fue posible cargar las métricas'
        });
      }
    });
  }

  applyFilters() {
    if (!this.fromDate.value || !this.toDate.value) {
      Swal.fire({
        icon: 'warning',
        title: 'Fechas incompletas',
        text: 'Por favor selecciona un rango de fechas'
      });
      return;
    }

    this.loadMetrics(
      this.fromDate.value.toISOString(),
      this.toDate.value.toISOString()
    );
  }
}

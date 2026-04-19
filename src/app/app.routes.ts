import { Routes } from '@angular/router';
import { LayoutComponent } from './shared/components/layout/layout.component';

export const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: 'alarms',
        loadComponent: () =>
          import('./features/alarms/alarms.page/alarms.page.component')
            .then(m => m.AlarmsPageComponent)
      },
      {
        path: 'metrics',
        loadComponent: () =>
          import('./features/metrics/metrics.page/metrics.page.component')
            .then(m => m.MetricsPageComponent)
      },
      {
        path: '',
        redirectTo: 'alarms',
        pathMatch: 'full'
      }
    ]
  }
];
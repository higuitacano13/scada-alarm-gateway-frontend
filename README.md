
# SCADA Alarm Gateway – Frontend

## 📌 Descripción General

Este repositorio contiene el **frontend** de la solución **SCADA Alarm Gateway & Migrator**, desarrollado como parte de una solución a un caso de estudio industrial. La aplicación proporciona una interfaz web moderna para:

- Visualizar alarmas SCADA normalizadas.
- Consultar métricas agregadas sobre el histórico de alarmas.
- Generar y cargar datasets de prueba end‑to‑end.
- Demostrar la integración completa entre frontend Angular y backend FastAPI.

El enfoque principal del frontend es **claridad visual, correcta integración con la API, buenas prácticas de Angular y consistencia UX**, simulando una aplicación industrial real.

---

## 🏗️ Arquitectura del Frontend

La aplicación está desarrollada con **Angular moderno (Angular 19)** y sigue un enfoque **feature‑based**, separando claramente responsabilidades:

- **Core**: servicios compartidos y configuración global.
- **Shared**: modelos, componentes reutilizables y estilos comunes.
- **Features**:
  - `alarms`: vista de consulta y paginación de alarmas.
  - `metrics`: dashboard de métricas y gestión de datasets.

La comunicación con el backend se realiza exclusivamente mediante **API REST**, consumiendo los endpoints expuestos por FastAPI.

---

## 📁 Estructura del Proyecto

```text
src/
├── app/
│   ├── core/
│   │   └── services/
│   │       ├── alarms.service.ts
│   │       ├── metrics.service.ts
│   │       └── ingestion.service.ts
│   │
│   ├── features/
│   │   ├── alarms/
│   │   │   └── alarms.page/
│   │   │       ├── alarms.page.component.ts
│   │   │       ├── alarms.page.component.html
│   │   │       └── alarms.page.component.scss
│   │   │
│   │   └── metrics/
│   │       ├── metrics.page/
│   │       │   ├── metrics.page.component.ts
│   │       │   ├── metrics.page.component.html
│   │       │   └── metrics.page.component.scss
│   │       │
│   │       └── components/
│   │           └── generate-dataset-dialog/
│   │               ├── generate-dataset-dialog.component.ts
│   │               ├── generate-dataset-dialog.component.html
│   │               └── generate-dataset-dialog.component.scss
│   │
│   ├── shared/
│   │   ├── components/
│   │   │   └── layout/
│   │   │       ├── layout.component.ts
│   │   │       ├── layout.component.html
│   │   │       └── layout.component.scss
│   │   │
│   │   └── models/
│   │       ├── alarm.model.ts
│   │       ├── alarm-query.model.ts
│   │       ├── alarm-response.model.ts
│   │       ├── metric.model.ts
│   │       ├── top-tag.model.ts
│   │       └── top-tag-response.model.ts
│   │
│   ├── types/
│   │   └── plotly-js-dist-min.d.ts
│   │
│   ├── app.component.ts
│   ├── app.component.html
│   ├── app.component.scss
│   ├── app.routes.ts
│   ├── app.config.ts
│   ├── app.config.server.ts
│   ├── app.routes.server.ts
│   │
│
├── environments/
│   └── environment.ts
│
├── assets/
├── styles.scss
├── index.html
├── main.ts
├── main.server.ts
├── server.ts
│
├── angular.json
├── package.json
├── tsconfig.json
└── README.md
```

---

## ✅ Requisitos Previos

Para ejecutar el frontend localmente se requiere:

- **Node.js 18+**
- **npm** o **pnpm**
- Angular CLI compatible con Angular 19
- Backend SCADA Alarm Gateway corriendo localmente

Opcional:
- Visual Studio Code
- Extensiones Angular Language Service

---

## 📦 Principales Librerías Utilizadas

El frontend utiliza un conjunto reducido de librerías ampliamente adoptadas, seleccionadas por estabilidad, mantenimiento activo y adecuación a aplicaciones técnicas e industriales.

- **Angular 19**
  - Framework principal.
  - Arquitectura basada en componentes standalone y routing declarativo.

- **Angular Material**
  - Base de componentes UI (formularios, diálogos, layout).
  - Proporciona accesibilidad, consistencia visual y patrones enterprise.

- **Plotly.js**
  - Visualización interactiva de métricas.
  - Utilizado directamente (sin wrapper) para mayor control y compatibilidad con SSR/CSR.

- **Font Awesome**
  - Iconografía semántica y consistente.
  - Íconos diferenciados por contexto operativo (alarmas, métricas, acciones).

- **SweetAlert2**
  - Utilizado únicamente en flujos puntuales de feedback al usuario.
  - Para flujos complejos (generación de dataset) se privilegian diálogos nativos de Angular Material.

Estas librerías fueron elegidas para demostrar integración realista de tecnologías comúnmente usadas en dashboards industriales modernos.


## ▶️ Ejecución Local

### 1️⃣ Clonar el repositorio

```bash
git clone https://github.com/higuitacano13/scada-alarm-gateway-frontend.git
cd scada-gateway-frontend
```

### 2️⃣ Instalar dependencias

```bash
npm install
```

### 3️⃣ Configurar entorno

Editar el archivo de entorno:

```ts
export const environment = {
  baseUrl: 'http://localhost:8000/api/v1'
};
```

### 4️⃣ Ejecutar la aplicación

```bash
npm start
```

La aplicación estará disponible en:

```
http://localhost:4200
```

---

## 🧭 Funcionalidades Principales

### 🚨 Vista de Alarmas

- Consulta de alarmas normalizadas.
- Filtros por rango de fechas, severidad y tag.
- Paginación server‑side (`limit / offset`).
- Consumo del endpoint `GET /alarms`.

### 📊 Vista de Métricas

- Dashboard con visualizaciones usando **Plotly**:
  - Top tags con mayor número de alarmas.
  - Distribución de eventos por tag.
- Filtro por rango de fechas.
- Colores consistentes entre gráficas.
- Consumo del endpoint `POST /metrics/top-tags`.

### 🔄 Gestión de Datasets

- **Generar dataset**:
  - Llama a `POST /ingestion/generate-dataset`.
  - Descarga automática del archivo generado (JSON o CSV).

- **Cargar dataset**:
  - Upload vía `multipart/form-data`.
  - Llama a `POST /ingestion/load-dataset`.
  - Visualización del resultado (insertados, inválidos, errores).
  - Refresco automático de métricas.

---

## 🎨 UI / UX

- Angular Material como base de componentes.
- Diseño simple, industrial y consistente.
- Paleta sobria pensada para sistemas SCADA.
- Feedback claro al usuario en operaciones de carga y generación.

---

## 🔗 Integración Backend

El frontend depende del backend **SCADA Alarm Gateway & Migrator** desarrollado en FastAPI.

Endpoints principales consumidos:

- `GET /alarms`
- `POST /metrics/top-tags`
- `POST /ingestion/generate-dataset`
- `POST /ingestion/load-dataset`

Se asume que el backend corre en:

```
http://localhost:8000/api/v1
```

---

## ✅ Consideraciones Técnicas

- Arquitectura desacoplada frontend / backend.
- Uso de tipado fuerte con TypeScript.
- Servicios Angular centralizados para acceso a API.
- Paginación y filtrado server‑side.
- La aplicación prioriza **CSR** (Client‑Side Rendering), dado que no requiere SEO ni rendering público.

---

## 🏁 Conclusión

Este frontend completa la solución **SCADA Alarm Gateway & Migrator**, demostrando una integración end‑to‑end entre interfaz gráfica, API REST y base de datos. El proyecto está orientado a claridad técnica, buenas prácticas y escalabilidad, replicando patrones comunes en aplicaciones industriales reales.

---

**Autor:** Juan Pablo Higuita Cano  
**Proyecto:** Prueba técnica – SCADA Alarm Gateway & Migrator

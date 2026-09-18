export interface ArchitectureNode {
  step: string;
  name: string;
  tech: string;
  detail: string;
  latencyOrRole: string;
}

export interface MetricItem {
  label: string;
  value: string;
  detail: string;
}

export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  badge?: string;
  description: string;
  challenge: string;
  architecture: string;
  tech: string[];
  metrics: MetricItem[];
  architectureFlow?: ArchitectureNode[];
  heroImage: string;
  gallery: string[];
  githubUrl?: string;
  liveUrl?: string;
  nextProject: {
    title: string;
    slug: string;
  };
}

export const projects: Record<string, ProjectData> = {
  vitalapp: {
    slug: "vitalapp",
    title: "VitalAPP",
    category: "Gestión Médica & Arquitectura .NET",
    badge: "Backend Core",
    description: "API REST empresarial diseñada para transformar la gestión clínica de pacientes, historias médicas y asignación de citas en entornos hospitalarios de alta demanda.",
    challenge: "El mayor reto fue orquestar un backend con lógica de negocio densa y estricta integridad relacional, asegurando latencias ultra-bajas en consultas complejas sin penalización de memoria, mientras se dominaba React por primera vez a escala profesional desacoplado del core.",
    architecture: "Implementación de Arquitectura Limpia en capas inspirada en CQRS con .NET 9. Separación estricta de Commands y Queries mediante MediatR, persistencia de alta velocidad con el micro-ORM Dapper sobre SQL Server, autenticación stateless con JWT y políticas de seguridad RBAC.",
    tech: [".NET 9", "C#", "Dapper", "SQL Server", "CQRS / MediatR", "JWT", "React", "Clean Architecture"],
    metrics: [
      { label: "Latencia Query", value: "P99 < 15ms", detail: "Optimización Dapper sin sobrecarga de ORM pesado" },
      { label: "Disponibilidad", value: "99.9% SLA", detail: "Tolerancia a fallos y pipeline global de excepciones" },
      { label: "Arquitectura", value: "CQRS", detail: "Separación total de lectura y escritura con MediatR" },
      { label: "Seguridad", value: "JWT + RBAC", detail: "Políticas de autorización por roles médicos y administrativos" }
    ],
    architectureFlow: [
      { step: "01", name: "Cliente SPA", tech: "React 19 + Tailwind", detail: "Interfaz reactiva para médicos y administradores con validación en cliente", latencyOrRole: "Frontend" },
      { step: "02", name: "API Gateway & Auth", tech: "ASP.NET Core 9", detail: "Validación de JWT claims, rate limiting y pipeline FluentValidation", latencyOrRole: "1.2ms" },
      { step: "03", name: "Command / Query Bus", tech: "MediatR Pipeline", detail: "Desacoplamiento de casos de uso sin dependencias de infraestructura", latencyOrRole: "0.8ms" },
      { step: "04", name: "Micro-ORM Data Layer", tech: "Dapper + SQL Server", detail: "Mapeo directo a DTOs con consultas SQL optimizadas y cero allocs", latencyOrRole: "4.5ms" }
    ],
    heroImage: "/projects/vitalapp/hero.png",
    gallery: ["/projects/vitalapp/hero.png"],
    githubUrl: "https://github.com/PabloLinares06",
    nextProject: {
      title: "NaTec V2",
      slug: "natechnology"
    }
  },
  natechnology: {
    slug: "natechnology",
    title: "NaTec V2",
    category: "E-Commerce Mayorista & ERP Contable",
    badge: "Producción Activa",
    description: "Ecosistema comercial mayorista de alta concurrencia con integración oficial al software contable EFFI ERP, modo kiosko táctil interactivo y motor publicitario nativo en Canvas 2D. Desplegado en producción sobre DigitalOcean VPS.",
    challenge: "Migración crítica de una arquitectura serverless en Firebase (con costos variables impredecibles y lecturas desmedidas de Firestore) hacia un VPS auto-hospedado con Docker Compose sin interrumpir la operación comercial, resolviendo la exportación contable masiva para EFFI ERP y asegurando reactividad en tiempo real mediante Server-Sent Events (SSE).",
    architecture: "Stack desacoplado en VPS DigitalOcean orquestado con Docker Compose y Nginx Alpine. Frontend Angular 22 impulsado por Signals y Standalone Components; Backend en NestJS 11 bajo Clean Architecture; Base de datos PostgreSQL gestionada con Prisma ORM; Storage en DigitalOcean Spaces (S3) y exportación documental fiscal con ExcelJS.",
    tech: ["NestJS 11", "Angular 22", "PostgreSQL", "Prisma ORM", "Docker Compose", "EFFI ERP", "Server-Sent Events", "DigitalOcean Spaces", "Tailwind CSS"],
    metrics: [
      { label: "Costo de Servidor", value: "$14 USD/mes", detail: "Fijo en VPS vs. facturación elástica impredecible de Firebase" },
      { label: "Integración Contable", value: "EFFI ERP Oficial", detail: "Exportación masiva de conceptos de venta en .xlsx con ExcelJS" },
      { label: "Modo Kiosko", value: "Touch POS", detail: "Terminal táctil con auto-reset por inactividad y PIN administrativo" },
      { label: "Generador Gráfico", value: "1200×1200px", detail: "Motor Canvas 2D para banners en HD con copiado directo a WhatsApp" }
    ],
    architectureFlow: [
      { step: "01", name: "Terminal Táctil / Web", tech: "Angular 22 Signals", detail: "Catálogo mayorista, carrito reactivo, modo kiosko y generador Canvas 2D", latencyOrRole: "Client" },
      { step: "02", name: "Proxy Inverso & SSL", tech: "Nginx Alpine", detail: "Terminación TLS, compresión estática Brotli y balanceo hacia NestJS", latencyOrRole: "0.4ms" },
      { step: "03", name: "API Core & Events", tech: "NestJS 11 + SSE", detail: "Controladores REST, autenticación JWT y streaming de pedidos en vivo", latencyOrRole: "7.8ms" },
      { step: "04", name: "Persistencia Relacional", tech: "PostgreSQL 16 + Prisma", detail: "Modelado relacional ACID con migraciones y transacciones de stock", latencyOrRole: "2.1ms" },
      { step: "05", name: "ERP & Object Storage", tech: "ExcelJS + DO Spaces", detail: "Generación de plantillas EFFI y CDN de imágenes compatible con S3", latencyOrRole: "Async Job" }
    ],
    heroImage: "/projects/natechnology/1.png",
    gallery: [
      "/projects/natechnology/1.png",
      "/projects/natechnology/img.png",
      "/projects/natechnology/img_1.png",
      "/projects/natechnology/2.png",
      "/projects/natechnology/3.png"
    ],
    githubUrl: "https://github.com/PabloLinares06",
    nextProject: {
      title: "Fuelix",
      slug: "fuelix"
    }
  },
  fuelix: {
    slug: "fuelix",
    title: "Fuelix",
    category: "Industrial IoT & SaaS Offline-First",
    badge: "Edge Computing",
    description: "Plataforma SaaS para Estaciones de Servicio (EDS) en Colombia y LatAm. Centraliza control de dispensadores de combustible, facturación electrónica POS, telemetría de tanques y liquidación de turnos bajo arquitectura offline-first con nodos Edge.",
    challenge: "Asegurar la continuidad de venta 24/7 sin pérdida de transacciones ante caídas de internet o apagado del PC de la estación, operando dentro del marco legal de metrología (SIC Resoluciones 77507/2016 y 67760/2018) con lectura serial pasiva en hardware accesible (Raspberry Pi de $50 USD).",
    architecture: "Arquitectura Edge Multi-Tier: Gateway en Raspberry Pi con lectura serial pasiva a dispensadores y spool local SQLite; Servidor de estación en PC con NestJS y PostgreSQL como fuente de verdad en sitio; y sincronización bidireccional resiliente con la nube multi-tenant (Angular 22 PWA + Supabase).",
    tech: ["Angular 22", "NestJS 11", "Raspberry Pi / IoT", "SQLite Spool", "PostgreSQL", "Supabase", "Offline-First", "Tailwind CSS"],
    metrics: [
      { label: "Disponibilidad", value: "100% Offline-First", detail: "Ventas y facturación activas aun sin red o con el PC principal apagado" },
      { label: "Metrología Legal", value: "SIC Compliant", detail: "Lectura pasiva sin comandos de escritura (Res. 77507 / 67760)" },
      { label: "Ahorro Hardware", value: "~90% Reducción", detail: "Raspberry Pi commodity en lugar de controladores propietarios caros" },
      { label: "Arquitectura Edge", value: "3 Niveles", detail: "Pi Serial Spool -> Local Station PC -> Cloud Multi-Tenant" }
    ],
    architectureFlow: [
      { step: "01", name: "Dispensadores Forecourt", tech: "Serial Loop RS-485", detail: "Lectura continua de galonaje, importe y mangueras activadas", latencyOrRole: "Hardware" },
      { step: "02", name: "Edge Gateway Node", tech: "Raspberry Pi + SQLite", detail: "Buffer duradero pasivo que encola eventos localmente ante cortes", latencyOrRole: "0.9ms" },
      { step: "03", name: "Station Core Server", tech: "NestJS + Local Postgres", detail: "Servidor local en PC que valida transacciones y emite recibos POS", latencyOrRole: "3.2ms" },
      { step: "04", name: "Cloud Multi-Tenant", tech: "Angular 22 PWA + Supabase", detail: "Consola gerencial, SICOM reporting y sincronización hacia la nube", latencyOrRole: "Cloud Sync" }
    ],
    heroImage: "/projects/fuelix/hero.svg",
    gallery: [
      "/projects/fuelix/hero.svg",
      "/projects/fuelix/imagotipo-dark.svg",
      "/projects/fuelix/isotipo-dark.svg"
    ],
    githubUrl: "https://github.com/PabloLinares06",
    nextProject: {
      title: "VitalAPP",
      slug: "vitalapp"
    }
  }
};

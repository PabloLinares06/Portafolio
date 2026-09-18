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

export interface GalleryItem {
  src: string;
  title: string;
  category: 'tienda' | 'admin' | 'mobile' | 'general';
  description: string;
  isFeatured?: boolean;
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
  galleryItems?: GalleryItem[];
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
    heroImage: "/projects/natechnology/hero.png",
    gallery: [
      "/projects/natechnology/hero.png",
      "/projects/natechnology/gallery/admin/05_Admin_Pedidos_y_EFFI.png",
      "/projects/natechnology/gallery/admin/02_Admin_Dashboard_Inventario.png",
      "/projects/natechnology/gallery/tienda/04_Catalogo_Grid_Productos.png",
      "/projects/natechnology/gallery/mobile/05_Mobile_Carrito_Mi_Pedido.png"
    ],
    galleryItems: [
      // 🛒 TIENDA PÚBLICA (DESKTOP)
      {
        src: "/projects/natechnology/gallery/tienda/03_Catalogo_Hero_y_Banners.png",
        title: "Catálogo Público & Banners Dinámicos",
        category: "tienda",
        description: "Cabecera principal con carrusel publicitario sincronizado desde DigitalOcean Spaces y segmentación por marcas mayoristas.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/tienda/04_Catalogo_Grid_Productos.png",
        title: "Grid de Productos de Alta Concurrencia",
        category: "tienda",
        description: "Renderizado continuo optimizado de más de 300 referencias tecnológicas con precios escalonados por volumen y badges de stock.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/tienda/07_Busqueda_En_Tiempo_Real.png",
        title: "Búsqueda Reactiva Instantánea",
        category: "tienda",
        description: "Filtrado en tiempo real por coincidencia difusa (fuzzy search) sobre títulos, referencias SKU y marcas sin latencia.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/tienda/08_Carrito_Mi_Pedido_Drawer.png",
        title: "Drawer Lateral 'Mi Pedido' & WhatsApp",
        category: "tienda",
        description: "Carrito reactivo con cálculo automático de totales mayoristas y botón de despacho instantáneo formateado para WhatsApp Business.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/tienda/05_Filtro_Categoria_Cargadores.png",
        title: "Filtro por Categoría: Cargadores & Cables",
        category: "tienda",
        description: "Navegación reactiva con filtrado multifactorial por potencia, tipo de conector y disponibilidad."
      },
      {
        src: "/projects/natechnology/gallery/tienda/06_Filtro_Categoria_Audifonos.png",
        title: "Filtro por Categoría: Audio & Accesorios",
        category: "tienda",
        description: "Visualización limpia de catálogo de auriculares inalámbricos con especificaciones técnicas al vuelo."
      },
      {
        src: "/projects/natechnology/gallery/tienda/02_Popup_Promociones_Especiales.png",
        title: "Modal Dinámico de Promociones",
        category: "tienda",
        description: "Avisos emergentes configurables desde el panel administrativo para ofertas relámpago y combos comerciales."
      },
      {
        src: "/projects/natechnology/gallery/tienda/01_Login_Acceso_Catalogo.png",
        title: "Autenticación de Clientes Mayoristas",
        category: "tienda",
        description: "Acceso protegido mediante credenciales para clientes verificados con tarifas especiales de distribuidor."
      },

      // ⚙️ PANEL ADMINISTRADOR, ERP & BI
      {
        src: "/projects/natechnology/gallery/admin/05_Admin_Pedidos_y_EFFI.png",
        title: "Integración Oficial EFFI ERP & Pedidos",
        category: "admin",
        description: "Módulo crítico: exportación automatizada a plantillas contables oficiales .xlsx de EFFI ERP y trazabilidad de estados (PENDIENTE, CONFIRMADO, EXPORTADO).",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/admin/02_Admin_Dashboard_Inventario.png",
        title: "Dashboard Central de Control de Inventario",
        category: "admin",
        description: "Panel de mando con conteo de SKUs, alertas de agotados, valorización de inventario y acciones de gestión rápida.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/admin/06_Admin_Ventas_Estadisticas_BI.png",
        title: "Módulo de Business Intelligence & Ventas",
        category: "admin",
        description: "Métricas cuantitativas de ingresos mensuales, ticket promedio por cliente mayorista y curvas de rendimiento comercial.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/admin/07_Admin_Rotacion_y_Productos_Top.png",
        title: "Analítica de Rotación & Ranking Top",
        category: "admin",
        description: "Identificación estadística de artículos de alta rotación (Fast Moving Consumer Goods) vs artículos estancados."
      },
      {
        src: "/projects/natechnology/gallery/admin/10_Admin_Actualizar_Precios_Masivo.png",
        title: "Actualizador Masivo de Precios",
        category: "admin",
        description: "Herramienta operativa para aplicar ajustes porcentuales o incrementos fijos por categoría en segundos.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/admin/08_Admin_Gestion_Categorias.png",
        title: "Gestor y Organizador de Categorías",
        category: "admin",
        description: "Reordenamiento interactivo con Drag & Drop (CDK) para controlar la posición jerárquica de cada familia en la tienda."
      },
      {
        src: "/projects/natechnology/gallery/admin/09_Admin_Gestion_Banners.png",
        title: "Gestor de Banners & Multimedia S3",
        category: "admin",
        description: "Subida directa de imágenes corporativas hacia DigitalOcean Spaces con redimensionamiento y caché CDN."
      },
      {
        src: "/projects/natechnology/gallery/admin/11_Admin_Promociones_Especiales.png",
        title: "Configurador de Promociones de Temporada",
        category: "admin",
        description: "Activación y desactivación programada de descuentos globales y avisos pop-up para el portal público."
      },
      {
        src: "/projects/natechnology/gallery/admin/12_Admin_Organizador_Catalogo.png",
        title: "Organizador Visual del Catálogo",
        category: "admin",
        description: "Disposición visual de los productos más destacados en la primera pantalla del comprador."
      },
      {
        src: "/projects/natechnology/gallery/admin/13_Admin_Exportar_PDF_Catalogo.png",
        title: "Exportador de Catálogo en PDF",
        category: "admin",
        description: "Motor documental para generar catálogos en PDF listos para imprimir o enviar por correo a distribuidores."
      },
      {
        src: "/projects/natechnology/gallery/admin/03_Admin_Formulario_Crear_Producto.png",
        title: "Formulario de Alta de Nuevo Producto",
        category: "admin",
        description: "Carga ágil de especificaciones técnicas, variantes, precios mayoristas y carga de imágenes multi-resolución."
      },
      {
        src: "/projects/natechnology/gallery/admin/04_Admin_Editar_Producto_Detalles.png",
        title: "Edición Detallada & Precios Escalonados",
        category: "admin",
        description: "Modificación en caliente de descripciones, estados de stock y reglas de precio para compras por bulto."
      },
      {
        src: "/projects/natechnology/gallery/admin/01_Admin_Login.png",
        title: "Acceso Seguro al Panel de Administración",
        category: "admin",
        description: "Autenticación robusta con JWT, refresh tokens seguros y control de accesos basados en roles administrativos."
      },

      // 📱 EXPERIENCIA MÓVIL (RESPONSIVE UX)
      {
        src: "/projects/natechnology/gallery/mobile/03_Mobile_Home_Hero_Banners.png",
        title: "Mobile Home: Banners & Navegación",
        category: "mobile",
        description: "Experiencia táctil fluida con carrusel de gestos táctiles adaptado a pantallas de teléfonos inteligentes.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/mobile/04_Mobile_Feed_Productos.png",
        title: "Mobile Feed: Catálogo Rápido",
        category: "mobile",
        description: "Lista optimizada para navegación con una sola mano y adición inmediata de artículos al carrito.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/mobile/05_Mobile_Carrito_Mi_Pedido.png",
        title: "Mobile Carrito: Checkout en 1 Clic",
        category: "mobile",
        description: "Revisión rápida de pedido y generación de orden directa vía WhatsApp Business con un toque.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/mobile/08_Mobile_Admin_Pedidos_EFFI.png",
        title: "Mobile Admin: Pedidos & EFFI ERP",
        category: "mobile",
        description: "Gestión y autorización de despachos desde el móvil del gerente con conexión directa a EFFI ERP.",
        isFeatured: true
      },
      {
        src: "/projects/natechnology/gallery/mobile/07_Mobile_Admin_Estadisticas_BI.png",
        title: "Mobile Admin: Métricas en Tiempo Real",
        category: "mobile",
        description: "Consulta de indicadores de ventas y flujo de caja en cualquier momento y lugar."
      },
      {
        src: "/projects/natechnology/gallery/mobile/06_Mobile_Admin_Dashboard.png",
        title: "Mobile Admin: Dashboard de Bolsillo",
        category: "mobile",
        description: "Resumen ágil de inventario disponible y pedidos pendientes desde el celular."
      },
      {
        src: "/projects/natechnology/gallery/mobile/02_Mobile_Popup_Promocion.png",
        title: "Mobile UX: Anuncios Pop-Up",
        category: "mobile",
        description: "Diseño responsivo de ofertas relámpago con cierre rápido sin obstruir la compra."
      },
      {
        src: "/projects/natechnology/gallery/mobile/01_Mobile_Login_Catalogo.png",
        title: "Mobile UX: Login de Acceso Rápido",
        category: "mobile",
        description: "Formulario de inicio de sesión ultra-ligero y optimizado para teclado móvil."
      }
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

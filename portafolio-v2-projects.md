# Plan de Implementación: Páginas Dedicadas de Proyectos (Case Study Cinematográfico)

## Objetivo
Expandir el portafolio inmersivo con una experiencia de "Case Study" detallada y visualmente impactante para cada proyecto:
1. **VitalAPP**: API REST para gestión médica.
2. **NaTechnology**: Sistema de gestión de inventario para una bodega mayorista en Medellín.

El objetivo es vender no solo el aspecto visual, sino también la complejidad técnica detrás de cada uno.

## Storytelling Técnico por Proyecto

### Proyecto 1: VitalAPP
- **El Reto Técnico:** Pensar y diseñar todo el backend con lógica de negocio compleja, implementando un ORM y estructuras avanzadas como CQRS. Cubrir todos los aspectos de seguridad (encriptación, JWT) y dominar React por primera vez a escala de producción para el frontend.
- **Deep Dive Arquitectónico:** Visualización del flujo CQRS, la separación de responsabilidades y la integración de seguridad JWT.

### Proyecto 2: NaTechnology
- **El Reto Técnico:** Gestionar la renderización eficiente de más de 300 productos en una sola vista continua (sin paginación ni scroll infinito, por requerimiento estricto del cliente). Construir un panel de administración completo (CRUD, precios, carga masiva de fotos) e integrar Firebase como backend y base de datos, aprendiéndolo y dominándolo desde cero.
- **Deep Dive Arquitectónico:** Estrategias de optimización de renderizado en React para listas largas y la arquitectura serverless utilizada con Firebase.

## Arquitectura y Estructura
- **Rutas Dinámicas:** Uso de `src/app/projects/[slug]/page.tsx` en Next.js App Router para soportar múltiples proyectos (`vitalapp`, `natechnology`).
- **Data Layer:** Archivo `src/data/projects.ts` para centralizar la información de los proyectos.
- **Manejo de Assets:** Migrar las capturas de `Insumos` a `public/projects/[slug]/` usando `next/image`.

## Elementos de la Experiencia
1. **Hero Parallax Inmersivo:** Imagen a pantalla completa con título gigante y fade-out al hacer scroll.
2. **El Reto Técnico (The Challenge):** Texto tipográfico elegante revelando los obstáculos superados.
3. **El "Deep Dive" Arquitectónico:** Diagramas interactivos o fragmentos de código iluminados al scroll.
4. **Galería Dinámica (Showcase):** Cuadrícula asimétrica o slider suave con las capturas de pantalla.
5. **Cierre y Navegación:** CTA final y link flotante hacia el *Siguiente Proyecto*.

## Fases de Implementación

### Fase 1: Setup de Datos y Media
- [ ] Transferir y renombrar imágenes de `Insumos/VitalAPP` y `Insumos/NaTechnology` a `public/projects/vitalapp/` y `public/projects/natechnology/`.
- [ ] Crear el modelo de datos `src/data/projects.ts` con la información completa, retos y stack de ambos proyectos.

### Fase 2: Enrutamiento y Transición
- [ ] Crear la página dinámica `src/app/projects/[slug]/page.tsx`.
- [ ] Configurar transiciones de entrada y salida con Framer Motion.

### Fase 3: Construcción de la Vista del Case Study
- [ ] `ProjectHero`: Parallax vinculado a `useScroll`.
- [ ] `ProjectChallenge`: Texto con tracking amplio y efectos de aparición.
- [ ] `ProjectTechStack`: Mostrar herramientas clave según el proyecto (CQRS/JWT para VitalAPP; Firebase/Optimización Frontend para NaTechnology).
- [ ] `ProjectGallery`: Carga diferida y animaciones GSAP `ScrollTrigger`.

### Fase 4: Integración en la Página Principal
- [ ] Conectar los botones "Explorar Caso" de `src/components/sections/Projects.tsx` con `<Link href="/projects/[slug]"/>`.
- [ ] Pruebas de navegación y performance móvil.

## Verificación
- Las rutas dinámicas cargan correctamente los datos de VitalAPP y NaTechnology.
- El storytelling resalta las capacidades técnicas de backend (CQRS, Firebase, Seguridad) y frontend (optimización de renderizado, React).
- Paralajes fluidos a 60fps sin tirones al cargar las imágenes.

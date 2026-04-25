# Plan de Implementación: Portafolio Web Inmersivo "The Core of Logic"

## Objetivo
Crear un portafolio web de alto impacto e innovador que destaque las habilidades de Juan Pablo Linares Laverde como Ingeniero de Software, utilizando una narrativa visual cinematográfica en 2D con React/Next.js.

## Stack Tecnológico
- **Framework:** Next.js 15+ (App Router)
- **Lenguaje:** TypeScript
- **Estilos:** Tailwind CSS
- **Animaciones:** Framer Motion (revelaciones y estados) y GSAP + ScrollTrigger (experiencias de scroll complejas)
- **Scroll Suave:** Lenis
- **Iconografía:** Lucide React / React Icons

## Fases de Implementación

### Fase 1: Inicialización y Configuración
1.  **Scaffolding:** Crear el proyecto Next.js con soporte para TypeScript, ESLint y Tailwind CSS.
2.  **Dependencias:** Instalar `gsap`, `framer-motion`, `@studio-freight/lenis` y `clsx` / `tailwind-merge`.
3.  **Diseño Base:**
    - Configurar `tailwind.config.ts` con la paleta de colores: `background: #050505`, `primary: #0070f3` (o azul eléctrico), `text: #ededed`.
    - Definir tipografías (Inter o Geist para un look técnico).

### Fase 2: Componentes de Experiencia Core
1.  **Custom Cursor:** Implementar un cursor reactivo que cambie de tamaño y color según la interacción.
2.  **Smooth Scroll:** Configurar Lenis para una navegación fluida.
3.  **Layout Cinematográfico:** Crear un componente de fondo con ruido sutil o gradientes animados para dar profundidad.

### Fase 3: Desarrollo de Secciones (Storytelling)
1.  **Hero Section (The Core):**
    - Animación de entrada para el nombre y el "núcleo" central.
    - Uso de Framer Motion para escalas y opacidades iniciales.
2.  **About Section (The Journey):**
    - Implementar revelación de texto palabra por palabra vinculada al scroll.
3.  **Experience Section (The Architecture):**
    - Crear el contenedor de scroll horizontal con GSAP ScrollTrigger.
    - Visualizar la arquitectura de VitalAPP (capas de API).
4.  **Skills Section (Expansion):**
    - Rejilla interactiva con efectos de "hover" magnético o revelaciones al entrar en el viewport.
5.  **Projects Section (Showcase):**
    - Tarjetas de proyecto con paralaje y links directos.
6.  **Contact Section (Conversion):**
    - Formulario minimalista y links a LinkedIn/GitHub.

### Fase 4: Optimización y Lanzamiento
1.  **Performance:** Optimizar imágenes (WebP) y scripts de animación.
2.  **Responsividad:** Asegurar que las animaciones se degraden elegantemente en dispositivos móviles.
3.  **Pruebas:** Verificar flujos de navegación y tiempos de carga.

## Verificación
- [ ] El scroll se siente fluido y sin "saltos" (jank).
- [ ] Las animaciones de GSAP se activan correctamente en los puntos de activación (triggers).
- [ ] El sitio es totalmente funcional en navegadores modernos y dispositivos móviles.
- [ ] El contenido del CV se refleja fielmente pero de forma innovadora.

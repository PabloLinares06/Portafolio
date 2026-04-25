export interface ProjectData {
  slug: string;
  title: string;
  category: string;
  description: string;
  challenge: string;
  architecture: string;
  tech: string[];
  heroImage: string;
  gallery: string[];
  nextProject: {
    title: string;
    slug: string;
  };
}

export const projects: Record<string, ProjectData> = {
  vitalapp: {
    slug: "vitalapp",
    title: "VitalAPP",
    category: "Gestión Médica",
    description: "API REST robusta diseñada para transformar la gestión de pacientes y médicos en entornos de alta demanda.",
    challenge: "El mayor reto fue orquestar un backend con lógica de negocio densa, asegurando la comunicación fluida entre cliente y servidor mediante un ORM, mientras se dominaba React por primera vez a escala profesional.",
    architecture: "Implementación de arquitectura en capas con patrones Repository y Query, inspirada en CQRS para una separación clara de responsabilidades y máxima escalabilidad.",
    tech: [".NET 9", "C#", "Dapper", "SQL Server", "React", "JWT", "Security"],
    heroImage: "/projects/vitalapp/hero.png",
    gallery: ["/projects/vitalapp/hero.png"],
    nextProject: {
      title: "NaTechnology",
      slug: "natechnology"
    }
  },
  natechnology: {
    slug: "natechnology",
    title: "NaTechnology",
    category: "Gestión de Inventario",
    description: "Sistema integral de trazabilidad para una bodega mayorista líder en el centro de Medellín.",
    challenge: "El desafío principal fue la renderización eficiente de más de 300 productos en una vista continua sin paginación, además de construir un panel administrativo masivo integrando Firebase desde cero.",
    architecture: "Arquitectura serverless optimizada para carga masiva de imágenes y sincronización de precios en tiempo real, con un enfoque en la eficiencia del renderizado frontend.",
    tech: ["React", "Firebase", "Firestore", "Cloud Storage", "Tailwind CSS", "Optimization"],
    heroImage: "/projects/natechnology/1.png",
    gallery: [
      "/projects/natechnology/1.png",
      "/projects/natechnology/2.png",
      "/projects/natechnology/3.png"
    ],
    nextProject: {
      title: "VitalAPP",
      slug: "vitalapp"
    }
  }
};

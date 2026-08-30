import type { ExpertiseArea, Project, SiteContent, TeamMember } from '../types';

/**
 * Spanish overlays for the canonical English records. Keys are the stable
 * identifiers (project slug, expertise slug, team member name); only
 * human-readable fields are overridden.
 */

export const site: Omit<Partial<SiteContent>, 'vision' | 'values'> & {
  vision: Partial<SiteContent['vision']>;
  values: SiteContent['values'];
} = {
  tagline: 'Soluciones innovadoras para el mañana',
  summary:
    'Ayudar a comunidades, gobiernos e industria a enfrentar los desafíos del agua, el medio ambiente y el clima.',
  heroAlt: 'Paisaje fluvial',
  vision: {
    title: 'Visión',
    description:
      'En Fluvio imaginamos un mundo donde el conocimiento y la tecnología se aprovechan para asegurar un planeta resiliente y próspero para las generaciones presentes y futuras. Nuestra misión es estar a la vanguardia del cambio ambiental positivo, aplicando soluciones innovadoras en la gestión del agua y el clima para contribuir a un futuro mejor para todos.',
    imageAlt: 'El río Kovi, Islas Salomón',
  },
  values: [
    {
      title: 'Innovación',
      description:
        'Adoptar, desarrollar e impulsar los avances tecnológicos al servicio de soluciones ambientales sostenibles.',
    },
    {
      title: 'Integridad',
      description: 'Mantener los más altos estándares éticos en todas nuestras interacciones y proyectos.',
    },
    {
      title: 'Colaboración',
      description:
        'Fomentar alianzas con clientes, comunidades y expertos para alcanzar metas ambientales colectivas con resultados sociales positivos.',
    },
    {
      title: 'Sostenibilidad',
      description: 'Priorizar la salud ambiental de largo plazo en todos los proyectos e innovaciones.',
    },
    {
      title: 'Empoderamiento',
      description:
        'Dotar a clientes y comunidades del conocimiento y las herramientas para adoptar y aplicar decisiones basadas en datos.',
    },
  ],
};

export const projects: Record<string, Partial<Project>> = {
  'advance-queensland': {
    title: 'Sistemas autónomos de monitoreo del agua de nueva generación',
    summary:
      'Perfeccionar un sistema de aforo de cauces por visión artificial para convertirlo en un producto disponible comercialmente.',
    location: 'Queensland, Australia',
    timeframe: '2024 - Actualidad',
    disciplines: ['Monitoreo hidrológico', 'Visión artificial'],
    heroAlt: 'Instalación de un sistema de aforo de cauces por visión artificial',
    challenge: [
      'Fluvio obtuvo una subvención Advance Queensland para perfeccionar su sistema de aforo de cauces por visión artificial (CVSG) y convertirlo en un producto disponible comercialmente.',
    ],
    approach: [
      'Este proyecto perfeccionará el prototipo de cámara existente para establecer un método rentable de medición de caudales y velocidades del agua.',
      'Los hitos clave incluyen la validación en una amplia variedad de cauces de Queensland con despliegues dirigidos, el desarrollo de un sistema de monitoreo en tiempo real de cargas de calidad del agua, y la provisión de un sistema de archivo en la nube para el personal operativo.',
    ],
    outcome: [
      'Esto mejora significativamente la cantidad de datos recopilados y reduce los riesgos de seguridad asociados a los métodos tradicionales de aforo durante crecidas.',
    ],
  },
  bina: {
    title: 'Monitoreo hidrológico de posibles fuentes de agua',
    summary:
      'Recopilar datos hidrológicos continuos para identificar una fuente de agua confiable y sostenible para el proyecto de desarrollo de Bina Harbour.',
    location: 'Bina Harbour, Islas Salomón',
    timeframe: '2025 - Actualidad',
    disciplines: ['Monitoreo hidrológico', 'Monitoreo de calidad del agua'],
    heroAlt: 'Aforo de caudal en el arroyo Loaloana',
    challenge: [
      'El proyecto de desarrollo de Bina Harbour requiere una fuente de agua confiable y limpia para satisfacer la demanda inmediata y de largo plazo de su planta procesadora de atún.',
    ],
    approach: [
      'Fluvio fue contratado para recopilar doce meses de datos hidrológicos continuos en tres sitios, mediante sistemas de aforo por visión artificial, estaciones de monitoreo de calidad del agua en tiempo real y aforos manuales.',
    ],
    outcome: [
      'El monitoreo entrega datos a intervalos de cinco minutos para identificar una fuente de agua confiable y sostenible para las necesidades operativas inmediatas y futuras de la planta procesadora.',
    ],
  },
  'monitoring-honiara': {
    title: 'Monitoreo hidrológico del Gran Honiara',
    summary:
      'Monitoreo hidrológico e investigaciones de cuencas en apoyo de servicios de agua y saneamiento resilientes al clima en el Gran Honiara.',
    location: 'Honiara, Islas Salomón',
    timeframe: '2022 - Actualidad',
    disciplines: ['Monitoreo hidrológico', 'Investigaciones de cuencas', 'Monitoreo de calidad del agua'],
    partners: ['Solomon Water'],
    heroAlt: 'Monitoreo de rutina de la calidad del agua en la red de distribución de Honiara',
    challenge: [
      'Solo el 55 % de la población del Gran Honiara tiene acceso al sistema público de abastecimiento de agua, y menos del 10 % está conectada a la red de alcantarillado de Honiara.',
    ],
    approach: [
      'Fluvio ha realizado monitoreo hidrológico e investigaciones de cuencas, incluidos sistemas de monitoreo de calidad del agua en tiempo real, tableros de datos operativos con alertas, la automatización de las actividades de monitoreo existentes y la ampliación hacia fuentes de agua provisionales.',
    ],
    outcome: [
      'Todo el trabajo se ha realizado junto al personal de Solomon Water, con el objetivo de desarrollar capacidades locales que sostengan el proyecto en el futuro.',
    ],
  },
  'ghg-emissions-reservoirs': {
    title: 'Emisiones de gases de efecto invernadero de embalses',
    summary: 'Evaluar las emisiones de gases de efecto invernadero de extensas superficies de tierras inundadas.',
    location: 'Toda Australia',
    timeframe: '2024 - Actualidad',
    disciplines: ['Evaluación de gases de efecto invernadero', 'Emisiones de metano'],
    heroAlt: 'Cámaras de metano midiendo tasas de emisión ebullitiva',
    challenge: [
      'Los sistemas de agua dulce emiten volúmenes sustanciales de gases de efecto invernadero, en particular metano, y por lo tanto contribuyen de manera significativa a las emisiones globales.',
    ],
    approach: [
      'Fluvio ha completado evaluaciones detalladas con las metodologías IPCC de Nivel 1 y Nivel 2, junto con trabajo dirigido a enfoques de verificación en campo para monitorear las vías de desgasificación y las emisiones aguas abajo en sistemas de pasada.',
    ],
    outcome: [
      'Fluvio ha demostrado una sólida experiencia en la cuantificación de emisiones de metano y en la aplicación de marcos de evaluación reconocidos mundialmente.',
    ],
  },
  wrd: {
    title: 'Diseño de un sistema de gestión de datos y capacitación',
    summary: 'Desarrollar el Sistema de Información del Agua de las Islas Salomón para la Water Resources Division.',
    location: 'Honiara, Islas Salomón',
    timeframe: '2025 - 2026',
    disciplines: ['Gestión de datos', 'Hidrología', 'Capacitación'],
    partners: ['Water Resources Division'],
    heroAlt: 'Aforo de caudal con la Water Resources Division en el río Mataniko',
    challenge: [
      'La Water Resources Division mantenía un archivo de datos hidrológicos históricos mayormente desestructurado e inaccesible, lo que limitaba su eficacia operativa.',
    ],
    approach: [
      'Mediante un enfoque participativo de codiseño, Fluvio desarrolló SIWIS, un sistema piloto de gestión de datos innovador y sostenible, e impartió capacitación en SIG, hidrología, recopilación, almacenamiento y seguridad de datos.',
    ],
    outcome: [
      'La plataforma SIWIS mejora la capacidad de la Water Resources Division para recopilar, almacenar de forma segura y analizar de manera significativa los datos hidrológicos, en apoyo de decisiones de gestión del agua basadas en evidencia.',
    ],
  },
  tina: {
    title: 'Monitoreo hidrológico de Tina Hydro',
    summary: 'Monitoreo hidrológico y de sedimentos para el Proyecto Hidroeléctrico del Río Tina.',
    location: 'Río Tina, Islas Salomón',
    timeframe: '2025 - Actualidad',
    disciplines: ['Monitoreo hidrológico', 'Monitoreo de sedimentos'],
    heroAlt: 'Monitoreo hidrológico de Tina Hydro',
    challenge: [
      'El Proyecto Hidroeléctrico del Río Tina requiere cálculos de energía basados en cargas de sedimentos, curvas de gasto y caudal medio.',
    ],
    approach: [
      'Fluvio ha realizado el monitoreo hidrológico y de sedimentos mediante sistemas de aforo por visión artificial, estaciones de nivel de agua en tiempo real, estaciones de calidad del agua en tiempo real, análisis de sedimentos y aforos manuales.',
    ],
    outcome: [
      'Se han desarrollado soluciones a medida de energía y comunicaciones para garantizar la confiabilidad en un entorno remoto y complejo.',
    ],
  },
  'sol-trader-oil-spill': {
    title: 'Encalladura del MV Solomon Trader y evaluación del daño ambiental del derrame de petróleo',
    summary:
      'Evaluaciones del impacto ambiental de la encalladura del MV Solomon Trader y del derrame de petróleo posterior.',
    location: 'Isla Rennell, Islas Salomón',
    timeframe: '2019 y 2025',
    disciplines: ['Evaluación de impacto ambiental', 'Evaluación ecológica'],
    heroAlt: 'Viaje al sitio de la encalladura en la bahía de Kangava',
    challenge: [
      'Tras el vertido de más de 300 toneladas de fueloil pesado sobre el arrecife franjeante somero y el entorno marino de la bahía de Kagava, se llevó a cabo una intensa operación de limpieza desde principios de marzo hasta el 26 de julio de 2019.',
    ],
    approach: [
      'En nombre del Gobierno de las Islas Salomón, Fluvio realizó evaluaciones de impacto ambiental en 2019 y 2025, incluidas evaluaciones del litoral terrestre, de sedimentos, bentónicas y ecológicas.',
    ],
    outcome: [
      'Los hallazgos se han categorizado para comprender los impactos del incidente en el entorno circundante.',
    ],
  },
  cordap: {
    title: 'Clean Reefs: cartografía dinámica de la contaminación',
    summary:
      'Desarrollar una herramienta global y de código abierto de cartografía de la contaminación y evaluación de riesgos para los arrecifes de coral.',
    location: 'Global',
    timeframe: '2024 - Actualidad',
    disciplines: ['Cartografía de la contaminación', 'Evaluación de riesgos'],
    heroAlt: 'Una pluma de sedimentos observada en las Islas Salomón',
    challenge: [
      'La contaminación de origen terrestre representa una amenaza importante para la salud de los arrecifes a nivel mundial, afectando a más del 30 % de los arrecifes de coral, mientras que las herramientas disponibles son en gran medida inaccesibles o inadecuadas para la toma de decisiones.',
    ],
    approach: [
      'El proyecto CLEAN REEFS está desarrollando una aplicación web que proporciona datos casi en tiempo real sobre fuentes de contaminación, exposición y patrones de dispersión.',
    ],
    outcome: [
      'La herramienta apoyará la conservación sobre el terreno en Fiyi y las Islas Salomón y creará una herramienta adaptable globalmente para las comunidades de arrecifes de coral de todo el mundo.',
    ],
  },
  'reservoir-sedimentation': {
    title: 'Estudios de sedimentación de embalses',
    summary: 'Identificar y cuantificar las tasas de sedimentación dentro de un embalse.',
    location: 'Australia',
    timeframe: '2024 - 2025',
    disciplines: ['Monitoreo de sedimentación', 'Levantamiento de campo'],
    heroAlt: 'Dos núcleos de sedimento extraídos de lechos lacustres',
    challenge: [
      'La sedimentación ocurre con frecuencia en las presas y reduce su capacidad; el aumento de las tasas puede generar dificultades operativas.',
    ],
    approach: [
      'El estudio combinó un levantamiento de campo inicial con penetrómetro de caída libre, una campaña posterior de extracción de núcleos, arreglos de sedimentación in situ, nodos de monitoreo de eventos en los principales puntos de entrada y una evaluación visual de la línea de costa.',
    ],
    outcome: [
      'El programa de campo identifica y cuantifica las tasas de sedimentación y define la dinámica de sedimentos durante el descenso del nivel del embalse.',
    ],
  },
};

export const team: Record<string, Partial<TeamMember>> = {
  'Simon Albert': {
    role: 'Director de Innovación y Estrategia',
    bio: 'Simon es un líder mundial en la aplicación de enfoques de monitoreo innovadores para comprender las interacciones entre el clima, el agua y la sociedad. Le apasionan las personas y la tecnología, y cree que ambas serán clave para superar los desafíos del mañana.',
    specialties: ['Clima, agua y sociedad'],
  },
  'Alistair Grinham': {
    role: 'Director de Sostenibilidad e Industria',
    bio: 'Alistair es un experto reconocido internacionalmente en la dinámica del carbono y los sedimentos en entornos terrestres y acuáticos. Busca apoyar la transición energética global y comprender mejor el impacto de los eventos extremos en los entornos naturales y construidos.',
    specialties: ['Dinámica del carbono y los sedimentos'],
  },
  'Nick Hutley': {
    role: 'Director de Investigación y Tecnología',
    bio: 'Nick lidera el desarrollo de la tecnología de flujo óptico para inaugurar una nueva era del monitoreo hidrológico. Cree que la clave de una gestión eficaz de los recursos naturales está en alimentar modelos numéricos adaptativos con flujos de datos ambientales críticos.',
    specialties: ['Tecnología de flujo óptico'],
  },
  'Melanie Johnson': {
    role: 'Analista Espacial y Comunicadora Científica',
    bio: 'Melanie es una analista geoespacial experimentada, científica de la conservación y piloto de drones. Su enfoque creativo mejora la comunicación científica en diversos medios, y está comprometida con usar su variado conjunto de habilidades para facilitar un cambio positivo.',
    specialties: ['Análisis geoespacial', 'Ciencia de la conservación'],
  },
  'Louis Ray': {
    role: 'Científico Ambiental Senior',
    bio: 'Louis es un consultor ambiental y de sostenibilidad dedicado, con una sólida trayectoria de proyectos de gran impacto. Le apasiona integrar consideraciones ambientales, sociales y económicas para crear resultados positivos para las comunidades locales.',
    specialties: ['Consultoría ambiental y de sostenibilidad'],
  },
  'Mandus Boselalu': {
    role: 'Científico Ambiental Senior - Melanesia',
    bio: 'Mandus tiene más de 15 años de experiencia liderando evaluaciones ambientales y sociales de grandes proyectos en Melanesia. Radicado en las Islas Salomón, está motivado por aplicar los enfoques integrados de Fluvio a los problemas complejos que enfrentan las comunidades rurales.',
    specialties: ['Evaluaciones ambientales y sociales'],
  },
  'Mubashir Imran': {
    role: 'Científico de Datos Senior',
    bio: 'A Mubashir le apasiona construir sistemas interoperables impulsados por datos que cierren las brechas entre las personas y la información. Está comprometido con la innovación de herramientas intuitivas que amplíen las fronteras del monitoreo ambiental y las interfaces de datos.',
    specialties: ['Sistemas interoperables impulsados por datos'],
  },
  'Yuval Kark-Levin': {
    role: 'Científico de Datos',
    bio: 'Yuval impulsa las técnicas de detección ambiental y amplía las fronteras actuales de los conjuntos de datos globales y los modelos aplicados. Le apasiona innovar herramientas y conjuntos de datos que capturen características locales complejas en entornos diversos a escala planetaria.',
    specialties: ['Detección ambiental'],
  },
  'Eric Cheung': {
    role: 'Científico de Datos Senior',
    bio: 'Eric se centra en aplicar la visión artificial y el aprendizaje automático para convertir los datos visuales en información significativa. Disfruta usar los datos y la tecnología para abordar desafíos ambientales y mejorar el monitoreo y el análisis.',
    specialties: ['Visión artificial', 'Aprendizaje automático'],
  },
};

export const expertise: Record<string, Partial<ExpertiseArea>> = {
  'hydrological-monitoring': {
    title: 'Monitoreo hidrológico innovador',
    summary: 'Desarrollar y aplicar un sistema de monitoreo hidrológico de vanguardia basado en visión artificial.',
    description: [
      'Este sistema mejora la seguridad y la eficiencia mediante sensores sin contacto y análisis en tiempo real para monitorear la velocidad y el caudal de los sistemas fluviales.',
    ],
    imageAlt: 'Monitoreo hidrológico en un arroyo',
  },
  'island-scale-modelling': {
    title: 'Modelación a escala insular y de cuencas',
    summary: 'Crear un modelo pionero de transporte de contaminación costera a escala global.',
    description: [
      'Esta herramienta innovadora aprovecha la observación de la Tierra y la computación en la nube para apoyar la planificación integrada tierra-mar y los esfuerzos de restauración.',
    ],
    imageAlt: 'Modelo de transporte de contaminación costera',
  },
  'catchment-management': {
    title: 'Gestión de cuencas y recursos hídricos',
    summary: 'Comprender los vínculos cuenca-cauce-océano junto a gobiernos, comunidades e industria.',
    description: [
      'Trabajamos con gobiernos, comunidades e industria para comprender los vínculos entre cuencas, cauces y océano, con un fuerte énfasis en equilibrar las necesidades de las comunidades y los beneficios ambientales.',
    ],
    imageAlt: 'Equipo de campo en acción',
  },
  'blue-carbon-assessment': {
    title: 'Carbono azul y evaluación de gases de efecto invernadero',
    summary: 'Cuantificar las reservas de carbono de los ecosistemas de manglares y pastos marinos de Melanesia.',
    description: [
      'Trabajamos con comunidades, gobiernos y organismos regionales para cuantificar las reservas de carbono de los ecosistemas de manglares y pastos marinos en toda Melanesia.',
    ],
    imageAlt: 'Entorno costero',
  },
  'operational-monitoring': {
    title: 'Sistemas de monitoreo operativos',
    summary: 'Digitalizar el monitoreo del agua junto a empresas públicas de agua.',
    description: [
      'Al integrar sistemas de monitoreo en tiempo real, bases de datos en la nube y sistemas de alerta, hemos reducido los tiempos de respuesta ante incidentes críticos de calidad del agua.',
    ],
    imageAlt: 'Monitoreo de la calidad del agua',
  },
  'sediment-loading': {
    title: 'Transporte de sedimentos y evaluación de embalses',
    summary: 'Monitorear y cartografiar las cargas de sedimentos hacia los entornos costeros.',
    description: [
      'Integramos un conjunto diverso de herramientas que incluye incubaciones de flujo de nutrientes, muestreo físico, granulometría y levantamientos con penetrómetro.',
    ],
    imageAlt: 'Trabajo de campo sobre sedimentación de un embalse',
  },
};

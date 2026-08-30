import type { Catalog } from './en';

/** Spanish catalog, translated in context with a neutral international register. */
export const es: Catalog = {
  slider: {
    regionLabel: 'Presentación de Fluvio',
    slideOf: 'de',
    previous: 'Diapositiva anterior',
    next: 'Diapositiva siguiente',
    pause: 'Pausar',
    resume: 'Reanudar',
    pauseAria: 'Pausar la rotación automática de diapositivas',
    resumeAria: 'Reanudar la rotación automática de diapositivas',
    autoplayOff: 'Reproducción automática desactivada',
    autoplayOffAria:
      'La rotación automática de diapositivas está desactivada porque la reducción de movimiento está activada',
    statusTemplate: 'Diapositiva {current} de {total}: {title}',
    slides: [
      {
        eyebrow: 'Agua y clima',
        title: 'Tecnología para un futuro hídrico más resiliente.',
        description: 'Ciencia de campo, sensores y sistemas de datos para decisiones ambientales prácticas.',
        action: 'Nuestra visión',
        href: '/vision',
        imageAlt: 'Un río serpenteando por un paisaje boscoso',
      },
      {
        eyebrow: 'Inteligencia de campo',
        title: 'Observar los sistemas hídricos mientras cambian.',
        description:
          'El monitoreo sin contacto y el análisis en tiempo real convierten condiciones complejas en evidencia útil.',
        action: 'Explorar especialidades',
        href: '/expertise',
        imageAlt: 'Aforo de caudal en el arroyo Loaloana',
      },
      {
        eyebrow: 'Ejecución colaborativa',
        title: 'Construir capacidades con quienes las utilizan.',
        description:
          'Herramientas y conocimiento desarrollados con comunidades, gobiernos, industria y socios regionales.',
        action: 'Ver nuestros proyectos',
        href: '/projects',
        imageAlt: 'Monitoreo de rutina de la calidad del agua en la red de distribución de Honiara',
      },
      {
        eyebrow: 'Plataformas operativas',
        title: 'De los sensores a las decisiones, en tiempo real.',
        description: 'FluvioSense y FluvioCascade convierten las redes de monitoreo en análisis, informes y alertas.',
        action: 'Descubrir las plataformas',
        href: '/projects#platforms-heading',
        imageAlt: 'Instalación de un sistema de aforo de cauces por visión artificial',
      },
      {
        eyebrow: 'Personas y territorio',
        title: 'Ciencia, ingeniería y conocimiento local, unidos.',
        description: 'Especialistas en hidrología, carbono, datos y ejecución trabajando en Australia y Melanesia.',
        action: 'Conocer al equipo',
        href: '/team',
        imageAlt: 'Un equipo de campo de Fluvio trabajando en conjunto',
      },
    ],
  },

  home: {
    metaDescription:
      'Soluciones de agua, medio ambiente y clima basadas en ciencia de campo, tecnología de monitoreo y ejecución práctica.',
    capabilitiesLabel: 'Capacidades principales',
    capabilities: [
      {
        title: 'Sistemas de monitoreo',
        description:
          'Sensores sin contacto, redes de calidad del agua en tiempo real y herramientas de datos operativos.',
      },
      {
        title: 'Modelación del agua',
        description: 'Modelos de cuencas, contaminación costera y recursos, fundamentados en evidencia ambiental.',
      },
      {
        title: 'Ejecución de proyectos',
        description:
          'Programas de campo y sistemas prácticos desarrollados junto a clientes, comunidades y operadores.',
      },
    ],
    expertiseEyebrow: 'Especialidades',
    expertiseTitle: 'Evidencia que va de las condiciones de campo a las decisiones',
    expertiseIntro:
      'Nuestro equipo combina ciencia del agua, monitoreo ambiental y sistemas de datos según las necesidades de cada lugar y cada proyecto.',
    expertiseMore: 'Ver las seis áreas de capacidad',
    projectsTitle: 'Proyectos seleccionados',
    projectsIntro:
      'Trabajo en curso en monitoreo hidrológico, abastecimiento de agua e infraestructura resiliente al clima.',
    projectsFeatured: 'Trabajo destacado',
    projectsMore: 'Explorar todos los proyectos',
    platformsTitle: 'Datos de monitoreo, listos para operar',
    platformsIntro:
      'Plataformas diseñadas a medida conectan las observaciones ambientales con el análisis, los informes y la acción.',
    teamTitle: 'Ciencia, tecnología y ejecución en un solo equipo',
    teamIntro:
      'Fluvio reúne a especialistas en hidrología, carbono, ciencias ambientales, análisis espacial y sistemas de datos.',
    teamMore: 'Conocer a todo el equipo',
    impactTitle: 'Construido con socios en Australia y Melanesia.',
    impactBody: [
      'Nuestro trabajo abarca Queensland, embalses australianos, Honiara, el río Tina, Bina Harbour y la isla Rennell. Los programas se diseñan con gobiernos, empresas de agua, comunidades y organizaciones regionales.',
      'La ejecución incluye monitoreo de campo, sistemas de datos operativos, capacitación y evaluación ambiental, con énfasis en capacidades locales duraderas.',
    ],
  },

  platforms: {
    label: 'Plataforma',
    sense: {
      title: 'FluvioSense',
      description:
        'Una plataforma web que comunica visión estereoscópica y analítica de datos en tiempo real a través de redes de cámaras de inundaciones y de agua.',
      action: 'Visitar FluvioSense',
    },
    cascade: {
      title: 'FluvioCascade',
      description:
        'Una plataforma web que ingiere datos de monitoreo ambiental en tiempo real para respaldar análisis, informes y alertas.',
    },
  },

  visionPage: {
    metaTitle: 'Visión',
    eyebrow: 'Visión',
    title: 'Sistemas hídricos más sanos. Comunidades más resilientes.',
    lede: 'El conocimiento y la tecnología pueden asegurar un planeta próspero para las generaciones presentes y futuras.',
    statementTitle: 'La razón de ser de Fluvio',
    valuesTitle: 'Cinco valores guían el trabajo',
    valuesIntro:
      'Definen cómo Fluvio desarrolla tecnología, colabora con sus socios y respalda resultados ambientales de largo plazo.',
    practiceTitle: 'Una práctica regional, arraigada en el territorio',
    practiceBody: [
      'Fluvio trabaja en los sistemas hídricos de Australia y Melanesia, combinando la evidencia de campo con herramientas adaptadas a las condiciones locales y a las necesidades operativas.',
      'La colaboración es parte de la ejecución. El monitoreo, la gestión de datos y la capacitación se desarrollan con las personas que los usarán y los mantendrán.',
    ],
    practiceImageAlt: 'Un equipo de campo de Fluvio trabajando en conjunto',
    contactEyebrow: 'Proyectos y alianzas',
    contactTitle: 'Trabajemos juntos por un futuro hídrico más resiliente.',
    contactIntro: 'Cuéntenos el desafío hídrico, ambiental o climático en el que está trabajando.',
  },

  expertisePage: {
    metaTitle: 'Especialidades',
    metaDescription:
      'La especialización de Fluvio en monitoreo hidrológico, modelación del agua, gestión de recursos, evaluación de carbono y sistemas de datos operativos.',
    eyebrow: 'Especialidades',
    title: 'Inteligencia del agua construida para condiciones reales.',
    lede: 'Profundidad técnica en monitoreo, modelación y evaluación ambiental, conectada con una ejecución práctica.',
    introTitle: 'Seis capacidades, una práctica ambiental integrada',
    introIntro:
      'Cada capacidad se apoya en ciencia de campo, datos y colaboración, con evidencia de proyectos en Australia y Melanesia.',
    areasLabel: 'Áreas de capacidad',
    relatedProjects: 'Proyectos relacionados',
    teamTitle: 'La capacidad es multidisciplinaria.',
    teamBody:
      'Hidrólogos, científicos ambientales, analistas espaciales y especialistas en datos trabajan juntos desde el diseño del proyecto hasta la ejecución en campo y el uso operativo.',
    teamLink: 'Conocer al equipo de Fluvio',
  },

  teamPage: {
    metaTitle: 'Equipo',
    metaDescription:
      'Conozca al equipo de Fluvio: hidrología, ciencias ambientales, carbono, análisis espacial y sistemas de datos.',
    eyebrow: 'Equipo',
    title: 'Muchas disciplinas. Una sola práctica ambiental.',
    lede: 'Especialistas que trabajan juntos en ciencia de campo, sistemas ambientales y tecnología aplicada.',
    heroImageAlt: 'Especialistas de Fluvio trabajando juntos en el campo',
    directoryTitle: 'Las personas detrás del trabajo',
    directoryIntro:
      'El equipo aporta experiencia de investigación, industria y trabajo regional a desafíos complejos de agua, clima y medio ambiente.',
    contactTitle: 'Reúna la combinación adecuada de especialidades para su proyecto.',
    contactIntro: 'Cuéntenos el sistema, el lugar o la decisión en la que su equipo está trabajando.',
    viewProfile: 'Ver perfil',
  },

  contactPage: {
    metaTitle: 'Contacto',
    metaDescription: 'Inicie una conversación con Fluvio sobre un proyecto de agua, medio ambiente o clima.',
    eyebrow: 'Contacto',
    title: 'Empiece por el lugar, el problema y la decisión.',
    lede: 'Cuéntenos el desafío hídrico, ambiental o climático en el que su equipo está trabajando.',
    heroImageAlt: 'Un paisaje fluvial visto desde arriba',
    enquiryTitle: 'Consulta de proyecto',
    enquiryBody:
      'Incluya la ubicación del proyecto, el sistema ambiental involucrado y la decisión o necesidad operativa que desea respaldar.',
    enquiryAction: 'Abrir una consulta de proyecto',
    enquirySubject: 'Consulta de proyecto para Fluvio',
    enquiryTemplate:
      'Ubicación del proyecto:\n\nSistema ambiental:\n\nDecisión o necesidad operativa:\n\nContexto del proyecto:',
    enquiryNote:
      'Esto abre un borrador en su aplicación de correo. Nada se envía a través de este sitio, y el sitio archivado no proporciona una dirección de correo pública directa.',
    socialTitle: 'Seguir a Fluvio',
    socialBody: 'Vea las novedades de la empresa y el trabajo en curso en la página oficial de Fluvio.',
    socialAction: 'Fluvio en LinkedIn',
  },

  projectsPage: {
    metaTitle: 'Proyectos',
    metaDescription:
      'Explore los proyectos de Fluvio en monitoreo hidrológico, gestión de recursos hídricos, evaluación ambiental y sistemas de datos aplicados.',
    eyebrow: 'Proyectos',
    title: 'Inteligencia de campo para sistemas ambientales complejos.',
    lede: 'Combinamos ciencia de campo práctica, tecnología de monitoreo y sistemas de datos para ayudar a comunidades, gobiernos e industria a tomar mejores decisiones sobre el agua y el clima.',
    featuredLabel: 'Proyecto destacado',
    listEyebrow: 'Trabajo seleccionado',
    listTitle: 'De las cuencas a las costas y las comunidades',
    listIntro: 'Nueve proyectos, cada uno moldeado por su territorio, sus socios y sus realidades operativas.',
    allProjects: 'Todos los proyectos',
    platformsEyebrow: 'Plataformas',
    platformsTitle: 'Datos ambientales listos para usar',
    platformsIntro:
      'Herramientas diseñadas a medida convierten las redes de monitoreo en información que los equipos pueden comprender y aprovechar.',
  },

  projectDetail: {
    back: 'Todos los proyectos',
    eyebrow: 'Proyecto',
    challenge: 'Desafío',
    approach: 'Enfoque',
    outcome: 'Resultado',
    storyLabel: 'Historia del proyecto',
    galleryLabel: 'Galería del proyecto',
    imageLabel: 'imagen',
    relatedExpertiseEyebrow: 'Especialidades relacionadas',
    relatedExpertiseTitle: 'Las capacidades detrás del trabajo',
    relatedProjectsEyebrow: 'Seguir explorando',
    relatedProjectsTitle: 'Proyectos relacionados',
    contactEyebrow: 'Trabaje con nosotros',
    contactTitle: '¿Necesita un proyecto a la medida de su entorno?',
    contactIntro:
      'Construimos sistemas de monitoreo y decisión en torno a lugares reales, restricciones prácticas y las personas que los utilizan.',
  },

  project: {
    viewProject: 'Ver el proyecto',
    readProject: 'Leer el proyecto',
    featuredEyebrow: 'Proyecto destacado',
    location: 'Ubicación',
    timeframe: 'Período',
    disciplines: 'Disciplinas',
    partners: 'Socios',
  },

  contactPanel: {
    eyebrow: 'Iniciar una conversación',
    title: '¿Tiene un desafío de agua, medio ambiente o clima?',
    intro:
      'Cuéntenos en qué está trabajando. Reuniremos la combinación adecuada de experiencia de campo, científica y tecnológica para la conversación.',
    action: 'Contactar a Fluvio',
  },
};

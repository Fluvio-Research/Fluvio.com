import type { Catalog } from './en';

/** French catalog, translated in context for a professional consultancy register. */
export const fr: Catalog = {
  nav: {
    vision: 'Vision',
    expertise: 'Expertise',
    projects: 'Projets',
    team: 'Équipe',
    contact: 'Contact',
    startProject: 'Lancer un projet',
    explore: 'Explorer',
    company: 'Entreprise',
    allRightsReserved: 'Tous droits réservés.',
    linkedinLabel: 'Fluvio sur LinkedIn',
    languageLabel: 'Langue',
  },

  slider: {
    regionLabel: 'Présentation de Fluvio',
    slideOf: 'sur',
    previous: 'Diapositive précédente',
    next: 'Diapositive suivante',
    pause: 'Pause',
    resume: 'Reprendre',
    pauseAria: 'Suspendre la rotation automatique des diapositives',
    resumeAria: 'Reprendre la rotation automatique des diapositives',
    autoplayOff: 'Lecture auto désactivée',
    autoplayOffAria:
      'La rotation automatique des diapositives est désactivée car la réduction des animations est activée',
    statusTemplate: 'Diapositive {current} sur {total} : {title}',
    slides: [
      {
        eyebrow: 'Eau et climat',
        title: "Des technologies pour un avenir de l'eau plus résilient.",
        description:
          'Science de terrain, capteurs et systèmes de données au service de décisions environnementales concrètes.',
        action: 'Notre vision',
        href: '/vision',
        imageAlt: 'Une rivière serpentant dans un paysage forestier',
      },
      {
        eyebrow: 'Intelligence de terrain',
        title: 'Observer les systèmes hydriques au fil de leurs évolutions.',
        description:
          'La surveillance sans contact et l’analyse en temps réel transforment des conditions complexes en données exploitables.',
        action: 'Découvrir nos expertises',
        href: '/expertise',
        imageAlt: 'Jaugeage de débit dans le cours d’eau Loaloana',
      },
      {
        eyebrow: 'Réalisation collaborative',
        title: 'Développer les compétences avec celles et ceux qui les utilisent.',
        description:
          'Des outils et des savoirs construits avec les communautés, les pouvoirs publics, l’industrie et les partenaires régionaux.',
        action: 'Voir nos projets',
        href: '/projects',
        imageAlt: 'Surveillance de routine de la qualité de l’eau dans le réseau de distribution de Honiara',
      },
      {
        eyebrow: 'Plateformes opérationnelles',
        title: 'Des capteurs aux décisions, en temps réel.',
        description:
          'FluvioSense et FluvioCascade transforment les réseaux de surveillance en analyses, rapports et alertes.',
        action: 'Découvrir les plateformes',
        href: '/projects#platforms-heading',
        imageAlt: 'Installation d’un système de jaugeage de cours d’eau par vision par ordinateur',
      },
      {
        eyebrow: 'Les personnes et les lieux',
        title: 'Science, ingénierie et savoirs locaux, réunis.',
        description:
          'Des spécialistes en hydrologie, carbone, données et réalisation, à l’œuvre en Australie et en Mélanésie.',
        action: 'Rencontrer l’équipe',
        href: '/team',
        imageAlt: 'Une équipe de terrain Fluvio au travail',
      },
    ],
  },

  home: {
    metaDescription:
      'Solutions pour l’eau, l’environnement et le climat, fondées sur la science de terrain, les technologies de surveillance et une réalisation concrète.',
    capabilitiesLabel: 'Compétences clés',
    capabilities: [
      {
        title: 'Systèmes de surveillance',
        description:
          'Capteurs sans contact, réseaux de qualité de l’eau en temps réel et outils de données opérationnels.',
      },
      {
        title: 'Modélisation de l’eau',
        description:
          'Modèles de bassins versants, de pollution côtière et de ressources, fondés sur des données environnementales.',
      },
      {
        title: 'Réalisation de projets',
        description:
          'Programmes de terrain et systèmes concrets développés avec les clients, les communautés et les opérateurs.',
      },
    ],
    expertiseEyebrow: 'Expertise',
    expertiseTitle: 'Des observations de terrain aux décisions',
    expertiseIntro:
      'Notre équipe associe science de l’eau, surveillance environnementale et systèmes de données, au plus près des besoins de chaque lieu et de chaque projet.',
    expertiseMore: 'Voir les six domaines de compétence',
    projectsTitle: 'Projets choisis',
    projectsIntro:
      'Des travaux en cours en surveillance hydrologique, approvisionnement en eau et infrastructures résilientes au climat.',
    projectsFeatured: 'Projet phare',
    projectsMore: 'Explorer tous les projets',
    platformsTitle: 'Des données de surveillance rendues opérationnelles',
    platformsIntro:
      'Des plateformes dédiées relient les observations environnementales à l’analyse, aux rapports et à l’action.',
    teamTitle: 'Science, technologie et réalisation au sein d’une même équipe',
    teamIntro:
      'Fluvio réunit des spécialistes en hydrologie, carbone, sciences de l’environnement, analyse spatiale et systèmes de données.',
    teamMore: 'Rencontrer toute l’équipe',
    impactTitle: 'Construit avec des partenaires en Australie et en Mélanésie.',
    impactBody: [
      'Nos travaux couvrent le Queensland, des réservoirs australiens, Honiara, la rivière Tina, Bina Harbour et l’île Rennell. Les programmes sont élaborés avec les gouvernements, les services d’eau, les communautés et les organisations régionales.',
      'La réalisation comprend la surveillance de terrain, les systèmes de données opérationnels, la formation et l’évaluation environnementale, avec un souci de compétences locales durables.',
    ],
  },

  platforms: {
    label: 'Plateforme',
    sense: {
      title: 'FluvioSense',
      description:
        'Une plateforme web qui diffuse la vision stéréoscopique et l’analyse de données en temps réel sur des réseaux de caméras de crue et de surveillance de l’eau.',
      action: 'Visiter FluvioSense',
    },
    cascade: {
      title: 'FluvioCascade',
      description:
        'Une plateforme web qui ingère des données de surveillance environnementale en temps réel pour l’analyse, les rapports et les alertes.',
    },
  },

  visionPage: {
    metaTitle: 'Vision',
    eyebrow: 'Vision',
    title: 'Des systèmes hydriques plus sains. Des communautés plus résilientes.',
    lede: 'Le savoir et la technologie peuvent garantir une planète florissante aux générations présentes et futures.',
    statementTitle: 'La raison d’être de Fluvio',
    valuesTitle: 'Cinq valeurs guident notre travail',
    valuesIntro:
      'Elles orientent la manière dont Fluvio développe ses technologies, collabore avec ses partenaires et soutient des résultats environnementaux durables.',
    practiceTitle: 'Une pratique régionale, ancrée dans les territoires',
    practiceBody: [
      'Fluvio intervient sur les systèmes hydriques d’Australie et de Mélanésie, en associant les observations de terrain à des outils adaptés aux conditions locales et aux besoins opérationnels.',
      'La collaboration fait partie de la réalisation. La surveillance, la gestion des données et la formation sont développées avec les personnes qui les utiliseront et les feront vivre.',
    ],
    practiceImageAlt: 'Une équipe de terrain Fluvio au travail',
    contactEyebrow: 'Projets et partenariats',
    contactTitle: 'Œuvrons ensemble pour un avenir de l’eau plus résilient.',
    contactIntro: 'Confiez-nous le défi hydrique, environnemental ou climatique que vous cherchez à relever.',
  },

  expertisePage: {
    metaTitle: 'Expertise',
    metaDescription:
      'L’expertise de Fluvio en surveillance hydrologique, modélisation de l’eau, gestion des ressources, évaluation du carbone et systèmes de données opérationnels.',
    eyebrow: 'Expertise',
    title: 'Une intelligence de l’eau conçue pour les conditions réelles.',
    lede: 'Une profondeur technique en surveillance, modélisation et évaluation environnementale, reliée à une réalisation concrète.',
    introTitle: 'Six compétences, une seule pratique environnementale intégrée',
    introIntro:
      'Chaque compétence s’appuie sur la science de terrain, les données et la collaboration, avec des références issues de projets menés en Australie et en Mélanésie.',
    areasLabel: 'Domaines de compétence',
    relatedProjects: 'Projets associés',
    teamTitle: 'Une compétence pluridisciplinaire.',
    teamBody:
      'Hydrologues, scientifiques de l’environnement, analystes spatiaux et spécialistes des données travaillent ensemble, de la conception du projet à la réalisation sur le terrain et à l’exploitation.',
    teamLink: 'Rencontrer l’équipe Fluvio',
  },

  teamPage: {
    metaTitle: 'Équipe',
    metaDescription:
      'Rencontrez l’équipe Fluvio : hydrologie, sciences de l’environnement, carbone, analyse spatiale et systèmes de données.',
    eyebrow: 'Équipe',
    title: 'Des disciplines multiples. Une pratique environnementale.',
    lede: 'Des spécialistes qui unissent science de terrain, systèmes environnementaux et technologies appliquées.',
    heroImageAlt: 'Des spécialistes Fluvio travaillant ensemble sur le terrain',
    directoryTitle: 'Les personnes derrière le travail',
    directoryIntro:
      'L’équipe apporte une expérience issue de la recherche, de l’industrie et du terrain régional à des défis complexes liés à l’eau, au climat et à l’environnement.',
    contactTitle: 'Réunissez les bonnes expertises pour votre projet.',
    contactIntro: 'Parlez-nous du système, du lieu ou de la décision sur lesquels votre équipe travaille.',
    viewProfile: 'Voir le profil',
  },

  contactPage: {
    metaTitle: 'Contact',
    metaDescription:
      'Engagez la conversation avec Fluvio autour d’un projet lié à l’eau, à l’environnement ou au climat.',
    eyebrow: 'Contact',
    title: 'Commencez par le lieu, le problème et la décision.',
    lede: 'Parlez-nous du défi hydrique, environnemental ou climatique que votre équipe cherche à relever.',
    heroImageAlt: 'Un paysage fluvial vu du ciel',
    enquiryTitle: 'Demande de projet',
    enquiryBody:
      'Précisez le lieu du projet, le système environnemental concerné et la décision ou le besoin opérationnel à appuyer.',
    enquiryAction: 'Ouvrir une demande de projet',
    enquirySubject: 'Demande de projet pour Fluvio',
    enquiryTemplate:
      'Lieu du projet :\n\nSystème environnemental :\n\nDécision ou besoin opérationnel :\n\nContexte du projet :',
    enquiryNote:
      'Ce lien ouvre un brouillon dans votre application de messagerie. Rien n’est transmis par ce site, et le site archivé ne fournit pas d’adresse électronique publique directe.',
    socialTitle: 'Suivre Fluvio',
    socialBody: 'Retrouvez l’actualité de l’entreprise et ses travaux en cours sur la page officielle de Fluvio.',
    socialAction: 'Fluvio sur LinkedIn',
  },

  projectsPage: {
    metaTitle: 'Projets',
    metaDescription:
      'Découvrez les projets Fluvio en surveillance hydrologique, gestion des ressources en eau, évaluation environnementale et systèmes de données appliqués.',
    eyebrow: 'Projets',
    title: 'L’intelligence de terrain pour des systèmes environnementaux complexes.',
    lede: 'Nous associons science de terrain, technologies de surveillance et systèmes de données pour aider les communautés, les gouvernements et l’industrie à mieux décider en matière d’eau et de climat.',
    featuredLabel: 'Projet phare',
    listEyebrow: 'Travaux choisis',
    listTitle: 'Des bassins versants aux littoraux et aux communautés',
    listIntro: 'Neuf projets, chacun façonné par son territoire, ses partenaires et ses réalités opérationnelles.',
    allProjects: 'Tous les projets',
    platformsEyebrow: 'Plateformes',
    platformsTitle: 'Des données environnementales prêtes à l’emploi',
    platformsIntro:
      'Des outils dédiés transforment les réseaux de surveillance en informations que les équipes peuvent comprendre et exploiter.',
  },

  projectDetail: {
    back: 'Tous les projets',
    eyebrow: 'Projet',
    challenge: 'Défi',
    approach: 'Approche',
    outcome: 'Résultat',
    storyLabel: 'Récit du projet',
    galleryLabel: 'Galerie du projet',
    imageLabel: 'image',
    relatedExpertiseEyebrow: 'Expertises associées',
    relatedExpertiseTitle: 'Les compétences derrière le travail',
    relatedProjectsEyebrow: 'Poursuivre l’exploration',
    relatedProjectsTitle: 'Projets associés',
    contactEyebrow: 'Travailler avec nous',
    contactTitle: 'Besoin d’un projet façonné pour votre environnement ?',
    contactIntro:
      'Nous concevons des systèmes de surveillance et de décision autour de lieux réels, de contraintes concrètes et des personnes qui les utilisent.',
  },

  project: {
    viewProject: 'Voir le projet',
    readProject: 'Lire le projet',
    featuredEyebrow: 'Projet phare',
    location: 'Lieu',
    timeframe: 'Période',
    disciplines: 'Disciplines',
    partners: 'Partenaires',
  },

  contactPanel: {
    eyebrow: 'Engager la conversation',
    title: 'Un défi lié à l’eau, à l’environnement ou au climat ?',
    intro:
      'Parlez-nous de ce sur quoi vous travaillez. Nous réunirons les bonnes expertises de terrain, scientifiques et technologiques autour de la conversation.',
    action: 'Contacter Fluvio',
  },
};

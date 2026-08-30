import type { Catalog } from './en';

/** French catalog, translated in context for a professional consultancy register. */
export const fr: Catalog = {
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

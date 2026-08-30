import type { ExpertiseArea, Project, SiteContent, TeamMember } from '../types';

/**
 * French overlays for the canonical English records. Keys are the stable
 * identifiers (project slug, expertise slug, team member name); only
 * human-readable fields are overridden.
 */

export const site: Omit<Partial<SiteContent>, 'vision' | 'values'> & {
  vision: Partial<SiteContent['vision']>;
  values: SiteContent['values'];
} = {
  tagline: 'Des solutions innovantes pour demain',
  summary:
    'Aider les communautés, les gouvernements et l’industrie à relever les défis liés à l’eau, à l’environnement et au climat.',
  heroAlt: 'Paysage fluvial',
  vision: {
    title: 'Vision',
    description:
      'Chez Fluvio, nous imaginons un monde où le savoir et la technologie sont mis au service d’une planète résiliente et florissante pour les générations présentes et futures. Notre mission est d’être à l’avant-garde du changement environnemental positif, en appliquant des solutions innovantes de gestion de l’eau et du climat pour contribuer à un avenir meilleur pour tous.',
    imageAlt: 'La rivière Kovi, Îles Salomon',
  },
  values: [
    {
      title: 'Innovation',
      description:
        'Adopter, développer et porter les avancées technologiques au service de solutions environnementales durables.',
    },
    {
      title: 'Intégrité',
      description:
        'Respecter les normes éthiques les plus exigeantes dans toutes nos interactions et tous nos projets.',
    },
    {
      title: 'Collaboration',
      description:
        'Cultiver des partenariats avec les clients, les communautés et les experts pour atteindre des objectifs environnementaux communs aux retombées sociales positives.',
    },
    {
      title: 'Durabilité',
      description:
        'Donner la priorité à la santé environnementale de long terme dans chaque projet et chaque innovation.',
    },
    {
      title: 'Autonomisation',
      description:
        'Donner aux clients et aux communautés les connaissances et les outils pour s’approprier une prise de décision fondée sur les données.',
    },
  ],
};

export const projects: Record<string, Partial<Project>> = {
  'advance-queensland': {
    title: 'Systèmes autonomes de surveillance de l’eau de nouvelle génération',
    summary:
      'Perfectionner un système de jaugeage de cours d’eau par vision par ordinateur pour en faire un produit commercialisable.',
    location: 'Queensland, Australie',
    timeframe: '2024 - En cours',
    disciplines: ['Surveillance hydrologique', 'Vision par ordinateur'],
    heroAlt: 'Installation d’un système de jaugeage de cours d’eau par vision par ordinateur',
    challenge: [
      'Fluvio a obtenu une subvention Advance Queensland pour perfectionner son système de jaugeage de cours d’eau par vision par ordinateur (CVSG) et en faire un produit commercialisable.',
    ],
    approach: [
      'Ce projet perfectionnera le prototype de caméra existant afin d’établir une méthode économique de mesure des débits et des vitesses d’écoulement.',
      'Les jalons clés comprennent une validation sur un large éventail de cours d’eau du Queensland avec des déploiements ciblés, le développement d’un système de suivi en temps réel des charges de qualité de l’eau, et la mise à disposition d’un système d’archivage en nuage pour le personnel opérationnel.',
    ],
    outcome: [
      'Cette approche améliore considérablement la quantité de données recueillies et réduit les risques de sécurité associés aux méthodes traditionnelles de jaugeage des crues.',
    ],
  },
  bina: {
    title: 'Surveillance hydrologique de sources d’eau potentielles',
    summary:
      'Recueillir des données hydrologiques en continu afin d’identifier une source d’eau fiable et durable pour le projet de développement de Bina Harbour.',
    location: 'Bina Harbour, Îles Salomon',
    timeframe: '2025 - En cours',
    disciplines: ['Surveillance hydrologique', 'Surveillance de la qualité de l’eau'],
    heroAlt: 'Jaugeage de débit dans le cours d’eau Loaloana',
    challenge: [
      'Le projet de développement de Bina Harbour requiert une source d’eau fiable et propre pour répondre à la demande immédiate et de long terme de son usine de transformation du thon.',
    ],
    approach: [
      'Fluvio a été mandaté pour recueillir douze mois de données hydrologiques en continu sur trois sites, à l’aide de systèmes de jaugeage par vision par ordinateur, de stations de surveillance de la qualité de l’eau en temps réel et de jaugeages manuels.',
    ],
    outcome: [
      'La surveillance fournit des données à intervalles de cinq minutes afin d’identifier une source d’eau fiable et durable pour les besoins opérationnels immédiats et futurs de l’usine de transformation.',
    ],
  },
  'monitoring-honiara': {
    title: 'Surveillance hydrologique du Grand Honiara',
    summary:
      'Surveillance hydrologique et études de bassins versants à l’appui de services d’eau et d’assainissement résilients au climat dans le Grand Honiara.',
    location: 'Honiara, Îles Salomon',
    timeframe: '2022 - En cours',
    disciplines: ['Surveillance hydrologique', 'Études de bassins versants', 'Surveillance de la qualité de l’eau'],
    partners: ['Solomon Water'],
    heroAlt: 'Surveillance de routine de la qualité de l’eau dans le réseau de distribution de Honiara',
    challenge: [
      'Seulement 55 % de la population du Grand Honiara a accès au réseau public d’eau potable, et moins de 10 % est raccordée au réseau d’assainissement de Honiara.',
    ],
    approach: [
      'Fluvio a mené des travaux de surveillance hydrologique et d’étude des bassins versants, comprenant des systèmes de surveillance de la qualité de l’eau en temps réel, des tableaux de bord opérationnels avec alertes, l’automatisation des activités de surveillance existantes et l’extension à des sources d’eau provisoires.',
    ],
    outcome: [
      'L’ensemble des travaux a été réalisé aux côtés du personnel de Solomon Water, dans l’objectif de renforcer les compétences locales pour porter le projet dans la durée.',
    ],
  },
  'ghg-emissions-reservoirs': {
    title: 'Émissions de gaz à effet de serre des réservoirs',
    summary: 'Évaluer les émissions de gaz à effet de serre de vastes terres inondées.',
    location: 'Toute l’Australie',
    timeframe: '2024 - En cours',
    disciplines: ['Évaluation des gaz à effet de serre', 'Émissions de méthane'],
    heroAlt: 'Chambres à méthane mesurant les taux d’émission par ébullition',
    challenge: [
      'Les systèmes d’eau douce émettent des volumes importants de gaz à effet de serre, en particulier du méthane, et contribuent donc de manière significative aux émissions mondiales.',
    ],
    approach: [
      'Fluvio a réalisé des évaluations détaillées selon les méthodologies GIEC de niveaux 1 et 2, ainsi que des travaux ciblés sur des approches de vérification de terrain pour le suivi des voies de dégazage et des émissions en aval des systèmes au fil de l’eau.',
    ],
    outcome: [
      'Fluvio a démontré une solide expertise dans la quantification des émissions de méthane et l’application de cadres d’évaluation mondialement reconnus.',
    ],
  },
  wrd: {
    title: 'Conception d’un système de gestion des données et formation',
    summary: 'Développer le système d’information sur l’eau des Îles Salomon pour la Water Resources Division.',
    location: 'Honiara, Îles Salomon',
    timeframe: '2025 - 2026',
    disciplines: ['Gestion des données', 'Hydrologie', 'Formation'],
    partners: ['Water Resources Division'],
    heroAlt: 'Jaugeage de débit avec la Water Resources Division sur la rivière Mataniko',
    challenge: [
      'La Water Resources Division conservait des archives de données hydrologiques historiques largement non structurées et difficiles d’accès, ce qui limitait son efficacité opérationnelle.',
    ],
    approach: [
      'Par une démarche participative de co-conception, Fluvio a développé SIWIS, un système pilote de gestion des données innovant et durable, et dispensé des formations en SIG, hydrologie, collecte, stockage et sécurité des données.',
    ],
    outcome: [
      'La plateforme SIWIS renforce la capacité de la Water Resources Division à collecter, stocker en toute sécurité et analyser utilement les données hydrologiques, à l’appui de décisions de gestion de l’eau fondées sur les faits.',
    ],
  },
  tina: {
    title: 'Surveillance hydrologique de Tina Hydro',
    summary: 'Surveillance hydrologique et sédimentaire pour le projet hydroélectrique de la rivière Tina.',
    location: 'Rivière Tina, Îles Salomon',
    timeframe: '2025 - En cours',
    disciplines: ['Surveillance hydrologique', 'Surveillance des sédiments'],
    heroAlt: 'Surveillance hydrologique de Tina Hydro',
    challenge: [
      'Le projet hydroélectrique de la rivière Tina requiert des calculs d’énergie fondés sur les charges sédimentaires, les courbes de tarage et le débit moyen.',
    ],
    approach: [
      'Fluvio a réalisé la surveillance hydrologique et sédimentaire à l’aide de systèmes de jaugeage par vision par ordinateur, de stations de niveau d’eau en temps réel, de stations de qualité de l’eau en temps réel, d’analyses sédimentaires et de jaugeages manuels.',
    ],
    outcome: [
      'Des solutions sur mesure d’alimentation et de communication ont été développées pour garantir la fiabilité dans un environnement isolé et complexe.',
    ],
  },
  'sol-trader-oil-spill': {
    title: 'Échouement du MV Solomon Trader et évaluation des dommages environnementaux de la marée noire',
    summary:
      'Évaluations de l’impact environnemental de l’échouement du MV Solomon Trader et de la marée noire qui a suivi.',
    location: 'Île Rennell, Îles Salomon',
    timeframe: '2019 et 2025',
    disciplines: ['Évaluation d’impact environnemental', 'Évaluation écologique'],
    heroAlt: 'En route vers le site de l’échouement dans la baie de Kangava',
    challenge: [
      'Après le déversement de plus de 300 tonnes de fioul lourd sur le récif frangeant peu profond et le milieu marin de la baie de Kagava, une opération intensive de nettoyage a été menée de début mars au 26 juillet 2019.',
    ],
    approach: [
      'Pour le compte du gouvernement des Îles Salomon, Fluvio a mené des évaluations d’impact environnemental en 2019 et en 2025, comprenant des évaluations du littoral terrestre, des sédiments, du benthos et de l’écologie.',
    ],
    outcome: [
      'Les résultats ont été catégorisés afin de comprendre les impacts de l’incident sur l’environnement alentour.',
    ],
  },
  cordap: {
    title: 'Clean Reefs : cartographie dynamique de la pollution',
    summary:
      'Développer un outil mondial et open source de cartographie de la pollution et d’évaluation des risques pour les récifs coralliens.',
    location: 'Mondial',
    timeframe: '2024 - En cours',
    disciplines: ['Cartographie de la pollution', 'Évaluation des risques'],
    heroAlt: 'Un panache sédimentaire observé aux Îles Salomon',
    challenge: [
      'La pollution d’origine terrestre constitue une menace majeure pour la santé des récifs à l’échelle mondiale, affectant plus de 30 % des récifs coralliens, alors que les outils disponibles restent largement inaccessibles ou inadaptés à la prise de décision.',
    ],
    approach: [
      'Le projet CLEAN REEFS développe une application web fournissant des données en quasi temps réel sur les sources de pollution, l’exposition et les schémas de dispersion.',
    ],
    outcome: [
      'L’outil appuiera la conservation de terrain aux Fidji et aux Îles Salomon et constituera un outil adaptable à l’échelle mondiale pour les communautés des récifs coralliens.',
    ],
  },
  'reservoir-sedimentation': {
    title: 'Études de sédimentation des réservoirs',
    summary: 'Identifier et quantifier les taux de sédimentation au sein d’un réservoir.',
    location: 'Australie',
    timeframe: '2024 - 2025',
    disciplines: ['Suivi de la sédimentation', 'Relevés de terrain'],
    heroAlt: 'Deux carottes de sédiments prélevées dans des fonds lacustres',
    challenge: [
      'La sédimentation est fréquente dans les barrages et réduit leur capacité ; son accélération peut engendrer des difficultés opérationnelles.',
    ],
    approach: [
      'L’étude a combiné un relevé de terrain initial au pénétromètre à chute libre, une campagne de carottage complémentaire, des dispositifs de sédimentation in situ, des stations de suivi d’événements aux principaux points d’entrée et une évaluation visuelle des rives.',
    ],
    outcome: [
      'Le programme de terrain identifie et quantifie les taux de sédimentation et caractérise la dynamique sédimentaire lors des abaissements du réservoir.',
    ],
  },
};

export const team: Record<string, Partial<TeamMember>> = {
  'Simon Albert': {
    role: 'Directeur de l’innovation et de la stratégie',
    bio: 'Simon est un chef de file mondial de l’application d’approches de surveillance innovantes pour comprendre les interactions entre le climat, l’eau et la société. Passionné par les personnes comme par la technologie, il est convaincu que les deux seront déterminantes pour relever les défis de demain.',
    specialties: ['Climat, eau et société'],
  },
  'Alistair Grinham': {
    role: 'Directeur du développement durable et de l’industrie',
    bio: 'Alistair est un expert internationalement reconnu de la dynamique du carbone et des sédiments dans les milieux terrestres et aquatiques. Il s’attache à soutenir la transition énergétique mondiale et à mieux comprendre l’impact des événements extrêmes sur les milieux naturels et bâtis.',
    specialties: ['Dynamique du carbone et des sédiments'],
  },
  'Nick Hutley': {
    role: 'Directeur de la recherche et de la technologie',
    bio: 'Nick pilote le développement de la technologie de flux optique pour ouvrir une nouvelle ère de la surveillance hydrologique. Il est convaincu que la clé d’une gestion efficace des ressources naturelles réside dans l’alimentation de modèles numériques adaptatifs par des flux de données environnementales critiques.',
    specialties: ['Technologie de flux optique'],
  },
  'Melanie Johnson': {
    role: 'Analyste spatiale et communicatrice scientifique',
    bio: 'Melanie est une analyste géospatiale expérimentée, scientifique de la conservation et télépilote de drone. Son approche créative enrichit la communication scientifique sur des supports variés, et elle met son éventail de compétences au service d’un changement positif.',
    specialties: ['Analyse géospatiale', 'Science de la conservation'],
  },
  'Louis Ray': {
    role: 'Scientifique environnemental senior',
    bio: 'Louis est un consultant en environnement et développement durable engagé, fort d’un solide bilan de projets à fort impact. Il a à cœur d’intégrer les dimensions environnementales, sociales et économiques pour créer des retombées positives pour les communautés locales.',
    specialties: ['Conseil en environnement et développement durable'],
  },
  'Mandus Boselalu': {
    role: 'Scientifique environnemental senior - Mélanésie',
    bio: 'Mandus cumule plus de quinze ans d’expérience à la tête d’évaluations environnementales et sociales de grands projets en Mélanésie. Basé aux Îles Salomon, il souhaite appliquer les approches intégrées de Fluvio aux enjeux complexes des communautés rurales.',
    specialties: ['Évaluations environnementales et sociales'],
  },
  'Mubashir Imran': {
    role: 'Data scientist senior',
    bio: 'Mubashir se passionne pour la construction de systèmes interopérables pilotés par les données, qui rapprochent les personnes et l’information. Il s’attache à innover des outils intuitifs qui repoussent les limites de la surveillance environnementale et des interfaces de données.',
    specialties: ['Systèmes interopérables pilotés par les données'],
  },
  'Yuval Kark-Levin': {
    role: 'Data scientist',
    bio: 'Yuval fait progresser les techniques de détection environnementale et repousse les limites des jeux de données mondiaux et des modèles appliqués. Il se passionne pour la création d’outils et de jeux de données qui capturent des caractéristiques locales complexes à l’échelle planétaire.',
    specialties: ['Détection environnementale'],
  },
  'Eric Cheung': {
    role: 'Data scientist senior',
    bio: 'Eric applique la vision par ordinateur et l’apprentissage automatique pour transformer les données visuelles en enseignements utiles. Il aime mettre les données et la technologie au service des défis environnementaux et de l’amélioration de la surveillance et de l’analyse.',
    specialties: ['Vision par ordinateur', 'Apprentissage automatique'],
  },
};

export const expertise: Record<string, Partial<ExpertiseArea>> = {
  'hydrological-monitoring': {
    title: 'Surveillance hydrologique innovante',
    summary:
      'Développer et appliquer un système de surveillance hydrologique de pointe fondé sur la vision par ordinateur.',
    description: [
      'Ce système améliore la sécurité et l’efficacité grâce à des capteurs sans contact et à une analyse en temps réel pour suivre la vitesse et le débit des cours d’eau.',
    ],
    imageAlt: 'Surveillance hydrologique dans un cours d’eau',
  },
  'island-scale-modelling': {
    title: 'Modélisation insulaire et de bassins versants',
    summary: 'Créer un modèle pionnier de transport de la pollution côtière à l’échelle mondiale.',
    description: [
      'Cet outil innovant s’appuie sur l’observation de la Terre et l’informatique en nuage pour soutenir la planification intégrée terre-mer et les efforts de restauration.',
    ],
    imageAlt: 'Modèle de transport de la pollution côtière',
  },
  'catchment-management': {
    title: 'Gestion des bassins versants et des ressources en eau',
    summary:
      'Comprendre les liens bassin versant-cours d’eau-océan avec les pouvoirs publics, les communautés et l’industrie.',
    description: [
      'Nous travaillons avec les pouvoirs publics, les communautés et l’industrie pour comprendre les liens entre bassins versants, cours d’eau et océan, en veillant à équilibrer les besoins des communautés et les bénéfices environnementaux.',
    ],
    imageAlt: 'Équipe de terrain au travail',
  },
  'blue-carbon-assessment': {
    title: 'Carbone bleu et évaluation des gaz à effet de serre',
    summary: 'Quantifier les stocks de carbone des écosystèmes de mangroves et d’herbiers marins de Mélanésie.',
    description: [
      'Nous travaillons avec les communautés, les gouvernements et les organismes régionaux pour quantifier les stocks de carbone des écosystèmes de mangroves et d’herbiers marins à travers la Mélanésie.',
    ],
    imageAlt: 'Environnement côtier',
  },
  'operational-monitoring': {
    title: 'Systèmes de surveillance opérationnels',
    summary: 'Numériser la surveillance de l’eau avec des services d’eau publics.',
    description: [
      'En intégrant des systèmes de surveillance en temps réel, des bases de données en nuage et des dispositifs d’alerte, nous avons réduit les délais de réponse aux incidents critiques de qualité de l’eau.',
    ],
    imageAlt: 'Surveillance de la qualité de l’eau',
  },
  'sediment-loading': {
    title: 'Transport sédimentaire et évaluation des réservoirs',
    summary: 'Surveiller et cartographier les charges sédimentaires vers les milieux côtiers.',
    description: [
      'Nous intégrons un ensemble varié d’outils : incubations de flux de nutriments, échantillonnage physique, granulométrie et relevés au pénétromètre.',
    ],
    imageAlt: 'Travaux de terrain sur la sédimentation d’un réservoir',
  },
};

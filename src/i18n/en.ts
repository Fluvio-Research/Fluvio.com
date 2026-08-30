/**
 * English catalog. This object defines the canonical string shape; the French
 * and Spanish catalogs are typed against it so no string can be left
 * untranslated.
 */
export const en = {
  nav: {
    vision: 'Vision',
    expertise: 'Expertise',
    projects: 'Projects',
    team: 'Team',
    contact: 'Contact',
    startProject: 'Start a project',
    explore: 'Explore',
    company: 'Company',
    allRightsReserved: 'All rights reserved.',
    linkedinLabel: 'Fluvio on LinkedIn',
    languageLabel: 'Language',
  },

  slider: {
    regionLabel: 'Fluvio introduction',
    slideOf: 'of',
    previous: 'Previous slide',
    next: 'Next slide',
    pause: 'Pause',
    resume: 'Resume',
    pauseAria: 'Pause automatic slide rotation',
    resumeAria: 'Resume automatic slide rotation',
    autoplayOff: 'Autoplay off',
    autoplayOffAria: 'Automatic slide rotation is off because reduced motion is enabled',
    statusTemplate: 'Slide {current} of {total}: {title}',
    slides: [
      {
        eyebrow: 'Water and climate',
        title: 'Technology for a more resilient water future.',
        description: 'Field science, sensing and data systems for practical environmental decisions.',
        action: 'Our vision',
        href: '/vision',
        imageAlt: 'A river winding through a forested landscape',
      },
      {
        eyebrow: 'Field intelligence',
        title: 'Observe water systems as they change.',
        description: 'Non-contact monitoring and real-time analysis turn complex conditions into useful evidence.',
        action: 'Explore expertise',
        href: '/expertise',
        imageAlt: 'Flow gauging in the Loaloana Stream',
      },
      {
        eyebrow: 'Collaborative delivery',
        title: 'Build capability with the people who use it.',
        description: 'Tools and knowledge shaped with communities, government, industry and regional partners.',
        action: 'See our projects',
        href: '/projects',
        imageAlt: 'Routine water quality monitoring in the Honiara reticulation network',
      },
      {
        eyebrow: 'Operational platforms',
        title: 'From sensors to decisions in real time.',
        description: 'FluvioSense and FluvioCascade turn live monitoring networks into analysis, reporting and alerts.',
        action: 'Discover the platforms',
        href: '/projects#platforms-heading',
        imageAlt: 'Installation of a computer vision stream gauging system',
      },
      {
        eyebrow: 'People and place',
        title: 'Science, engineering and local knowledge, together.',
        description: 'Specialists in hydrology, carbon, data and delivery working across Australia and Melanesia.',
        action: 'Meet the team',
        href: '/team',
        imageAlt: 'A Fluvio field team working together',
      },
    ],
  },

  home: {
    metaDescription:
      'Water, environmental and climate solutions grounded in field science, monitoring technology and practical delivery.',
    capabilitiesLabel: 'Core capabilities',
    capabilities: [
      {
        title: 'Monitoring systems',
        description: 'Non-contact sensing, real-time water quality networks and operational data tools.',
      },
      {
        title: 'Water modelling',
        description: 'Catchment, coastal pollution and resource models grounded in environmental evidence.',
      },
      {
        title: 'Project delivery',
        description: 'Field programs and practical systems developed alongside clients, communities and operators.',
      },
    ],
    expertiseEyebrow: 'Expertise',
    expertiseTitle: 'Evidence that moves from field conditions to decisions',
    expertiseIntro:
      'Our team combines water science, environmental monitoring and data systems around the needs of each place and project.',
    expertiseMore: 'View all six capability areas',
    projectsTitle: 'Selected projects',
    projectsIntro: 'Current work across hydrological monitoring, water supply and climate-resilient infrastructure.',
    projectsFeatured: 'Featured work',
    projectsMore: 'Explore every project',
    platformsTitle: 'Monitoring data, made operational',
    platformsIntro: 'Purpose-built platforms connect environmental observations with analysis, reporting and action.',
    teamTitle: 'Science, technology and delivery in one team',
    teamIntro:
      'Fluvio brings together specialists in hydrology, carbon, environmental science, spatial analysis and data systems.',
    teamMore: 'Meet the full team',
    impactTitle: 'Built with partners across Australia and Melanesia.',
    impactBody: [
      'Our work spans Queensland, Australian reservoirs, Honiara, the Tina River, Bina Harbour and Rennell Island. Programs are shaped with government, utilities, communities and regional organisations.',
      'Delivery includes field monitoring, operational data systems, training and environmental assessment, with a focus on lasting local capability.',
    ],
  },

  platforms: {
    label: 'Platform',
    sense: {
      title: 'FluvioSense',
      description:
        'A web-based platform to communicate stereo vision and real-time data analytics across flood and water camera networks.',
      action: 'Visit FluvioSense',
    },
    cascade: {
      title: 'FluvioCascade',
      description:
        'A web-based platform that ingests real-time environmental monitoring data to support analysis, reporting and alerts.',
    },
  },

  visionPage: {
    metaTitle: 'Vision',
    eyebrow: 'Vision',
    title: 'Healthier water systems. More resilient communities.',
    lede: 'Knowledge and technology can help secure a thriving planet for current and future generations.',
    statementTitle: 'Why Fluvio exists',
    valuesTitle: 'Five values guide the work',
    valuesIntro:
      'They shape how Fluvio develops technology, works with partners and supports long-term environmental outcomes.',
    practiceTitle: 'A regional practice, grounded in place',
    practiceBody: [
      'Fluvio works across Australian and Melanesian water systems, combining field evidence with tools that fit local conditions and operational needs.',
      'Collaboration is part of delivery. Monitoring, data management and training are developed with the people who will use and sustain them.',
    ],
    practiceImageAlt: 'A Fluvio field team working together',
    contactEyebrow: 'Projects and partnerships',
    contactTitle: 'Work towards a more resilient water future with us.',
    contactIntro: 'Bring us the water, environmental or climate challenge you are working through.',
  },

  expertisePage: {
    metaTitle: 'Expertise',
    metaDescription:
      'Fluvio expertise in hydrological monitoring, water modelling, resource management, carbon assessment and operational data systems.',
    eyebrow: 'Expertise',
    title: 'Water intelligence built for real conditions.',
    lede: 'Technical depth across monitoring, modelling and environmental assessment, connected to practical delivery.',
    introTitle: 'Six capabilities, one connected environmental practice',
    introIntro:
      'Each capability draws on field science, data and collaboration, with evidence from projects across Australia and Melanesia.',
    areasLabel: 'Capability areas',
    relatedProjects: 'Related projects',
    teamTitle: 'The capability is multidisciplinary.',
    teamBody:
      'Hydrologists, environmental scientists, spatial analysts and data specialists work together from project design through field delivery and operational use.',
    teamLink: 'Meet the Fluvio team',
  },

  teamPage: {
    metaTitle: 'Team',
    metaDescription:
      'Meet the Fluvio team working across hydrology, environmental science, carbon, spatial analysis and data systems.',
    eyebrow: 'Team',
    title: 'Many disciplines. One environmental practice.',
    lede: 'Specialists working together across field science, environmental systems and applied technology.',
    heroImageAlt: 'Fluvio specialists working together in the field',
    directoryTitle: 'People behind the work',
    directoryIntro:
      'The team brings research, industry and regional experience to complex water, climate and environmental challenges.',
    contactTitle: 'Bring the right mix of expertise to your project.',
    contactIntro: 'Tell us about the system, place or decision your team is working through.',
    viewProfile: 'View profile',
  },

  contactPage: {
    metaTitle: 'Contact',
    metaDescription: 'Start a conversation with Fluvio about a water, environmental or climate project.',
    eyebrow: 'Contact',
    title: 'Start with the place, problem and decision.',
    lede: 'Tell us about the water, environmental or climate challenge your team is working through.',
    heroImageAlt: 'A river landscape viewed from above',
    enquiryTitle: 'Project enquiry',
    enquiryBody:
      'Include the project location, the environmental system involved and the decision or operational need you want to support.',
    enquiryAction: 'Open a project enquiry',
    enquirySubject: 'Project enquiry for Fluvio',
    enquiryTemplate: 'Project location:\n\nEnvironmental system:\n\nDecision or operational need:\n\nProject context:',
    enquiryNote:
      'This opens a draft in your email application. Nothing is submitted through this website, and the archived site does not provide a public direct email address.',
    socialTitle: 'Follow Fluvio',
    socialBody: 'See company updates and current work through the verified Fluvio company page.',
    socialAction: 'Fluvio on LinkedIn',
  },

  projectsPage: {
    metaTitle: 'Projects',
    metaDescription:
      'Explore Fluvio projects in hydrological monitoring, water resource management, environmental assessment and applied data systems.',
    eyebrow: 'Projects',
    title: 'Field intelligence for complex environmental systems.',
    lede: 'We combine practical field science, monitoring technology and data systems to help communities, governments and industry make better decisions about water and climate.',
    featuredLabel: 'Featured project',
    listEyebrow: 'Selected work',
    listTitle: 'Across catchments, coastlines and communities',
    listIntro: 'Nine projects, each shaped by its place, partners and operational realities.',
    allProjects: 'All projects',
    platformsEyebrow: 'Platforms',
    platformsTitle: 'Environmental data, ready to use',
    platformsIntro:
      'Purpose-built tools turn monitoring networks into information that teams can understand and act on.',
  },

  projectDetail: {
    back: 'All projects',
    eyebrow: 'Project',
    challenge: 'Challenge',
    approach: 'Approach',
    outcome: 'Outcome',
    storyLabel: 'Project story',
    galleryLabel: 'Project gallery',
    imageLabel: 'image',
    relatedExpertiseEyebrow: 'Related expertise',
    relatedExpertiseTitle: 'Capabilities behind the work',
    relatedProjectsEyebrow: 'Continue exploring',
    relatedProjectsTitle: 'Related projects',
    contactEyebrow: 'Work with us',
    contactTitle: 'Need a project shaped around your environment?',
    contactIntro:
      'We build monitoring and decision systems around real places, practical constraints and the people who use them.',
  },

  project: {
    viewProject: 'View project',
    readProject: 'Read the project',
    featuredEyebrow: 'Featured project',
    location: 'Location',
    timeframe: 'Timeframe',
    disciplines: 'Disciplines',
    partners: 'Partners',
  },

  contactPanel: {
    eyebrow: 'Start a conversation',
    title: 'Have a water, environmental or climate challenge?',
    intro:
      'Tell us what you are working through. We will bring the right mix of field, science and technology expertise to the conversation.',
    action: 'Contact Fluvio',
  },
};

export type Catalog = typeof en;

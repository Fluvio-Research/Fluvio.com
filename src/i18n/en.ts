/**
 * English catalog. This object defines the canonical string shape; the French
 * and Spanish catalogs are typed against it so no string can be left
 * untranslated.
 */
export const en = {
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

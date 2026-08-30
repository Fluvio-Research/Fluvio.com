import type { Project } from './types';

export const projects: Project[] = [
  {
    title: 'Next generation autonomous water monitoring systems',
    slug: 'advance-queensland',
    summary: 'Refining a computer vision stream gauging system to become a commercially available product.',
    location: 'Queensland, Australia',
    timeframe: '2024 - Current',
    disciplines: ['Hydrological monitoring', 'Computer vision'],
    heroImage: '~/assets/images/fluvio/project-advance-queensland.jpeg',
    heroAlt: 'Installation of a computer vision stream gauging system',
    challenge: [
      'Fluvio has secured an Advance Queensland grant to refine its computer vision stream gauging system (CVSG) to become a commercially available product.',
    ],
    approach: [
      'This project will refine the existing camera prototype to establish a cost-effective method for measuring water flows and velocity.',
      'Key milestones include validation across a broad range of waterways in Queensland with targeted deployments, developing a real-time water quality loads monitoring system, and providing a cloud-based archive system for operational personnel.',
    ],
    outcome: [
      'This significantly improves the quantity of data collected and reduces safety risks associated with traditional methods for gauging flow events.',
    ],
    featured: true,
    relatedProjects: ['tina', 'bina'],
  },
  {
    title: 'Hydrological monitoring of potential water sources',
    slug: 'bina',
    summary:
      'Collecting continuous hydrological data to identify a reliable and sustainable water source for the Bina Harbour Development Project.',
    location: 'Bina Harbour, Solomon Islands',
    timeframe: '2025 - Current',
    disciplines: ['Hydrological monitoring', 'Water quality monitoring'],
    heroImage: '~/assets/images/fluvio/project-bina.jpeg',
    heroAlt: 'Flow gauging in the Loaloana Stream',
    challenge: [
      'The Bina Harbour Development Project requires a reliable and clean water source to meet immediate and long-term demand for its tuna processing facility.',
    ],
    approach: [
      'Fluvio has been engaged to collect 12 months of continuous hydrological data at three sites using computer-vision stream-gauging systems, real-time water-quality monitoring stations, and manual gauging.',
    ],
    outcome: [
      'The monitoring delivers data at five-minute intervals to identify a reliable and sustainable water source for the processing plant’s immediate and future operational needs.',
    ],
    relatedProjects: ['tina', 'monitoring-honiara'],
  },
  {
    title: 'Hydrological monitoring of Greater Honiara',
    slug: 'monitoring-honiara',
    summary:
      'Hydrological monitoring and catchment investigations supporting climate-resilient water supply and sanitation services in Greater Honiara.',
    location: 'Honiara, Solomon Islands',
    timeframe: '2022 - Current',
    disciplines: ['Hydrological monitoring', 'Catchment investigations', 'Water quality monitoring'],
    partners: ['Solomon Water'],
    heroImage: '~/assets/images/fluvio/project-honiara.jpeg',
    heroAlt: 'Routine water quality monitoring in the Honiara reticulation network',
    challenge: [
      'Only 55% of the greater Honiara population has access to the public water supply system, and less than 10% is connected to the Honiara sewerage network.',
    ],
    approach: [
      'Fluvio has undertaken hydrological monitoring and catchment investigations, including real-time water quality monitoring systems, operational data dashboards with alerting capabilities, automation of existing monitoring activities, and expansion into provisional water sources.',
    ],
    outcome: [
      'All work has been delivered alongside Solomon Water staff with the aim to build local capacity to support the project into the future.',
    ],
    featured: true,
    relatedProjects: ['wrd', 'bina'],
  },
  {
    title: 'Greenhouse gas emissions for reservoirs',
    slug: 'ghg-emissions-reservoirs',
    summary: 'Assessing greenhouse gas emissions from extensive flooded land assets.',
    location: 'Australia wide',
    timeframe: '2024 - Current',
    disciplines: ['Greenhouse gas assessment', 'Methane emissions'],
    heroImage: '~/assets/images/fluvio/project-ghg-reservoirs.jpg',
    heroAlt: 'Methane chambers measuring ebullitive emission rates',
    challenge: [
      'Freshwater systems emit substantial volumes of greenhouse gases, particularly methane, and therefore contribute meaningfully to global emissions.',
    ],
    approach: [
      'Fluvio has completed detailed assessments using IPCC Tier 1 and Tier 2 methodologies, alongside targeted work on field-based verification approaches for monitoring degassing pathways and downstream emissions from run-of-river systems.',
    ],
    outcome: [
      'Fluvio has demonstrated strong expertise in quantifying methane emissions and applying globally recognised assessment frameworks.',
    ],
    relatedProjects: ['reservoir-sedimentation'],
  },
  {
    title: 'Data management system design and training',
    slug: 'wrd',
    summary: 'Developing the Solomon Islands Water Information System for the Water Resources Division.',
    location: 'Honiara, Solomon Islands',
    timeframe: '2025 - 2026',
    disciplines: ['Data management', 'Hydrology', 'Training'],
    partners: ['Water Resources Division'],
    heroImage: '~/assets/images/fluvio/project-wrd-field.jpg',
    heroAlt: 'Flow gauging with the Water Resources Division on the Mataniko River',
    gallery: [{ src: '~/assets/images/fluvio/project-wrd-workshop.jpg', alt: 'Water data management workshop' }],
    challenge: [
      'The Water Resources Division maintained a largely unstructured and inaccessible archive of historical hydrological data, limiting its operational effectiveness.',
    ],
    approach: [
      'Through a participatory co-designed approach, Fluvio developed SIWIS, an innovative and sustainable pilot data management system, and delivered training on GIS, hydrology, data collection, data storage, and data security.',
    ],
    outcome: [
      'The SIWIS platform enhances the Water Resources Division’s ability to collect, securely store, and meaningfully analyse hydrological data to support evidence-based water management decisions.',
    ],
    relatedProjects: ['monitoring-honiara'],
  },
  {
    title: 'Hydrological monitoring of Tina Hydro',
    slug: 'tina',
    summary: 'Hydrological and sediment monitoring for the Tina River Hydro Development Project.',
    location: 'Tina River, Solomon Islands',
    timeframe: '2025 - Current',
    disciplines: ['Hydrological monitoring', 'Sediment monitoring'],
    heroImage: '~/assets/images/fluvio/project-tina.jpeg',
    heroAlt: 'Hydrological monitoring of Tina Hydro',
    gallery: [
      {
        src: '~/assets/images/fluvio/project-tina-station.png',
        alt: 'A real-time monitoring station deployed on the Tina River',
        caption: 'A real time monitoring station deployed on the Tina River.',
      },
    ],
    challenge: [
      'The Tina River Hydro Development Project requires energy calculations based on sediment loads, flow ratings, and mean flow.',
    ],
    approach: [
      'Fluvio has completed hydrological and sediment monitoring using computer vision stream gauging systems, real-time water level stations, real-time water quality stations, sediment analysis, and manual gauging.',
    ],
    outcome: [
      'Bespoke power and communication solutions have been developed to ensure reliability in a remote and complex environment.',
    ],
    featured: true,
    relatedProjects: ['bina', 'advance-queensland'],
  },
  {
    title: 'MV Solomon Trader grounding and oil spill environmental damage assessment',
    slug: 'sol-trader-oil-spill',
    summary: 'Environmental impact assessments of the MV Solomon Trader grounding and oil spill event.',
    location: 'Rennell Island, Solomon Islands',
    timeframe: '2019 and 2025',
    disciplines: ['Environmental impact assessment', 'Ecology assessment'],
    heroImage: '~/assets/images/fluvio/project-sol-trader.jpg',
    heroAlt: 'Travelling to the grounding site in Kangava Bay',
    gallery: [
      { src: '~/assets/images/fluvio/project-sol-trader-aerial.png', alt: 'Aerial view of the coastal environment' },
    ],
    challenge: [
      'Following the release of over 300 tonnes of heavy fuel oil onto the shallow fringing reef and marine environment of Kagava Bay, an intensive clean-up operation was conducted from early March to 26 July 2019.',
    ],
    approach: [
      'On behalf of the Solomon Islands Government, Fluvio conducted environmental impact assessments in 2019 and 2025, including shoreline terrestrial, sediment, benthic, and ecology assessments.',
    ],
    outcome: [
      'The findings have been categorised to understand the impacts of the incident on the surrounding environment.',
    ],
    relatedProjects: ['cordap'],
  },
  {
    title: 'Clean Reefs: dynamic pollution mapping',
    slug: 'cordap',
    summary: 'Developing a global, open-source pollution mapping and risk assessment tool for coral reefs.',
    location: 'Globally',
    timeframe: '2024 - Current',
    disciplines: ['Pollution mapping', 'Risk assessment'],
    heroImage: '~/assets/images/fluvio/project-cordap.jpeg',
    heroAlt: 'A sediment plume seen in the Solomon Islands',
    challenge: [
      'Pollution from land-based sources poses a significant threat to reef health globally, affecting over 30% of coral reefs, while available tools are largely inaccessible or unsuitable for decision-making.',
    ],
    approach: [
      'The CLEAN REEFS project is developing a web-based application that provides near-real-time data on pollution sources, exposure, and dispersal patterns.',
    ],
    outcome: [
      'The tool will support on-the-ground conservation in Fiji and the Solomon Islands and create a globally adaptable tool for coral reef communities worldwide.',
    ],
    relatedProjects: ['sol-trader-oil-spill'],
  },
  {
    title: 'Reservoir sedimentation studies',
    slug: 'reservoir-sedimentation',
    summary: 'Identifying and quantifying sedimentation rates within a reservoir.',
    location: 'Australia',
    timeframe: '2024 - 2025',
    disciplines: ['Sedimentation monitoring', 'Field survey'],
    heroImage: '~/assets/images/fluvio/project-reservoir-sedimentation.jpeg',
    heroAlt: 'Two sediment cores collected from lake beds',
    challenge: [
      'Sedimentation occurs frequently in dams, decreasing their capacity, and increased rates can result in operational challenges.',
    ],
    approach: [
      'The study used an initial field survey with a freefall penetrometer, a follow-up coring survey, in-situ sedimentation arrays, event monitoring nodes at major inflow points, and a visual shoreline assessment.',
    ],
    outcome: [
      'The field program identifies and quantifies sedimentation rates and defines reservoir drawdown sediment dynamics.',
    ],
    relatedProjects: ['ghg-emissions-reservoirs'],
  },
];

export const featuredProjects = projects.filter(({ featured }) => featured);
export const getProjectBySlug = (slug: string) => projects.find((project) => project.slug === slug);

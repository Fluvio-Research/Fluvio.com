import type { ExpertiseArea } from './types';

export const expertiseAreas: ExpertiseArea[] = [
  {
    title: 'Innovative hydrological monitoring',
    slug: 'hydrological-monitoring',
    summary: 'Developing and applying a cutting-edge hydrological monitoring system using computer vision.',
    description: [
      'This system improves safety and efficiency by utilising non-contact sensors and real-time analysis to monitor velocity and discharge of river systems.',
    ],
    image: '~/assets/images/fluvio/expertise-stream-monitoring.jpg',
    imageAlt: 'Hydrological monitoring in a stream',
    relatedProjects: ['tina', 'bina', 'advance-queensland'],
  },
  {
    title: 'Island-scale and catchment modelling',
    slug: 'island-scale-modelling',
    summary: 'Creating a pioneering global-scale coastal pollution transport model.',
    description: [
      'This innovative tool leverages earth observation and cloud computing to support integrated land-sea planning and restoration efforts.',
    ],
    image: '~/assets/images/fluvio/expertise-coastal-model.png',
    imageAlt: 'Coastal pollution transport model',
    relatedProjects: ['cordap'],
  },
  {
    title: 'Catchment and water resource management',
    slug: 'catchment-management',
    summary: 'Understanding catchment-waterway-ocean linkages with government, community and industry.',
    description: [
      'We work with government, community and industry to understand catchment-waterway-ocean linkages, with a strong focus on balancing community needs and environmental benefits.',
    ],
    image: '~/assets/images/fluvio/vision-field-team.jpeg',
    imageAlt: 'Field team at work',
    relatedProjects: ['monitoring-honiara', 'wrd'],
  },
  {
    title: 'Blue carbon and greenhouse gas assessment',
    slug: 'blue-carbon-assessment',
    summary: 'Quantifying carbon stocks within mangrove and seagrass ecosystems across Melanesia.',
    description: [
      'Working with community, government and regional bodies to quantify carbon stocks within mangrove and seagrass ecosystems across Melanesia.',
    ],
    image: '~/assets/images/fluvio/project-sol-trader-aerial.png',
    imageAlt: 'Coastal environment',
    relatedProjects: ['sol-trader-oil-spill'],
  },
  {
    title: 'Operational monitoring systems',
    slug: 'operational-monitoring',
    summary: 'Digitising water monitoring with state-owned water utilities.',
    description: [
      'By integrating real-time monitoring systems, cloud databases and alerting systems we have reduced response times to critical water quality incidents.',
    ],
    image: '~/assets/images/fluvio/project-honiara.jpeg',
    imageAlt: 'Water quality monitoring',
    relatedProjects: ['monitoring-honiara', 'wrd'],
  },
  {
    title: 'Sediment transport and reservoir assessment',
    slug: 'sediment-loading',
    summary: 'Monitoring and mapping sediment loads into coastal environments.',
    description: [
      'Integrating a diverse set of tools including nutrient flux incubations, physical sampling, particle size and penetrometer surveys.',
    ],
    image: '~/assets/images/fluvio/project-reservoir-sedimentation.jpeg',
    imageAlt: 'Reservoir sedimentation field work',
    relatedProjects: ['tina', 'ghg-emissions-reservoirs', 'reservoir-sedimentation'],
  },
];

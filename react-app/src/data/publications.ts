export type Publication = {
  id: string
  title: string
  authors: string
  venue: string
  status: string
  statusColor: 'blue' | 'green' | 'amber'
  abstract: string
  tags: string[]
}

export type Presentation = {
  id: string
  title: string
  venue: string
  type: string
  status: string
  statusColor: 'blue' | 'green' | 'amber'
  description: string
}

export type Collaborator = {
  name: string
  logo: string
  alt: string
}

export const publications: Publication[] = [
  {
    id: 'jacs-au-triblock',
    title:
      'A Robotic High-Throughput Grid-Search Platform for Mapping Phase Behavior in Triblock Copolymer\u2013Homopolymer Blends',
    authors:
      'Saroj Upreti, Lan Xu, Md. Moniruzzaman, Yunfei Wang, Kailash Adhikari, Sabin Baral, Derek Patton, Boran Ma, Jie Xu, Ruipeng Li, Chenhui Zhu, Wenjie Xia, Xiaodan Gu*',
    venue: 'JACS Au',
    status: 'Under Review',
    statusColor: 'blue',
    abstract:
      'Systematically mapped the phase behavior and Order\u2013Disorder Transition (ODT) boundaries for triblock copolymer (PS-b-PB-b-PS and PS-b-PI-b-PS) blends using the NOVA robotic platform. Investigated domain spacing evolution across three molecular weight regimes (wet-brush, dry-brush, and macrophase separation) using GISAXS and AFM, supported by coarse-grained molecular dynamics simulations to confirm homopolymer distribution.',
    tags: ['Block copolymers', 'GISAXS', 'AFM', 'Robotics', 'MD simulations'],
  },
]

export const presentations: Presentation[] = [
  {
    id: 'acs-spring-2026',
    title: 'ACS Spring 2026 National Meeting',
    venue: 'ACS',
    type: 'Poster Presentation',
    status: 'March 2026',
    statusColor: 'green',
    description:
      'Presenting research on robotic grid-search methodologies and automated workflows for accelerated polymer morphology studies.',
  },
]

export const collaborators: Collaborator[] = [
  { name: 'USM Polymer Science', logo: '/assets/USM.png', alt: 'USM' },
  { name: 'LBNL / ALS', logo: '/assets/LBNL.jpg', alt: 'LBNL' },
  { name: 'Argonne / NST', logo: '/assets/ANL.png', alt: 'ANL' },
  { name: 'Brookhaven / NSLS-II', logo: '/assets/BNL.png', alt: 'BNL' },
]

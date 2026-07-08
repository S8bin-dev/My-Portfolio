export type ProjectCategory = 'automation' | '3d-printing' | 'materials'

export type ProjectModalSection = {
  heading: string
  body?: string
  bullets?: string[]
}

export type ProjectGalleryItem = {
  src: string
  alt: string
  caption: string
}

export type ProjectLink = {
  label: string
  href: string
}

export type Project = {
  id: string
  title: string
  period: string
  summary: string
  category: ProjectCategory
  metrics?: { label: string; value: string }[]
  tags: string[]
  heroImage?: string
  modalImage?: string
  modalSections?: ProjectModalSection[]
  gallery?: ProjectGalleryItem[]
  links?: ProjectLink[]
  codeSnippet?: string
  hardwareStack?: string[]
}

export const projects: Project[] = [
  {
    id: 'autonomous-lab',
    title: 'Autonomous Lab: End-to-End Robotic Orchestration',
    period: 'Nov 2025 – Present',
    summary:
      'Full-stack orchestration of robots, motion stages, and instruments to run closed-loop polymer experiments with minimal human intervention.',
    category: 'automation',
    metrics: [
      { label: 'Robotic integration', value: 'Full' },
      { label: 'Loop type', value: 'Closed' },
    ],
    tags: ['Python', 'Robotics', 'Async control', 'Instrument APIs'],
    heroImage: '/assets/autonomous_workflow.png',
    modalImage: '/assets/autonomous_workflow_HD.png',
    codeSnippet: `for experiment in workflow:
    robot.pick(sample)
    stage.move_to(experiment.position)
    spectrometer.measure_thickness()
    smu.sweep_voltage()
    datastore.log(experiment, curves)
    robot.store(sample)`,
    hardwareStack: ['N9 Robotics', 'Thorlabs Stages', 'Ossila SMU', 'Flame Spectrometer', 'Python', 'Async I/O'],
    modalSections: [
      {
        heading: 'Laying the "Walking Blocks"',
        body: 'A true closed-loop system requires mastering individual instrument control first. By developing custom Python drivers, I created a Hardware Abstraction Layer (HAL) that coordinates disparate hardware—originally designed as standalone units—into a single, unified laboratory ecosystem.',
      },
      {
        heading: 'The Integrated Autonomous Loop',
        bullets: [
          'Fabrication — The N9 Robot autonomously executes polymer solution deposition, spin-coating, and thermal annealing.',
          'Transfer — The robot moves the sample to the Thorlabs vertical stage for precise height adjustments.',
          'Characterization — The system triggers the Spectrometer to determine film thickness followed by the Ossila SMU for I-V curves and conductivity measurement.',
          'Storage — Upon completion, the N9 Robot autonomously retrieves the sample and places it in the storage garage.',
        ],
      },
    ],
    links: [
      { label: 'Flame Spectrometer Repo', href: 'https://github.com/S8bin-dev/Osilla-Flame-Spectrometer' },
      { label: 'Thorlabs Stage Repo', href: 'https://github.com/S8bin-dev/Thor-Labs-Linear-Stage' },
      { label: 'Automated Probing Repo', href: 'https://github.com/S8bin-dev/AutomatedProbing' },
      { label: 'Ossila SMU Repo', href: 'https://github.com/S8bin-dev/Osilla-SMU' },
    ],
    gallery: [
      { src: '/assets/spectrometer_setup.jpg', alt: 'Spectrometer Setup', caption: 'Spectrometer Setup' },
      { src: '/assets/stage_contact.jpg', alt: 'Stage & SMU Setup', caption: 'Stage & SMU Setup' },
    ],
  },
  {
    id: 'high-throughput-bcp',
    title: 'High Throughput Block Copolymer Thin Film Fabrication and Characterization',
    period: 'May 2025 – Present',
    summary:
      'Designed and executed experimental workflows for fabricating and characterizing block copolymer thin films at scale using synchrotron X-ray scattering.',
    category: 'materials',
    metrics: [
      { label: 'Time reduction', value: '40%' },
      { label: 'Samples created', value: '1000+' },
    ],
    tags: ['Block copolymers', 'GIWAXS', 'GISAXS', 'AFM', 'Python'],
    heroImage: '/assets/project-1.png',
    modalImage: '/assets/project-1_HD.png',
    modalSections: [
      {
        heading: 'Project Overview',
        body: 'This research focuses on developing efficient methodologies for fabricating and characterizing block copolymer thin films at scale. Block copolymers self-assemble into nanoscale structures with applications in next-generation semiconductor manufacturing, filtration membranes, and energy storage devices.',
      },
      {
        heading: 'My Role & Responsibilities',
        bullets: [
          'Sample preparation using spin-coating and thermal annealing techniques',
          'Conducting GIWAXS and GISAXS measurements at synchrotron facilities',
          'Data analysis and pattern interpretation using IgorPro and Python',
          'Developing automated processing scripts to handle large datasets',
        ],
      },
      {
        heading: 'Techniques & Methods',
        bullets: [
          'Grazing-Incidence Wide-Angle X-ray Scattering (GIWAXS) — Crystalline structure analysis',
          'Grazing-Incidence Small-Angle X-ray Scattering (GISAXS) — Morphology characterization',
          'Atomic Force Microscopy (AFM) — Surface topography imaging',
          'Thermal Analysis — DSC and TGA for phase behavior studies',
          'Computational Tools — MATLAB and Python for data processing and visualization',
        ],
      },
      {
        heading: 'Results & Outcomes',
        body: 'Developed a streamlined workflow that reduced characterization time by 40% while maintaining data quality. Identified key processing parameters that influence domain spacing and orientation. Currently preparing 300+ thin film samples for our next beamtime at ALS or NSLS.',
      },
    ],
    links: [
      { label: 'Lab Group Website', href: 'https://xiaodangu.wixsite.com/guresearchgroup/research' },
    ],
  },
  {
    id: 'organic-solar-cells',
    title: 'Fabrication and Thermal Stability Analysis of Organic Solar Cells',
    period: 'Jan 2025 – May 2025',
    summary:
      'Investigated the thermal stability of polymer-based solar cells, addressing key challenges limiting commercial viability of organic photovoltaics.',
    category: 'materials',
    metrics: [
      { label: 'Efficiency boost', value: '15%' },
      { label: 'Devices tested', value: '100+' },
    ],
    tags: ['OPV', 'AFM', 'TGA', 'DSC', 'J-V characterization'],
    heroImage: '/assets/project-2.png',
    modalImage: '/assets/project-2_HD.png',
    modalSections: [
      {
        heading: 'Project Overview',
        body: 'Organic photovoltaics (OPVs) offer a promising pathway to sustainable energy with advantages like flexibility, low-cost manufacturing, and tunable optical properties. This project investigated the thermal stability of polymer-based solar cells, addressing one of the key challenges limiting their commercial viability.',
      },
      {
        heading: 'My Role & Responsibilities',
        bullets: [
          'Fabricating organic solar cells using solution processing and vacuum deposition techniques',
          'Conducting accelerated aging studies under controlled temperature conditions',
          'Measuring current-voltage characteristics and power conversion efficiency',
          'Performing morphological analysis using AFM to track structural changes',
          'Analyzing thermal stability using TGA and DSC and X-ray techniques',
          'Correlating performance degradation with structural and compositional changes',
        ],
      },
      {
        heading: 'Techniques & Methods',
        bullets: [
          'Device Fabrication — Spin coating, thermal evaporation, and encapsulation',
          'J-V Characterization — Solar simulator and source meter measurements',
          'Atomic Force Microscopy (AFM) — Surface morphology and phase separation analysis',
          'Thermal Analysis — TGA for decomposition temperature, DSC for glass transition',
          'UV-Vis Spectroscopy — Absorption spectra and optical bandgap determination',
        ],
      },
      {
        heading: 'Results & Outcomes',
        body: 'Identified critical temperature thresholds beyond which device performance degrades significantly. Discovered that morphological stability of the active layer is a primary factor in thermal degradation. Proposed optimized annealing protocols that improve initial efficiency while maintaining better long-term stability.',
      },
    ],
    links: [
      { label: 'Research Poster', href: '/assets/researchpos2.png' },
      { label: 'Lab Website', href: 'https://www.usm.edu/polymer-science-engineering/optoelec_device_lab.php' },
    ],
  },
  {
    id: '3d-printing-lab',
    title: 'Real World Problem Solving Through 3D Printing',
    period: 'Dec 2024 – Present',
    summary:
      'Custom 3D-printed interfaces that bridge the gap between standard laboratory equipment and advanced robotic systems for high-throughput research.',
    category: '3d-printing',
    metrics: [
      { label: 'Solutions created', value: '20+' },
      { label: 'Printing hours', value: '500+' },
    ],
    tags: ['AutoCAD', 'OpenSCAD', 'FDM', 'PLA', 'PETG', 'Lab infrastructure'],
    heroImage: '/assets/project-3.png',
    modalImage: '/assets/project-3_HD.png',
    gallery: [
      { src: '/assets/ossila_mount.jpg', alt: 'Ossila Automated Mount', caption: 'Ossila Four-Point Probe Automated Mount' },
      { src: '/assets/n9_holder.jpg', alt: 'North Robotics N9 Holder', caption: 'North Robotics N9 Drop Cast Holder' },
      { src: '/assets/1.5 by 1.5 thinfilmholderwithlid.png', alt: '1.5 by 1.5 Thin Film Holder', caption: '1.5" × 1.5" Thin Film Holder with Lid' },
      { src: '/assets/Thinfilmholderfordifferentdimension.png', alt: 'Thin Film Holder', caption: '2" × 1" and 2" × 2" Thin Film Holders' },
      { src: '/assets/Loadcellcover.png', alt: 'Load Cell Cover', caption: 'Load Cell Protective Cover (UTM)' },
      { src: '/assets/loadcellmount2.png', alt: 'Load Cell Mount', caption: 'Load Cell Mount - Design 2' },
      { src: '/assets/pipetteholder2.png', alt: 'Pipette Holder', caption: 'Pipette Holder - Lab Bench Design' },
      { src: '/assets/robosoccerbot.png', alt: 'Robo Soccer Bot', caption: 'Robo Soccer Bot - Ball Handler' },
      { src: '/assets/Vileholer.png', alt: 'Vial Holder', caption: 'Custom Vial Holder System' },
    ],
    modalSections: [
      {
        heading: 'Project Overview',
        body: 'This project evolved from solving everyday laboratory inconveniences to engineering critical infrastructure for automated research workflows. By leveraging additive manufacturing, I design and fabricate custom interfaces that bridge the gap between standard laboratory equipment and advanced robotic systems.',
      },
      {
        heading: 'Example Applications',
        bullets: [
          'Ossila Four-Point Probe Automated Mount — Precision bracket onto Thorlabs KVS30/M stage, enabling fully automated conductivity measurements via Python.',
          'North Robotics N9 Drop Cast Holder — Custom platform replacing the wafer garage, repurposing a high-end robot for thin-film drop-casting.',
          'High-Capacity Thin-Film Sample Holders — 500% increase in capacity (100 samples vs 20) within the same footprint.',
          'UTM Protective Cover — Custom-fitted housing protecting sensitive mechanics from dust and splashes during wet testing.',
          'Lab Hood Edge-Mount Pipette Holder — Space-saving C-port clip for fume hood lips, improving workflow and airflow.',
          'Robosoccer Competition Attachments — Two-part pusher/plow and protective housing, turning a base robot into a champion.',
        ],
      },
      {
        heading: 'Techniques & Methods',
        bullets: [
          'CAD Design — AutoCAD for complex geometries, OpenSCAD for parametric modeling',
          '3D Printing — FDM with PLA, PETG, and ABS materials',
          'Material Selection — Choosing polymers based on mechanical requirements',
          'Process Optimization — Print parameter tuning for quality and efficiency',
          'Iterative Design — Rapid prototyping and testing cycles',
        ],
      },
    ],
    links: [
      { label: 'Thingiverse Designs', href: 'https://www.thingiverse.com/Sabin-designs/designs' },
    ],
  },
]

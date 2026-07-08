export type SkillGroup = {
  id: string
  title: string
  icon: string
  skills: string[]
}

export const skillGroups: SkillGroup[] = [
  {
    id: 'characterization',
    title: 'Characterization Techniques',
    icon: '\u2622',
    skills: ['GIWAXS', 'GISAXS', 'AFM', 'DLS', 'TGA', 'DSC'],
  },
  {
    id: 'design',
    title: 'Design & Analysis',
    icon: '\u2699',
    skills: ['AutoCAD', 'OpenSCAD', 'ChemDraw', 'OriginPro'],
  },
  {
    id: 'manufacturing',
    title: '3D Printing & Manufacturing',
    icon: '\u2b22',
    skills: ['FDM Printing', 'PLA / PETG / ABS', 'Print Optimization', 'Parametric Design'],
  },
  {
    id: 'programming',
    title: 'Programming & Automation',
    icon: '\u276f',
    skills: ['Python', 'MATLAB', 'HTML / CSS', 'Instrument APIs', 'Lab Automation'],
  },
]

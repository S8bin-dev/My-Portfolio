import { Section } from '../layout/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Chip } from '../ui/Chip'
import { skillGroups } from '../../data/skills'

export function SkillsSection() {
  return (
    <Section id="skills" ariaLabel="Technical skills">
      <SectionHeading
        eyebrow="Technical Range"
        title="Skills across materials, CAD, and code"
      />

      <div className="skills-grid">
        {skillGroups.map((group) => (
          <article key={group.id} className="skill-group-card">
            <span className="skill-group-icon" aria-hidden="true">
              {group.icon}
            </span>
            <h3 className="skill-group-title">{group.title}</h3>
            <div className="skill-chips">
              {group.skills.map((skill) => (
                <Chip key={skill} label={skill} />
              ))}
            </div>
          </article>
        ))}
      </div>
    </Section>
  )
}

import { Section } from '../layout/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Chip } from '../ui/Chip'
import {
  publications,
  presentations,
  collaborators,
} from '../../data/publications'

const STATUS_COLORS: Record<string, string> = {
  blue: 'status-badge--blue',
  green: 'status-badge--green',
  amber: 'status-badge--amber',
}

export function PublicationsSection() {
  return (
    <Section id="publications" ariaLabel="Publications and presentations">
      <SectionHeading
        eyebrow="Academic Contributions"
        title="Publications & presentations"
      />

      <div className="pub-grid">
        {publications.map((pub) => (
          <article key={pub.id} className="pub-card pub-card--featured">
            <span
              className={[
                'status-badge',
                STATUS_COLORS[pub.statusColor],
              ].join(' ')}
            >
              {pub.status}: {pub.venue}
            </span>
            <h3 className="pub-title">{pub.title}</h3>
            <p className="pub-authors">{pub.authors}</p>
            <p className="pub-abstract">{pub.abstract}</p>
            <div className="pub-tags">
              {pub.tags.map((tag) => (
                <Chip key={tag} label={tag} />
              ))}
            </div>
          </article>
        ))}

        {presentations.map((pres) => (
          <article key={pres.id} className="pub-card">
            <span
              className={[
                'status-badge',
                STATUS_COLORS[pres.statusColor],
              ].join(' ')}
            >
              Upcoming: {pres.status}
            </span>
            <h3 className="pub-title">{pres.title}</h3>
            <p className="pub-meta">{pres.type}</p>
            <p className="pub-abstract">{pres.description}</p>
          </article>
        ))}
      </div>

      <div className="collab-strip">
        <p className="collab-label">Research conducted in collaboration with</p>
        <div className="collab-logos">
          {collaborators.map((c) => (
            <div key={c.name} className="collab-item">
              <img src={c.logo} alt={c.alt} className="collab-logo" loading="lazy" />
              <span className="collab-name">{c.name}</span>
            </div>
          ))}
        </div>
      </div>
    </Section>
  )
}

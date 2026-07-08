import { useState } from 'react'
import { Section } from '../layout/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Modal } from '../ui/Modal'
import { Lightbox, type LightboxItem } from '../ui/Lightbox'
import { Button } from '../ui/Button'
import { projects, type Project } from '../../data/projects'

function ProjectCard({ project, onLearnMore }: { project: Project; onLearnMore: () => void }) {
  const isAutomation = project.category === 'automation'

  return (
    <article className={`project-card ${isAutomation ? 'project-card--wide' : ''}`}>
      {isAutomation && project.codeSnippet ? (
        <div className="project-card-split">
          <div className="project-card-code">
            <pre className="code-snippet" aria-label="Python automation snippet">
              {project.codeSnippet}
            </pre>
            {project.hardwareStack && (
              <ul className="hw-stack">
                {project.hardwareStack.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            )}
          </div>
          <div className="project-card-info">
            <p className="project-card-period">{project.period}</p>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-summary">{project.summary}</p>
            {project.metrics && (
              <dl className="project-card-metrics">
                {project.metrics.map((m) => (
                  <div key={m.label} className="metric">
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <Button variant="ghost" size="sm" onClick={onLearnMore}>
              Learn more
            </Button>
          </div>
        </div>
      ) : (
        <>
          {project.heroImage && (
            <div className="project-card-media">
              <img src={project.heroImage} alt={project.title} loading="lazy" />
            </div>
          )}
          <div className="project-card-body">
            <p className="project-card-period">{project.period}</p>
            <h3 className="project-card-title">{project.title}</h3>
            <p className="project-card-summary">{project.summary}</p>
            {project.metrics && (
              <dl className="project-card-metrics">
                {project.metrics.map((m) => (
                  <div key={m.label} className="metric">
                    <dt>{m.label}</dt>
                    <dd>{m.value}</dd>
                  </div>
                ))}
              </dl>
            )}
            <ul className="project-card-tags">
              {project.tags.map((tag) => (
                <li key={tag}>{tag}</li>
              ))}
            </ul>
            <Button variant="ghost" size="sm" onClick={onLearnMore}>
              Learn more
            </Button>
          </div>
        </>
      )}
    </article>
  )
}

function ProjectModalContent({
  project,
  onOpenLightbox,
}: {
  project: Project
  onOpenLightbox: (index: number) => void
}) {
  return (
    <div className="project-modal">
      <h2 className="project-modal-title">{project.title}</h2>

      {project.modalImage && (
        <div className="project-modal-hero">
          <img src={project.modalImage} alt={project.title} loading="lazy" />
        </div>
      )}

      {project.modalSections?.map((sec) => (
        <div key={sec.heading} className="project-modal-section">
          <h3>{sec.heading}</h3>
          {sec.body && <p>{sec.body}</p>}
          {sec.bullets && (
            <ul>
              {sec.bullets.map((b, i) => (
                <li key={i}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}

      {project.gallery && project.gallery.length > 0 && (
        <div className="project-modal-section">
          <h3>Design Gallery</h3>
          <p className="gallery-hint">Click any image to view full size</p>
          <div className="gallery-grid">
            {project.gallery.map((item, i) => (
              <button
                key={item.src}
                type="button"
                className="gallery-thumb"
                onClick={() => onOpenLightbox(i)}
                aria-label={`View ${item.caption}`}
              >
                <img src={item.src} alt={item.alt} loading="lazy" />
                <span className="gallery-thumb-overlay">View</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {project.links && project.links.length > 0 && (
        <div className="project-modal-section">
          <h3>Links & Resources</h3>
          <div className="project-modal-links">
            {project.links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="project-modal-link"
              >
                {link.label} &#8599;
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export function ProjectsSection() {
  const [activeProject, setActiveProject] = useState<Project | null>(null)
  const [lightboxOpen, setLightboxOpen] = useState(false)
  const [lightboxIndex, setLightboxIndex] = useState(0)

  const openModal = (project: Project) => setActiveProject(project)
  const closeModal = () => setActiveProject(null)

  const openLightbox = (index: number) => {
    setLightboxIndex(index)
    setLightboxOpen(true)
  }

  const lightboxItems: LightboxItem[] =
    activeProject?.gallery?.map((g) => ({
      src: g.src,
      alt: g.alt,
      caption: g.caption,
    })) ?? []

  return (
    <Section id="projects" ariaLabel="Featured research and engineering projects">
      <SectionHeading eyebrow="Research & Engineering Work" title="Featured projects" />

      <div className="projects-grid">
        {projects.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            onLearnMore={() => openModal(project)}
          />
        ))}
      </div>

      <Modal
        isOpen={activeProject !== null}
        onClose={closeModal}
        ariaLabel={activeProject?.title}
      >
        {activeProject && (
          <ProjectModalContent
            project={activeProject}
            onOpenLightbox={openLightbox}
          />
        )}
      </Modal>

      <Lightbox
        items={lightboxItems}
        currentIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
        onNavigate={setLightboxIndex}
      />
    </Section>
  )
}

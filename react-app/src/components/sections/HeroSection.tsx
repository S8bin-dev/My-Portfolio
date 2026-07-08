import { Button } from '../ui/Button'
import { Section } from '../layout/Section'

export function HeroSection() {
  return (
    <Section id="hero" kind="hero" ariaLabel="Hybrid materials and automation overview">
      <div className="hero-grid">
        <div className="hero-copy">
          <p className="eyebrow">Polymer Science · Lab Automation</p>
          <h1>
            Bridging materials research
            <br />
            with autonomous laboratories.
          </h1>
          <p className="lede">
            I design and automate end-to-end experiments—from 3D-printed fixtures and CAD to Python-controlled
            robotics and characterization of functional polymers.
          </p>
          <div className="hero-highlights">
            <div className="highlight-pill">
              <span className="pill-dot" />
              Block copolymer self-assembly · GIWAXS / GISAXS · AFM
            </div>
            <div className="highlight-pill">
              <span className="pill-dot" />
              3D printed lab infrastructure · Python lab automation
            </div>
          </div>
          <div className="hero-actions">
            <Button as="a" href="#projects">
              View projects
            </Button>
            <Button
              as="a"
              variant="ghost"
              href="/assets/Sabin-Baral-Resume.pdf"
            >
              Download CV
            </Button>
          </div>
        </div>

        <aside className="hero-showcase" aria-label="Hybrid work overview">
          <div className="showcase-stack">
            <article className="showcase-card showcase-card--lab">
              <h2>Autonomous Lab Orchestration</h2>
              <p>
                Python-driven control of robots, motion stages, spectrometers and SMUs to build closed-loop materials
                workflows.
              </p>
              <dl>
                <div>
                  <dt>Hardware</dt>
                  <dd>N9 Robotics · Thorlabs · Ossila</dd>
                </div>
                <div>
                  <dt>Stack</dt>
                  <dd>Python · Instrument APIs · Async orchestration</dd>
                </div>
              </dl>
            </article>

            <article className="showcase-card showcase-card--printing">
              <h2>3D Printing & CAD</h2>
              <p>
                Custom fixtures and holders that turn off-the-shelf lab hardware into high-throughput research
                platforms.
              </p>
              <ul>
                <li>Thin-film sample carriers (5× throughput)</li>
                <li>Robotic end-effectors & precision mounts</li>
                <li>Parametric designs in AutoCAD / OpenSCAD</li>
              </ul>
            </article>

            <article className="showcase-card showcase-card--materials">
              <h2>Materials Research</h2>
              <p>
                Polymer thin films, organic photovoltaics, and phase behavior mapped with synchrotron X-ray scattering.
              </p>
              <ul>
                <li>High-throughput ODT mapping</li>
                <li>Thermal stability of organic solar cells</li>
                <li>Beamtime at ALS · NSLS-II · NST</li>
              </ul>
            </article>
          </div>
        </aside>
      </div>
    </Section>
  )
}


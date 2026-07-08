import { useState, type FormEvent } from 'react'
import { Section } from '../layout/Section'
import { SectionHeading } from '../ui/SectionHeading'
import { Button } from '../ui/Button'

type FormStatus = 'idle' | 'submitting' | 'success' | 'error'

export function ContactSection() {
  const [status, setStatus] = useState<FormStatus>('idle')

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')

    try {
      const form = e.currentTarget
      const data = new FormData(form)
      const res = await fetch('https://formspree.io/f/xqarlrdl', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      })

      if (res.ok) {
        setStatus('success')
        form.reset()
        setTimeout(() => setStatus('idle'), 6000)
      } else {
        setStatus('error')
      }
    } catch {
      setStatus('error')
    }
  }

  return (
    <Section id="contact" ariaLabel="Contact form">
      <SectionHeading
        eyebrow="Get in touch"
        title="Let's build something together"
      />

      <div className="contact-layout">
        {status === 'success' ? (
          <div className="contact-success">
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
              <polyline points="22 4 12 14.01 9 11.01" />
            </svg>
            <h3>Message sent!</h3>
            <p>Thank you for reaching out. I'll get back to you soon.</p>
          </div>
        ) : (
          <form className="contact-form" onSubmit={handleSubmit} noValidate>
            <div className="form-field">
              <label htmlFor="contact-name" className="sr-only">Your Name</label>
              <input
                id="contact-name"
                type="text"
                name="name"
                placeholder="Your Name"
                required
                autoComplete="name"
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-email" className="sr-only">Your Email</label>
              <input
                id="contact-email"
                type="email"
                name="email"
                placeholder="Your Email"
                required
                autoComplete="email"
              />
            </div>
            <div className="form-field">
              <label htmlFor="contact-message" className="sr-only">Your Message</label>
              <textarea
                id="contact-message"
                name="message"
                placeholder="Your Message"
                rows={5}
                required
              />
            </div>
            <Button
              type="submit"
              disabled={status === 'submitting'}
              className="contact-submit"
            >
              {status === 'submitting' ? 'Sending...' : 'Send message'}
            </Button>
            {status === 'error' && (
              <p className="form-error">
                Something went wrong. Please try again or email me directly.
              </p>
            )}
          </form>
        )}

        <div className="contact-alt">
          <p className="contact-divider-text">or reach me directly</p>
          <div className="contact-links">
            <a href="mailto:Sabin.Baral@usm.edu" className="contact-link">
              <span className="contact-link-icon" aria-hidden="true">&#9993;</span>
              Sabin.Baral@usm.edu
            </a>
            <a
              href="https://www.linkedin.com/in/baralsabin/"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon" aria-hidden="true">in</span>
              LinkedIn
            </a>
            <a
              href="https://github.com/S8bin-dev"
              target="_blank"
              rel="noopener noreferrer"
              className="contact-link"
            >
              <span className="contact-link-icon" aria-hidden="true">&lt;/&gt;</span>
              GitHub
            </a>
          </div>
        </div>
      </div>
    </Section>
  )
}

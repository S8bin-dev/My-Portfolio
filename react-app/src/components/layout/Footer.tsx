import { Container } from './Container'

export function Footer() {
  return (
    <footer className="site-footer">
      <Container>
        <div className="site-footer-inner">
          <p>© {new Date().getFullYear()} Sabin Baral. All rights reserved.</p>
        </div>
      </Container>
    </footer>
  )
}


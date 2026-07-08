import './App.css'
import { Layout } from './components/layout/Layout'
import { HeroSection } from './components/sections/HeroSection'
import { ProjectsSection } from './components/sections/ProjectsSection'
import { PublicationsSection } from './components/sections/PublicationsSection'
import { SkillsSection } from './components/sections/SkillsSection'
import { ContactSection } from './components/sections/ContactSection'

export function App() {
  return (
    <Layout>
      <HeroSection />
      <ProjectsSection />
      <PublicationsSection />
      <SkillsSection />
      <ContactSection />
    </Layout>
  )
}

export default App

import { LandingNavbar } from './LandingNavbar'
import { HeroSection } from './HeroSection'
import { StatsSection } from './StatsSection'
import { FeaturesSection } from './FeaturesSection'
import { TestimonialsSection } from './TestimonialsSection'
import { ContactSection } from './ContactSection'
import { LandingFooter } from './LandingFooter'

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <LandingNavbar />
      <HeroSection />
      <StatsSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
      <LandingFooter />
    </div>
  )
}

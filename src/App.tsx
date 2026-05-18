import { lazy, Suspense } from 'react';
import Navbar from './components/layout/Navbar';
import Hero from './components/sections/Hero';
import About from './components/sections/About';
import Projects from './components/sections/Projects';
import Background from './components/sections/Background';
import Contact from './components/sections/Contact';
import Footer from './components/layout/Footer';
import { ErrorBoundary } from './components/ui/ErrorBoundary';

const PageBird = lazy(() => import('./components/effects/PageBird'));

function App() {
  return (
    <>
      <ErrorBoundary fallback={null}>
        <Suspense fallback={null}>
          <PageBird />
        </Suspense>
      </ErrorBoundary>

      <Navbar />

      <main>
        <Hero />
        <ErrorBoundary
          title="About section unavailable"
          message="The about section could not be displayed. The rest of the site still works."
          compact
        >
          <About />
        </ErrorBoundary>
        <ErrorBoundary
          title="Projects section unavailable"
          message="Project previews failed to load. Try again or view projects on GitHub."
          compact
        >
          <Projects />
        </ErrorBoundary>
        <ErrorBoundary
          title="Background section unavailable"
          message="The timeline could not be displayed."
          compact
        >
          <Background />
        </ErrorBoundary>
        <ErrorBoundary
          title="Contact section unavailable"
          message="The contact form could not be loaded. Reach out via email from the navigation icons."
          compact
        >
          <Contact />
        </ErrorBoundary>
      </main>

      <Footer />
    </>
  );
}

export default App;

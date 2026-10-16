import About from './components/About';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Projects from './components/Projects';
import Stack from './components/Stack';
import './App.css';

/*
 * The page layout is fixed: two columns for the project, repository and toolkit
 * lists. It is set on `<html>` in index.html (ahead of the first paint) so the
 * grid never pops in; the values live in src/data/layout.ts. The panel that used
 * to arrange the page live — src/components/LayoutControls.tsx — is kept but
 * unmounted; adding `<LayoutControls />` back below brings the knobs back.
 */
export default function App() {
  return (
    <div className="portfolio">
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>

      <Header />

      <main id="main-content">
        <About />
        <Projects />
        <Stack />
        <Contact />
      </main>

      <Footer />
      <BackToTop />
    </div>
  );
}

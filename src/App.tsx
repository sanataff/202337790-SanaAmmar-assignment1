import About from './components/About';
import BackToTop from './components/BackToTop';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Header from './components/Header';
import Projects from './components/Projects';
import Stack from './components/Stack';
import './App.css';

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

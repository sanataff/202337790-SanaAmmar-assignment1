import { useEffect, useState } from 'react';
import { DrawablyButton, DrawablyToggle, DrawablyUnderline } from 'drawably/react';
import { useTheme } from '../hooks/useTheme';
import { scrollToId } from '../lib/scroll';
import MaskedText from './MaskedText';

const sections = [
  { id: 'about', label: 'About' },
  { id: 'projects', label: 'Work' },
  { id: 'stack', label: 'Toolkit' },
  { id: 'contact', label: 'Contact' },
];

/** Time-of-day greeting, refreshed while the page stays open. */
function greetingFor(date: Date): string {
  const hour = date.getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}

export default function Header() {
  const { theme, toggleTheme } = useTheme();
  const [greeting, setGreeting] = useState(() => greetingFor(new Date()));

  useEffect(() => {
    const id = window.setInterval(() => setGreeting(greetingFor(new Date())), 60_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <header className="intro" id="top">
      <nav className="topbar" aria-label="Primary">
        <a className="topbar__name" href="#top">
          <em className="serif">S</em>ana Ammar
        </a>

        <ul className="nav-links">
          {sections.map((section) => (
            <li key={section.id}>
              <a href={`#${section.id}`}>
                <DrawablyUnderline>{section.label}</DrawablyUnderline>
              </a>
            </li>
          ))}
        </ul>

        <label className="theme-switch">
          <DrawablyToggle checked={theme === 'dark'} onChange={toggleTheme} />
          <span className="theme-switch__label">Dark mode</span>
        </label>
      </nav>

      <div className="hero">
        <p className="hero__eyebrow">
          <span className="pulse" aria-hidden="true" />
          {greeting} — available for work
        </p>

        <h1 className="hero__title">
          <MaskedText>I am </MaskedText>
          <MaskedText delay={90}>
            Sana Ammar.
          </MaskedText>
        </h1>

        <p className="hero__lede">
         a designer, researcher and software builder. I care
          about making technology feel thoughtful, useful and easy to understand.
          <span className="caret" aria-hidden="true" />
        </p>

        <div className="hero__actions">
          <DrawablyButton onClick={() => scrollToId('projects')}>View work</DrawablyButton>
          <DrawablyButton variant="solid" onClick={() => scrollToId('contact')}>
            Get in touch
          </DrawablyButton>
        </div>
      </div>
    </header>
  );
}

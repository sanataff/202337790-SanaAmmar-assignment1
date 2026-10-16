import { useState } from 'react';
import { DrawablyList, DrawablyTabs } from 'drawably/react';
import MaskedText from './MaskedText';

type Group = {
  id: string;
  label: string;
  items: string[];
};

const groups: Group[] = [
  {
    id: 'frontend',
    label: 'Frontend',
    items: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Vite'],
  },
  {
    id: 'mobile',
    label: 'Mobile',
    items: ['React Native', 'Expo', 'Reanimated', 'Firebase'],
  },
  {
    id: 'design',
    label: 'Design',
    items: ['Figma', 'Prototyping', 'Design systems', 'User research'],
  },
];

export default function Stack() {
  const [active, setActive] = useState(0);
  const group = groups[active];

  return (
    <section id="stack" className="section">
      <div className="toolkit">
        <div className="toolkit__aside">
          <div className="section__head">
            <h2 className="section__title">
              <MaskedText>Toolkit</MaskedText>
            </h2>
            <span className="section__meta">What I build with</span>
          </div>

          <DrawablyTabs
            className="toolkit-tabs"
            aria-label="Toolkit groups"
            active={active}
          >
            {groups.map((item, index) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                id={`tab-${item.id}`}
                aria-controls={`panel-${item.id}`}
                className="tab"
                onClick={() => setActive(index)}
              >
                {item.label}
              </button>
            ))}
          </DrawablyTabs>
        </div>

        <div
          className="toolkit__panel"
          role="tabpanel"
          id={`panel-${group.id}`}
          aria-labelledby={`tab-${group.id}`}
        >
          <DrawablyList className="stack-list" marker="check" key={group.id}>
            {group.items.map((item, index) => (
              <li
                key={item}
                className="stack-item"
                style={{ animationDelay: `${index * 55}ms` }}
              >
                {item}
              </li>
            ))}
          </DrawablyList>
        </div>
      </div>
    </section>
  );
}

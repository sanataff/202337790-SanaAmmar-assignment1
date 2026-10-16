import { useMemo, useState } from 'react';
import {
  DrawablyBadge,
  DrawablyButton,
  DrawablyCard,
  DrawablyInput,
  DrawablyList,
  DrawablySelect,
  DrawablyTabs,
} from 'drawably/react';
import {
  categories,
  projects,
  sortOptions,
  type Project,
  type ProjectCategory,
  type SortOption,
} from '../data/projects';
import MaskedText from './MaskedText';

type CategoryFilter = 'All' | ProjectCategory;

export default function Projects() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('All');
  const [sort, setSort] = useState<SortOption>('featured');
  const [expanded, setExpanded] = useState<Set<string>>(new Set());

  const visibleProjects = useMemo(() => {
    const needle = query.trim().toLowerCase();

    const filtered = projects.filter((project) => {
      const matchesCategory = category === 'All' || project.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;

      const haystack = [project.title, project.summary, ...project.stack]
        .join(' ')
        .toLowerCase();
      return haystack.includes(needle);
    });

    return [...filtered].sort((a, b) => {
      switch (sort) {
        case 'newest':
          return b.year - a.year;
        case 'title':
          return a.title.localeCompare(b.title);
        case 'featured':
        default:
          return Number(b.featured) - Number(a.featured) || b.year - a.year;
      }
    });
  }, [query, category, sort]);

  const toggleExpanded = (id: string) => {
    setExpanded((current) => {
      const next = new Set(current);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const isFiltering = query.trim() !== '' || category !== 'All';
  const resetFilters = () => {
    setQuery('');
    setCategory('All');
    setSort('featured');
  };

  const listKey = visibleProjects.map((project) => project.id).join('-');

  return (
    <section id="projects" className="section">
      <div className="section__head">
        <h2 className="section__title">
          <MaskedText>Selected work</MaskedText>
        </h2>
        <DrawablyBadge className="section__meta" aria-live="polite">
          {visibleProjects.length} of {projects.length} projects
        </DrawablyBadge>
      </div>

      <div className="toolbar">
        <div className="field">
          <label htmlFor="project-search">Search</label>
          <DrawablyInput
            id="project-search"
            type="search"
            placeholder="Name or technology…"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            autoComplete="off"
          />
        </div>

        <div className="field field--sort">
          <label htmlFor="project-sort">Sort</label>
          <DrawablySelect
            id="project-sort"
            value={sort}
            onChange={(event) => setSort(event.target.value as SortOption)}
          >
            {sortOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </DrawablySelect>
        </div>

        <div className="filters">
          <DrawablyTabs
            className="filters__tabs"
            aria-label="Filter projects by category"
            active={categories.indexOf(category)}
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                role="tab"
                className="tab"
                onClick={() => setCategory(item)}
              >
                {item}
              </button>
            ))}
          </DrawablyTabs>

          {isFiltering && <DrawablyButton onClick={resetFilters}>Clear</DrawablyButton>}
        </div>
      </div>

      {visibleProjects.length > 0 ? (
        <DrawablyList className="work-list" marker="dash" key={listKey}>
          {visibleProjects.map((project) => (
            <ProjectRow
              key={project.id}
              project={project}
              isExpanded={expanded.has(project.id)}
              onToggle={() => toggleExpanded(project.id)}
            />
          ))}
        </DrawablyList>
      ) : (
        <DrawablyCard className="empty" role="status">
          <p className="empty__title">No projects found</p>
          <p className="empty__body">
            Nothing matches &ldquo;{query}&rdquo; in{' '}
            {category === 'All' ? 'any category' : category}. Try another search or
            clear the filters.
          </p>
          <DrawablyButton onClick={resetFilters}>Clear filters</DrawablyButton>
        </DrawablyCard>
      )}
    </section>
  );
}

type ProjectRowProps = {
  project: Project;
  isExpanded: boolean;
  onToggle: () => void;
};

function ProjectRow({ project, isExpanded, onToggle }: ProjectRowProps) {
  const detailsId = `project-details-${project.id}`;

  return (
    <li className="work-row">
      <div className="work-row__top">
        <h3 className="work-row__title">
          <a href={project.url} target="_blank" rel="noopener noreferrer">
            {project.title}
            <span className="work-row__arrow" aria-hidden="true">→</span>
          </a>
        </h3>

        <ul className="work-row__tags">
          {project.stack.map((tech) => (
            <li key={tech}>
              <DrawablyBadge>{tech}</DrawablyBadge>
            </li>
          ))}
        </ul>

        <DrawablyBadge className="work-row__year">{project.year}</DrawablyBadge>

        <DrawablyButton
          className="work-row__toggle"
          aria-expanded={isExpanded}
          aria-controls={detailsId}
          onClick={onToggle}
        >
          {isExpanded ? 'Hide' : 'Details'}
          <span className={`work-row__caret ${isExpanded ? 'is-open' : ''}`} aria-hidden="true">
            ⌄
          </span>
        </DrawablyButton>
      </div>

      <p className="work-row__summary">{project.summary}</p>

      <div id={detailsId} className={`work-row__details ${isExpanded ? 'is-open' : ''}`}>
        <div className="work-row__details-inner">
          <p>{project.details}</p>
        </div>
      </div>
    </li>
  );
}

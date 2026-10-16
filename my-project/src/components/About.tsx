import MaskedText from './MaskedText';
import WordsReveal from './WordsReveal';

export default function About() {
  return (
    <section id="about" className="section">
      <div className="section__head">
        <h2 className="section__title">
          <MaskedText>About</MaskedText>
        </h2>
      </div>

      <div className="about__body">
        <WordsReveal
          className="about__lead"
          text="I work at the intersection of designing digital experiences, researching AI, and building software — bringing the same care to a first sketch and a final commit."
        />
        <WordsReveal
          className="about__sub"
          text="I care about making technology feel thoughtful, useful, and easy to understand. The timing of a hover, the weight of a click, a layout that holds its shape on every screen."
        />
      </div>
    </section>
  );
}

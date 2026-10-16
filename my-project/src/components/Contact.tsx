import { useState, type FormEvent } from 'react';
import {
  DrawablyAlert,
  DrawablyButton,
  DrawablyInput,
  DrawablyList,
  DrawablyTextarea,
} from 'drawably/react';
import MaskedText from './MaskedText';
import Reveal from './Reveal';

type FormValues = {
  name: string;
  email: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const EMPTY: FormValues = { name: '', email: '', message: '' };
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

/** Pure validation so the rules stay easy to read and test. */
function validate(values: FormValues): FormErrors {
  const errors: FormErrors = {};

  if (values.name.trim().length < 2) {
    errors.name = 'Please enter your name (at least 2 characters).';
  }

  if (!values.email.trim()) {
    errors.email = 'Please enter your email so I can reply.';
  } else if (!EMAIL_PATTERN.test(values.email.trim())) {
    errors.email = 'That email address doesn’t look right.';
  }

  if (values.message.trim().length < 10) {
    errors.message = 'Please write a message of at least 10 characters.';
  }

  return errors;
}

type SendStatus = 'idle' | 'sending' | 'success';

/** Stand-in for a real backend call. */
function fakeSend(): Promise<void> {
  return new Promise((resolve) => window.setTimeout(resolve, 900));
}

const links = [
  { label: 'Email', value: 'sanataffor@gmail.com', href: 'mailto:sanataffor@gmail.com' },
  { label: 'LinkedIn', value: 'sana-ammar', href: 'https://www.linkedin.com/in/sana-ammar-b0491a1b2' },
  { label: 'GitHub', value: 'sanataff', href: 'https://github.com/sanataff' },
];

export default function Contact() {
  const [values, setValues] = useState<FormValues>(EMPTY);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<SendStatus>('idle');

  const updateField = (field: keyof FormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
    setErrors((current) => {
      if (!current[field]) return current;
      const next = { ...current };
      delete next[field];
      return next;
    });
  };

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      setStatus('idle');
      return;
    }

    setStatus('sending');
    await fakeSend();
    setValues(EMPTY);
    setStatus('success');
  };

  return (
    <section id="contact" className="section contact">
      <h2 className="contact__title">
        <MaskedText>Let&rsquo;s work</MaskedText>
        <MaskedText delay={90}>together.</MaskedText>
      </h2>

      <Reveal className="contact__intro">
        <p>Open to work and collaborations. Email is the fastest way to reach me.</p>
      </Reveal>

      {status === 'success' && (
        <DrawablyAlert className="contact-alert" role="status" aria-live="polite">
          <span data-tag>Sent</span>
          <span>
            Message sent — thank you! This demo form is front-end only, so nothing
            actually left your browser.
          </span>
        </DrawablyAlert>
      )}

      <form className="contact-form" onSubmit={handleSubmit} noValidate>
        <div className={`field ${errors.name ? 'field--error' : ''}`}>
          <label htmlFor="name">Name</label>
          <DrawablyInput
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            value={values.name}
            onChange={(event) => updateField('name', event.target.value)}
            stroke={errors.name ? 'var(--danger)' : undefined}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={errors.name ? 'name-error' : undefined}
          />
          {errors.name && (
            <p id="name-error" className="field__error" role="alert">
              {errors.name}
            </p>
          )}
        </div>

        <div className={`field ${errors.email ? 'field--error' : ''}`}>
          <label htmlFor="email">Email</label>
          <DrawablyInput
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            value={values.email}
            onChange={(event) => updateField('email', event.target.value)}
            stroke={errors.email ? 'var(--danger)' : undefined}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={errors.email ? 'email-error' : undefined}
          />
          {errors.email && (
            <p id="email-error" className="field__error" role="alert">
              {errors.email}
            </p>
          )}
        </div>

        <div className={`field ${errors.message ? 'field--error' : ''}`}>
          <label htmlFor="message">Message</label>
          <DrawablyTextarea
            id="message"
            name="message"
            rows={4}
            value={values.message}
            onChange={(event) => updateField('message', event.target.value)}
            stroke={errors.message ? 'var(--danger)' : undefined}
            aria-invalid={Boolean(errors.message)}
            aria-describedby={errors.message ? 'message-error' : undefined}
          />
          {errors.message && (
            <p id="message-error" className="field__error" role="alert">
              {errors.message}
            </p>
          )}
        </div>

        <DrawablyButton
          type="submit"
          variant="solid"
          state={status === 'sending' ? 'loading' : 'idle'}
          disabled={status === 'sending'}
        >
          {status === 'sending' ? (
            <>
              <span className="spinner" aria-hidden="true" /> Sending…
            </>
          ) : (
            'Send message'
          )}
        </DrawablyButton>
      </form>

      <DrawablyList className="contact-links" marker="dash">
        {links.map((link) => (
          <li key={link.label}>
            <a
              href={link.href}
              target={link.href.startsWith('http') ? '_blank' : undefined}
              rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
            >
              <span>{link.label}</span>
              <span className="contact-links__value">{link.value} ↗</span>
            </a>
          </li>
        ))}
      </DrawablyList>

    </section>
  );
}

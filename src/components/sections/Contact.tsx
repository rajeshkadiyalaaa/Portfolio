import React, { useState } from 'react';
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  CheckCircle,
  AlertCircle,
  ShieldCheck,
} from 'lucide-react';
const CONTACT_ITEMS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'rajeshkadiyala2003@gmail.com',
    href: 'mailto:rajeshkadiyala2003@gmail.com',
  },
  {
    icon: MapPin,
    label: 'Location',
    value: 'Hyderabad, India',
    href: undefined,
  },
  {
    icon: Linkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/rajeshkadiyala',
    href: 'https://www.linkedin.com/in/rajesh-kadiyala',
  },
  {
    icon: Github,
    label: 'GitHub',
    value: 'github.com/RajeshKadiyala',
    href: 'https://github.com/rajeshkadiyalaaa',
  },
];

const Contact: React.FC = () => {
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [submitting, setSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null);

  const validateForm = () => {
    let valid = true;
    const newErrors = { name: '', email: '', subject: '', message: '' };

    if (!formState.name.trim()) {
      newErrors.name = 'Name is required';
      valid = false;
    }

    if (!formState.email.trim()) {
      newErrors.email = 'Email is required';
      valid = false;
    } else if (!/\S+@\S+\.\S+/.test(formState.email)) {
      newErrors.email = 'Please enter a valid email address';
      valid = false;
    }

    if (!formState.subject.trim()) {
      newErrors.subject = 'Subject is required';
      valid = false;
    }

    if (!formState.message.trim()) {
      newErrors.message = 'Message is required';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setSubmitting(true);
    setSubmitStatus(null);

    try {
      const formElement = e.target as HTMLFormElement;
      const formData = new FormData(formElement);

      const response = await fetch(formElement.action, {
        method: 'POST',
        body: formData,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormState({ name: '', email: '', subject: '', message: '' });
      } else {
        throw new Error('Form submission failed');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="rk-contact">
      <div className="rk-contact-bg" aria-hidden />

      <div className="rk-contact-inner">
        <header className="rk-contact-header">
          <div className="rk-contact-label-wrap">
            <span className="rk-contact-label-line" aria-hidden />
            <p className="rk-contact-label">Contact me</p>
            <span className="rk-contact-label-line" aria-hidden />
          </div>
          <h2 className="rk-contact-heading">
            <span className="rk-contact-heading-line">Let&apos;s build something</span>
            <span className="rk-contact-heading-line">intelligent together.</span>
          </h2>
          <p className="rk-contact-subtitle">
            I&apos;m always open to discussing new opportunities, collaborations, and interesting
            ideas.
          </p>
        </header>

        <div className="rk-contact-body">
          <div className="rk-contact-info">
            {CONTACT_ITEMS.map((item) => {
              const Icon = item.icon;
              const content = (
                <>
                  <span className="rk-contact-icon">
                    <Icon size={20} strokeWidth={1.75} />
                  </span>
                  <div>
                    <p className="rk-contact-item-label">{item.label}</p>
                    <p className="rk-contact-item-value">{item.value}</p>
                  </div>
                </>
              );

              return item.href ? (
                <a
                  key={item.label}
                  href={item.href}
                  className="rk-contact-item"
                  target={item.href.startsWith('http') ? '_blank' : undefined}
                  rel={item.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                >
                  {content}
                </a>
              ) : (
                <div key={item.label} className="rk-contact-item">
                  {content}
                </div>
              );
            })}
          </div>

          <div className="rk-contact-form-card">
            <form
              onSubmit={handleSubmit}
              action="https://formsubmit.co/rajeshkadiyala2003@gmail.com"
              method="POST"
            >
              <input type="hidden" name="_subject" value="New contact from Portfolio Website" />
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_template" value="table" />
              <input type="hidden" name="_next" value={window.location.href} />

              {submitStatus === 'success' && (
                <div className="rk-contact-alert success">
                  <CheckCircle size={18} />
                  <span>Your message has been sent! I&apos;ll get back to you soon.</span>
                </div>
              )}

              {submitStatus === 'error' && (
                <div className="rk-contact-alert error">
                  <AlertCircle size={18} />
                  <span>There was an error sending your message. Please try again.</span>
                </div>
              )}

              <div className="rk-contact-form-row">
                <div className="rk-contact-field">
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formState.name}
                    onChange={handleChange}
                    className={`rk-contact-input${errors.name ? ' error' : ''}`}
                    placeholder="Your Name"
                    required
                  />
                  {errors.name && <p className="rk-contact-error">{errors.name}</p>}
                </div>
                <div className="rk-contact-field">
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formState.email}
                    onChange={handleChange}
                    className={`rk-contact-input${errors.email ? ' error' : ''}`}
                    placeholder="Your Email"
                    required
                  />
                  {errors.email && <p className="rk-contact-error">{errors.email}</p>}
                </div>
              </div>

              <div className="rk-contact-field">
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  value={formState.subject}
                  onChange={handleChange}
                  className={`rk-contact-input${errors.subject ? ' error' : ''}`}
                  placeholder="Subject"
                  required
                />
                {errors.subject && <p className="rk-contact-error">{errors.subject}</p>}
              </div>

              <div className="rk-contact-field">
                <textarea
                  id="message"
                  name="message"
                  value={formState.message}
                  onChange={handleChange}
                  className={`rk-contact-textarea${errors.message ? ' error' : ''}`}
                  placeholder="Your Message"
                  required
                />
                {errors.message && <p className="rk-contact-error">{errors.message}</p>}
              </div>

              <div className="rk-contact-form-footer">
                <button type="submit" className="rk-contact-submit" disabled={submitting}>
                  {submitting ? 'Sending...' : 'Send Message →'}
                </button>
                <p className="rk-contact-safe">
                  <ShieldCheck size={16} />
                  Your information is safe with me.
                </p>
              </div>
            </form>
          </div>
        </div>

        <div className="rk-contact-tagline-wrap">
          <span className="rk-contact-label-line" aria-hidden />
          <p className="rk-contact-tagline">
            Let&apos;s <strong>connect</strong> and create meaningful impact through technology.
          </p>
          <span className="rk-contact-label-line" aria-hidden />
        </div>
      </div>
    </section>
  );
};

export default Contact;

import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { contactFormConfig } from '../config';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { MapPin, Phone, Mail };

export function ContactForm() {
  const isConfigured = Boolean(contactFormConfig.mainTitle);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitors: contactFormConfig.form.visitorsOptions[0] || '',
    message: '',
    website: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);
  const [fieldError, setFieldError] = useState<string | null>(null);

  if (!isConfigured) return null;

  const endpoint = contactFormConfig.formEndpoint.startsWith('mailto:')
    ? '/api/contact'
    : (contactFormConfig.formEndpoint || '/api/contact');

  const submit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.message.trim().length < 20) {
      setFieldError('Please provide at least 20 characters in the message.');
      return;
    }

    setFieldError(null);
    setSubmitStatus(null);
    setIsSubmitting(true);

    try {
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Requested-With': 'XMLHttpRequest',
        },
        body: JSON.stringify(formData),
      });

      const payload = await response.json().catch(() => ({}));
      if (!response.ok) {
        throw new Error(
          typeof payload?.message === 'string' && payload.message.length > 0
            ? payload.message
            : contactFormConfig.form.errorMessage
        );
      }

      setSubmitStatus({
        type: 'success',
        message: contactFormConfig.form.successMessage,
      });
      setFormData({
        name: '',
        email: '',
        phone: '',
        visitors: contactFormConfig.form.visitorsOptions[0] || '',
        message: '',
        website: '',
      });
    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: error instanceof Error ? error.message : contactFormConfig.form.errorMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="mq-section mq-inner-section">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="mq-kicker">{contactFormConfig.subtitle}</span>
          <h2 className="mq-title mb-3">{contactFormConfig.mainTitle}</h2>
          <p className="mq-copy max-w-2xl mx-auto">{contactFormConfig.introText}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 mq-panel p-6">
            <img
              src="/images/pag-6.png"
              alt="Structured mandate discussions"
              className="w-full h-44 object-cover rounded-md mb-5"
              loading="lazy"
            />
            <h3 className="font-sans text-lg font-semibold text-slate-900 mb-4">{contactFormConfig.contactInfoTitle}</h3>
            <div className="space-y-4">
              {contactFormConfig.contactInfo.map((item) => {
                const Icon = iconMap[item.icon];
                return (
                  <div key={item.label} className="flex gap-3">
                    {Icon && <Icon className="w-4 h-4 text-gold-700 mt-1" />}
                    <div>
                      <p className="text-xs uppercase tracking-[0.1em] text-slate-500">{item.label}</p>
                      <p className="text-slate-900 text-sm font-medium">{item.value}</p>
                      <p className="text-slate-600 text-sm">{item.subtext}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          <form onSubmit={submit} className="lg:col-span-3 mq-panel p-6 space-y-4">
            <div className="hidden" aria-hidden="true">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                tabIndex={-1}
                autoComplete="off"
                value={formData.website}
                onChange={(e) => setFormData((p) => ({ ...p, website: e.target.value }))}
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-name" className="block text-sm font-medium text-slate-800 mb-1">
                  {contactFormConfig.form.nameLabel}
                </label>
                <input
                  id="contact-name"
                  name="name"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder={contactFormConfig.form.namePlaceholder}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="contact-email" className="block text-sm font-medium text-slate-800 mb-1">
                  {contactFormConfig.form.emailLabel}
                </label>
                <input
                  id="contact-email"
                  name="email"
                  required
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder={contactFormConfig.form.emailPlaceholder}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
                />
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contact-phone" className="block text-sm font-medium text-slate-800 mb-1">
                  {contactFormConfig.form.phoneLabel}
                </label>
                <input
                  id="contact-phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder={contactFormConfig.form.phonePlaceholder}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
                />
              </div>
              <div>
                <label htmlFor="contact-category" className="block text-sm font-medium text-slate-800 mb-1">
                  {contactFormConfig.form.visitorsLabel}
                </label>
                <select
                  id="contact-category"
                  name="visitors"
                  value={formData.visitors}
                  onChange={(e) => setFormData((p) => ({ ...p, visitors: e.target.value }))}
                  className="w-full px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
                >
                  {contactFormConfig.form.visitorsOptions.map((option) => <option key={option} value={option}>{option}</option>)}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="contact-message" className="block text-sm font-medium text-slate-800 mb-1">
                {contactFormConfig.form.messageLabel}
              </label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
                placeholder={contactFormConfig.form.messagePlaceholder}
                className="w-full px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
                aria-invalid={Boolean(fieldError)}
              />
            </div>

            {fieldError && (
              <p className="text-sm text-red-700" role="alert">{fieldError}</p>
            )}

            {submitStatus && (
              <p
                className={`text-sm ${submitStatus.type === 'success' ? 'text-emerald-700' : 'text-red-700'}`}
                role="status"
                aria-live="polite"
              >
                {submitStatus.message}
              </p>
            )}

            <button type="submit" className="btn-primary rounded-sm" disabled={isSubmitting}>
              {isSubmitting ? contactFormConfig.form.submittingText : contactFormConfig.form.submitText}
            </button>
            {contactFormConfig.privacyNotice && (
              <p className="text-xs text-slate-500">{contactFormConfig.privacyNotice}</p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
}

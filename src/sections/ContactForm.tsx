import { useState } from 'react';
import { Mail, MapPin, Phone } from 'lucide-react';
import { contactFormConfig } from '../config';

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = { MapPin, Phone, Mail };

export function ContactForm() {
  if (!contactFormConfig.mainTitle) return null;

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    visitors: contactFormConfig.form.visitorsOptions[0] || '',
    message: ''
  });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const to = contactFormConfig.formEndpoint.replace('mailto:', '');
    const subject = encodeURIComponent('PAG Institutional Inquiry');
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\nPhone: ${formData.phone}\nCategory: ${formData.visitors}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  };

  return (
    <section id="contact" className="section-padding">
      <div className="container-custom">
        <div className="text-center mb-10">
          <span className="font-sans text-sm text-gold-700 uppercase tracking-[0.2em] mb-3 block">{contactFormConfig.subtitle}</span>
          <h2 className="font-sans text-h2 text-slate-900 mb-3">{contactFormConfig.mainTitle}</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">{contactFormConfig.introText}</p>
        </div>

        <div className="grid lg:grid-cols-5 gap-8">
          <div className="lg:col-span-2 bg-white border border-slate-200 rounded-lg p-6">
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

          <form onSubmit={submit} className="lg:col-span-3 bg-white border border-slate-200 rounded-lg p-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                value={formData.name}
                onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                placeholder={contactFormConfig.form.namePlaceholder}
                className="px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
              />
              <input
                required
                type="email"
                value={formData.email}
                onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                placeholder={contactFormConfig.form.emailPlaceholder}
                className="px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
              />
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <input
                required
                value={formData.phone}
                onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                placeholder={contactFormConfig.form.phonePlaceholder}
                className="px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
              />
              <select
                value={formData.visitors}
                onChange={(e) => setFormData((p) => ({ ...p, visitors: e.target.value }))}
                className="px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
              >
                {contactFormConfig.form.visitorsOptions.map((option) => <option key={option} value={option}>{option}</option>)}
              </select>
            </div>
            <textarea
              rows={5}
              value={formData.message}
              onChange={(e) => setFormData((p) => ({ ...p, message: e.target.value }))}
              placeholder={contactFormConfig.form.messagePlaceholder}
              className="w-full px-4 py-3 border border-slate-300 rounded-sm text-slate-900"
            />
            <button type="submit" className="btn-primary rounded-sm">{contactFormConfig.form.submitText}</button>
          </form>
        </div>
      </div>
    </section>
  );
}

import React, { useState, useEffect } from 'react';
import {
  Mail,
  Clock,
  Send,
  CheckCircle2,
  ChevronDown,
  MessageSquare,
  HelpCircle,
  ShieldCheck,
} from 'lucide-react';

interface ContactFormData {
  fullName: string;
  email: string;
  subject: string;
  message: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export const Contact: React.FC = () => {
  useEffect(() => {
    document.title = 'Contact — Kronos Books';
  }, []);

  const [formData, setFormData] = useState<ContactFormData>({
    fullName: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [submitted, setSubmitted] = useState(false);
  const [expandedFaq, setExpandedFaq] = useState<number | null>(0);

  const validate = () => {
    const errs: Partial<Record<keyof ContactFormData, string>> = {};

    if (!formData.fullName.trim()) {
      errs.fullName = 'Full name is required';
    }

    if (!formData.email.trim()) {
      errs.email = 'Email address is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      errs.email = 'Please enter a valid email format';
    }

    if (!formData.subject.trim()) {
      errs.subject = 'Subject is required';
    }

    if (!formData.message.trim()) {
      errs.message = 'Please provide a short message';
    } else if (formData.message.trim().length < 10) {
      errs.message = 'Message must be at least 10 characters long';
    }

    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setSubmitted(true);
  };

  const resetForm = () => {
    setFormData({
      fullName: '',
      email: '',
      subject: '',
      message: '',
    });
    setErrors({});
    setSubmitted(false);
  };

  const faqs: FAQItem[] = [
    {
      question: 'Do you deliver across India?',
      answer:
        'Yes! Kronos Books partners with premier domestic express couriers to deliver across all major PIN codes in India. Complimentary express delivery is included on orders above ₹999.',
    },
    {
      question: 'How can I track my demo order?',
      answer:
        'As soon as your demo order is placed, an instant simulated tracking reference (e.g. KB-2026-1048) is generated and stored in your Reader Account profile. You can view all past orders anytime.',
    },
    {
      question: 'Can I cancel an order?',
      answer:
        'Orders can be cancelled before dispatch directly from your account page or by reaching out to our concierge desk at support@kronosbooks.com with your Order ID.',
    },
    {
      question: 'Do you accept returns?',
      answer:
        'We offer a 7-day hassle-free replacement policy for any copies damaged during shipping, misprinted pages, or incorrect shipments. We arrange reverse door-pickup at no additional cost.',
    },
    {
      question: 'How can I contact support?',
      answer:
        'You can reach our dedicated reader care desk via email (support@kronosbooks.com) or by using the contact form on this page. We reply within 24 business hours.',
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-16 space-y-16 sm:space-y-24">
      {/* 1. HERO */}
      <div className="text-center max-w-2xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#FAF4E6] border border-[#E8DFC8] text-xs font-semibold text-[#8E6503] shadow-xs">
          <MessageSquare className="w-3.5 h-3.5 text-[#B8860B]" />
          <span>Reader Concierge & Support</span>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl font-bold tracking-tight text-[#1E1D1C]">
          Let's Talk Books.
        </h1>

        <p className="text-sm sm:text-base text-[#524E48] leading-relaxed">
          Whether you have a query about a specific edition, order status, bulk collegiate orders, or just want a recommendation, we are here to assist.
        </p>
      </div>

      {/* 2. TWO-COLUMN LAYOUT: Contact Info + Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        {/* LEFT COLUMN: Online Support Channels */}
        <div className="lg:col-span-5 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-xs space-y-8">
          <div>
            <span className="text-xs uppercase tracking-wider font-bold text-[#B8860B]">
              Direct Contact
            </span>
            <h2 className="font-serif text-2xl font-bold text-[#1E1D1C] mt-1">
              Online Reader Support
            </h2>
            <p className="text-xs text-[#6B6864] mt-1.5 leading-relaxed">
              We provide prompt, personalized support for all readers and literature enthusiasts across the globe.
            </p>
          </div>

          <div className="space-y-6 text-xs text-[#524E48]">
            {/* Primary Support Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF4E6] text-[#B8860B] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider font-bold text-[#8C8275]">
                  Customer Support Email
                </span>
                <a
                  href="mailto:support@kronosbooks.com"
                  className="font-semibold text-sm text-[#1E1D1C] hover:text-[#B8860B] transition-colors"
                >
                  support@kronosbooks.com
                </a>
                <p className="text-[11px] text-[#8C8275] mt-0.5">
                  Typical response time: under 4 hours
                </p>
              </div>
            </div>

            {/* Inquiries & Editorial Email */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF4E6] text-[#B8860B] flex items-center justify-center shrink-0">
                <Mail className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider font-bold text-[#8C8275]">
                  Editorial & Curation Inquiries
                </span>
                <a
                  href="mailto:contact@kronosbooks.com"
                  className="font-semibold text-sm text-[#1E1D1C] hover:text-[#B8860B] transition-colors"
                >
                  contact@kronosbooks.com
                </a>
                <p className="text-[11px] text-[#8C8275] mt-0.5">
                  For author partnerships and book clubs
                </p>
              </div>
            </div>

            {/* Hours */}
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-[#FAF4E6] text-[#B8860B] flex items-center justify-center shrink-0">
                <Clock className="w-5 h-5" />
              </div>
              <div>
                <span className="block text-[11px] uppercase tracking-wider font-bold text-[#8C8275]">
                  Support Availability
                </span>
                <p className="font-semibold text-sm text-[#1E1D1C]">
                  Monday – Saturday
                </p>
                <p className="text-[11px] text-[#8C8275] mt-0.5">
                  9:00 AM – 7:00 PM IST
                </p>
              </div>
            </div>

            {/* Quality Promise */}
            <div className="p-4 rounded-2xl bg-[#FAF8F5] border border-[#E8E2D9] flex items-start gap-3">
              <ShieldCheck className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
              <div className="text-[11px] text-[#6B6864] leading-relaxed">
                <span className="font-bold text-[#1E1D1C] block mb-0.5">100% Genuine Print Guarantee</span>
                Every order is inspected and hand-packaged with protective archival wrapping before dispatch.
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Contact Form */}
        <div className="lg:col-span-7 bg-white rounded-3xl p-8 sm:p-10 border border-[#E8E2D9] shadow-xs">
          {submitted ? (
            <div
              id="contact-form-success"
              className="py-12 text-center space-y-4 animate-in zoom-in-95 duration-200"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto shadow-inner">
                <CheckCircle2 className="w-9 h-9" />
              </div>
              <div className="space-y-1">
                <h3 className="font-serif text-2xl font-bold text-[#1E1D1C]">
                  Thank you! Your message has been received.
                </h3>
                <p className="text-xs sm:text-sm text-[#6B6864] max-w-md mx-auto">
                  A member of our Kronos editorial team will review your note and respond via email shortly.
                </p>
              </div>
              <button
                onClick={resetForm}
                className="mt-4 px-6 py-2.5 rounded-xl bg-[#1E1D1C] text-[#FAF8F5] text-xs font-semibold hover:bg-[#33302C] transition-colors"
              >
                Send Another Message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div>
                <span className="text-xs uppercase tracking-wider font-bold text-[#B8860B]">
                  Get in Touch
                </span>
                <h2 className="font-serif text-2xl font-bold text-[#1E1D1C] mt-1">
                  Send Us a Message
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div>
                  <label htmlFor="contact-fullName" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    Full Name *
                  </label>
                  <input
                    id="contact-fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => {
                      setFormData({ ...formData, fullName: e.target.value });
                      if (errors.fullName) setErrors({ ...errors, fullName: undefined });
                    }}
                    placeholder="e.g. Vikramaditya"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.fullName ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                  />
                  {errors.fullName && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.fullName}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label htmlFor="contact-email" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => {
                      setFormData({ ...formData, email: e.target.value });
                      if (errors.email) setErrors({ ...errors, email: undefined });
                    }}
                    placeholder="name@example.com"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.email ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                  />
                  {errors.email && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.email}</p>
                  )}
                </div>

                {/* Subject */}
                <div className="sm:col-span-2">
                  <label htmlFor="contact-subject" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    Subject *
                  </label>
                  <input
                    id="contact-subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => {
                      setFormData({ ...formData, subject: e.target.value });
                      if (errors.subject) setErrors({ ...errors, subject: undefined });
                    }}
                    placeholder="e.g. Order Inquiry / Book Recommendation"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B] transition-colors ${
                      errors.subject ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message */}
                <div className="sm:col-span-2">
                  <label htmlFor="contact-message" className="block text-xs font-semibold text-[#1E1D1C] mb-1">
                    Message *
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={formData.message}
                    onChange={(e) => {
                      setFormData({ ...formData, message: e.target.value });
                      if (errors.message) setErrors({ ...errors, message: undefined });
                    }}
                    placeholder="How can our book curators assist you today?"
                    className={`w-full px-3.5 py-2.5 text-xs rounded-xl border bg-[#FAF8F5] text-[#1E1D1C] focus:bg-white focus:outline-hidden focus:border-[#B8860B] transition-colors resize-none ${
                      errors.message ? 'border-rose-500' : 'border-[#D5CBBF]'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-[11px] text-rose-600 mt-1">{errors.message}</p>
                  )}
                </div>
              </div>

              <div className="pt-2">
                <button
                  id="send-message-btn"
                  type="submit"
                  className="w-full sm:w-auto px-8 py-3 rounded-xl bg-[#1E1D1C] hover:bg-[#33302C] text-[#FAF8F5] text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-md active:scale-98"
                >
                  <span>Send Message</span>
                  <Send className="w-3.5 h-3.5 text-[#D4AF37]" />
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* 3. FAQ SECTION (Expandable / Collapsible) */}
      <section id="faq-section" className="bg-[#FAF4E6] rounded-3xl p-8 sm:p-12 border border-[#E8DFC8]">
        <div className="text-center max-w-xl mx-auto mb-10 space-y-2">
          <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#8E6503] uppercase tracking-wider">
            <HelpCircle className="w-3.5 h-3.5 text-[#B8860B]" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="font-serif text-3xl font-bold text-[#1E1D1C]">
            Common Inquiries
          </h2>
          <p className="text-xs text-[#6B6864]">
            Everything you need to know about deliveries, returns, and support.
          </p>
        </div>

        <div className="max-w-3xl mx-auto space-y-3">
          {faqs.map((faq, index) => {
            const isExpanded = expandedFaq === index;
            return (
              <div
                key={faq.question}
                className="bg-white rounded-2xl border border-[#E8E2D9] overflow-hidden shadow-2xs transition-all"
              >
                <button
                  onClick={() => setExpandedFaq(isExpanded ? null : index)}
                  className="w-full p-5 text-left flex items-center justify-between gap-4 focus:outline-hidden"
                  aria-expanded={isExpanded}
                >
                  <span className="font-serif text-base font-bold text-[#1E1D1C]">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[#B8860B] transition-transform duration-200 shrink-0 ${
                      isExpanded ? 'rotate-180' : ''
                    }`}
                  />
                </button>

                {isExpanded && (
                  <div className="px-5 pb-5 text-xs text-[#524E48] leading-relaxed border-t border-[#F5F1EB] pt-3 animate-in fade-in duration-150">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
};
